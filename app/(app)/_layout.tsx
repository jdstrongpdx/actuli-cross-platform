import { Text } from 'react-native';
import { Redirect, Slot } from 'expo-router';

import { useSession } from '@/contexts/AuthContext';
import { AppUserContextProvider } from '@/contexts/AppUserContext';
import { TypeDataContextProvider } from "@/contexts/TypeDataContext";
import React from "react";

export default function AppLayout() {
    const { session, isLoading } = useSession();

    // Render a loading indicator while the session is being initialized
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Redirect unauthenticated users to the sign-in screen
    if (!session) {
        return <Redirect href="/sign-in" />;
    }

    // Get Authenticated Information
    return (
        <AppUserContextProvider>
            <TypeDataContextProvider>
                <Slot/>
            </TypeDataContextProvider>
        </AppUserContextProvider>
    );
}