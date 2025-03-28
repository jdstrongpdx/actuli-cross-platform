import {Redirect, router, Slot} from 'expo-router';
import { useSession } from '@/contexts/AuthContext';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Colors } from "@/constants/Colors";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { useTheme, Text } from '@rneui/themed';

export default function TabsLayout() {
    const { token, isLoading } = useSession();
    const { theme } = useTheme();

    // Render a loading indicator while the session is being initialized
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Redirect unauthenticated users to the sign-in screen
    if (!token) {
        return <Redirect href="/home" />;
    }

    // Wrap authenticated routes with the AppUserContextProvider
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: Colors[theme.mode ?? 'light'].background, // Dynamic header background
                },
                headerTintColor: Colors[theme.mode ?? 'light'].text, // Dynamic header text color
                tabBarActiveTintColor: Colors[theme.mode ?? 'light'].tint,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute', // Transparent background for iOS
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="goals"
                options={{
                    title: 'Goals',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="flame" color={color} />,
                }}
            />
            <Tabs.Screen
                name="achievements"
                options={{
                    title: 'Achievements',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="checkmark.seal" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
                }}
            />
        </Tabs>
    );
}