import React, { createContext, useContext, useEffect, useCallback, useState } from 'react';
import AppUser from '../interfaces/AppUser';
import apiRequest from "@/utils/apiRequest";
import { ApiMethods, ApiRoutes } from '@/enums/ApiEnums';
import { useSession } from '@/contexts/AuthContext';

// AppUserContext default state
const AppUserContext = createContext<{
    user: AppUser | null;
    saveUser: (user: AppUser) => void;
    loadUser: () => void;
    clearUser: () => void;
}>({
    user: null,
    saveUser: () => {},
    loadUser: () => {},
    clearUser: () => {},
});

export const useAppUser = () => useContext(AppUserContext);

export const AppUserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { session } = useSession(); // Token from the session
    const [user, setUser] = useState<AppUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [failedAttempts, setFailedAttempts] = useState<number>(0);

    const MAX_RETRIES = 3; // Limit the number of retries

    const saveUser = useCallback((newUser: AppUser) => {
        setUser(newUser);
        console.log('User saved successfully');
    }, []);

    const loadUser = useCallback(async () => {
        if (loading || failedAttempts >= MAX_RETRIES) {
            if (failedAttempts >= MAX_RETRIES) {
                console.error(`Failed to fetch user data after ${MAX_RETRIES} attempts. Giving up.`);
            }
            return; // Stop retrying if already loading or retry limit reached
        }

        setLoading(true);

        try {
            // Fetch user data from the API
            console.log('Fetching user data from API...');
            const data: AppUser | null = await apiRequest<AppUser>(
                ApiMethods.Get,
                ApiRoutes.GetUser,
                null,
                {},
                session // Pass the session token
            );

            if (data) {
                setUser(data);
                setFailedAttempts(0); // Reset failed attempts on success
                console.log('User loaded from API and set to state');
            } else {
                throw new Error('No user data returned from API');
            }
        } catch (error) {
            // Increment failed attempts on error
            console.error('Error fetching user data from API:', error);
            setFailedAttempts((prev) => prev + 1);
        } finally {
            setLoading(false);
        }
    }, [loading, failedAttempts, session]); // Add relevant dependencies

    const clearUser = useCallback(() => {
        setUser(null);
        console.log('User data cleared');
    }, []);

    useEffect(() => {
        // Attempt to load user on first render
        if (failedAttempts < MAX_RETRIES) {
            loadUser();
        }
    }, [loadUser, failedAttempts]); // Retry only up to MAX_RETRIES

    return (
        <AppUserContext.Provider value={{ user, saveUser, loadUser, clearUser }}>
            {children}
        </AppUserContext.Provider>
    );
};