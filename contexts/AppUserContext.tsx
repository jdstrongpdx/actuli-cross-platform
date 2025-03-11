import React, { createContext, useContext, useEffect, useCallback, useState, useMemo } from 'react';
import AppUser from '../interfaces/AppUser';
import apiRequest from "@/utils/apiRequest";
import { ApiMethods, ApiRoutes } from '@/enums/ApiEnums';
import { useSession } from '@/contexts/AuthContext';
import { replaceNullWithEmptyString } from "@/utils/normalizationUtils";
import { useStorageState } from "@/hooks/useStorageState";
import { serialize, deserialize } from "@/utils/serializationUtils";

// Storage key for secure storage TODO get from env variable
const USER_STORAGE_KEY = 'app_user';

// Context type definition
interface AppUserContextType {
    user: AppUser | null;
    saveUser: (user: AppUser) => void;
    loadUser: () => void;
    clearUser: () => void;
}

const AppUserContext = createContext<AppUserContextType>({
    user: null,
    saveUser: () => {},
    loadUser: () => {},
    clearUser: () => {},
});

export const useAppUser = (): AppUserContextType => {
    const context = useContext(AppUserContext);
    if (!context) {
        throw new Error('useAppUser must be used within an AppUserContextProvider');
    }
    return context;
};

export const AppUserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token } = useSession();
    const [[loading, storedUser], setStoredUser] = useStorageState(USER_STORAGE_KEY);
    const [user, setUser] = useState<AppUser | null>(null);

    const saveUser = useCallback((newUser: AppUser) => {
        try {
            const normalizedData = replaceNullWithEmptyString(newUser);
            setUser(normalizedData as AppUser);
            setStoredUser(serialize(newUser));
        } catch (error) {
            console.error('Failed to save user data:', error);
        }
    }, []);

    const loadUserFromApi = async (): Promise<void> => {
        try {
            const data: AppUser | null = await apiRequest<AppUser>(
                ApiMethods.Get,
                ApiRoutes.GetUser,
                null,
                {},
                token
            );
            if (data) {
                const normalizedData = replaceNullWithEmptyString(data);
                setUser(normalizedData as AppUser);
                console.log('User loaded from API');
                return;
            }
        } catch (error) {
            console.error('Error fetching user data from API:', error);
        }
    };

    const loadUserFromStorage = (): void => {
        try {
            if (storedUser) {
                const loadedUser = deserialize(storedUser);
                setUser(loadedUser as AppUser);
                console.log('User loaded from Storage');
            }
        } catch (error) {
            console.error('Failed to reload user data:', error);
        }
    };

    const loadUser = useCallback(async () => {
        await loadUserFromApi();
        if (!user) {
            loadUserFromStorage();
        }
    }, [storedUser, token]);

    const clearUser = useCallback(() => {
        try {
            setUser(null);
            setStoredUser(null);
        } catch (error) {
            console.error('Failed to clear user data:', error);
        }
    }, []);

    useEffect(() => {
        if (!user) {
            loadUser();
        }
    }, [user]);

    const contextValue = useMemo(() => ({
        user,
        saveUser,
        loadUser,
        clearUser,
    }), [user, saveUser, loadUser, clearUser]);

    return (
        <AppUserContext.Provider value={contextValue}>
            {children}
        </AppUserContext.Provider>
    );
};