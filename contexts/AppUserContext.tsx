import React, { createContext, useContext, useEffect, useCallback } from 'react';
import AppUser from '../interfaces/AppUser';
import { useStorageState } from '@/hooks/useStorageState';
import userData from '@/data/userData.json';
import typesData from "@/data/typesData.json";
import TypeData from "@/interfaces/TypeData";

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

const USER_KEY = 'app_user'; // SecureStore key

export const useAppUser = () => useContext(AppUserContext);

export const AppUserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [[loading, storedUser], setStoredUser] = useStorageState(USER_KEY);

    const user = storedUser ? (JSON.parse(storedUser) as AppUser) : null;

    const saveUser = useCallback((newUser: AppUser) => {
        setStoredUser(JSON.stringify(newUser));
        console.log('User saved successfully');
    }, [setStoredUser]);

    const loadUser = useCallback(async () => {
        if (loading) {
            console.log('Loading user...');
            return;
        }

        if (storedUser) {
            console.log('User data found in storage');
        } else {
            console.log('User not found in storage, loading from file...');
            try {
                if (userData) {
                    const data: AppUser = userData;
                    // Save fetched data to storage
                    saveUser(data);
                    console.log('User loaded from file and saved to storage');
                }
            } catch (error) {
                console.error('Error loading user from file:', error);
            }
        }
    }, [loading, storedUser, saveUser]);

    const clearUser = useCallback(() => {
        setStoredUser(null);
        console.log('User data cleared');
    }, [setStoredUser]);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    return (
        <AppUserContext.Provider value={{ user, saveUser, loadUser, clearUser }}>
            {children}
        </AppUserContext.Provider>
    );
};