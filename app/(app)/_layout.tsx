import { Text } from 'react-native';
import {Redirect, router, Slot} from 'expo-router';

import { useSession } from '@/contexts/AuthContext';
import { AppUserContextProvider } from '@/contexts/AppUserContext';
import { TypeDataContextProvider } from "@/contexts/TypeDataContext";
import React from "react";

export default function AppLayout() {
    const { token, isLoading } = useSession();

    // Render a loading indicator while the session is being initialized
    if (isLoading) {
        return <Text>Loading...</Text>;
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