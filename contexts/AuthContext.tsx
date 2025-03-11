import {
    useContext,
    createContext,
    type PropsWithChildren,
    useState,
} from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
    exchangeCodeAsync,
    makeRedirectUri,
    useAuthRequest,
    useAutoDiscovery,
} from 'expo-auth-session';
import {msalConfig} from "@/msal.config";

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext<{
    signIn: () => void;
    signOut: () => void;
    token?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    token: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    // Endpoint and configuration
    const discovery = useAutoDiscovery(
        `https://login.microsoftonline.com/${msalConfig.auth.tenantId}/v2.0`,
    );
    const redirectUri = makeRedirectUri({
        scheme: undefined,
        path: '/',
    });
    const clientId = msalConfig.auth.clientId;

    // State to manage session and loading
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Authentication request
    const [request, , promptAsync] = useAuthRequest(
        {
            clientId,
            scopes: msalConfig.auth.scopes,
            redirectUri,
        },
        discovery,
    );

    // Sign-in logic using Expo Auth Session
    const signIn = async () => {
        if (!request) return;

        try {
            setIsLoading(true);
            const codeResponse = await promptAsync();
            if (codeResponse?.type === 'success' && discovery && request) {
                const tokenResponse = await exchangeCodeAsync(
                    {
                        clientId,
                        code: codeResponse.params.code,
                        extraParams: request.codeVerifier
                            ? { code_verifier: request.codeVerifier }
                            : undefined,
                        redirectUri,
                    },
                    discovery,
                );
                setToken(tokenResponse.accessToken);
            }
        } catch (error) {
            console.error('Sign-in failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Sign-out logic
    const signOut = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                token,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}