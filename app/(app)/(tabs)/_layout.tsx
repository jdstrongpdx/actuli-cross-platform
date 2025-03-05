import { Text } from 'react-native';
import { Redirect, Slot } from 'expo-router';
import { useSession } from '@/contexts/AuthContext';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Colors } from "@/constants/Colors";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabsLayout() {
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
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
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