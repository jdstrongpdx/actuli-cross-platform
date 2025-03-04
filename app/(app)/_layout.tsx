import { Text } from 'react-native';
import { Redirect, Slot } from 'expo-router';

import { useSession } from '@/contexts/AuthContext';
import { AppUserContextProvider } from '@/contexts/AppUserContext';
import { TypeDataContextProvider } from "@/contexts/TypeDataContext";
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Colors } from "@/constants/Colors";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function AppLayout() {
    const { session, isLoading } = useSession();
    const colorScheme = useColorScheme();

    // Render a loading indicator while the session is being initialized
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Redirect unauthenticated users to the sign-in screen
    if (!session) {
        return <Redirect href="/sign-in" />;
    }

    // Wrap authenticated routes with the AppUserContextProvider
    return (
        <AppUserContextProvider>
            <TypeDataContextProvider>
                <Slot/>
            </TypeDataContextProvider>
        </AppUserContextProvider>
    );
}