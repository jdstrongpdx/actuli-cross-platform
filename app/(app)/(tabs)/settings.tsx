import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from "react";
import {useAppUser} from "@/contexts/AppUserContext";

export default function SettingsPage() {
    const { user, clearUser } = useAppUser(); // Access the user and actions from the context

    return (
        <SafeAreaView style={styles.container}>
            {/* Hero Section */}
            <ThemedView style={styles.heroContainer}>
                <Image
                    source={require('@/assets/images/actuliLogo.png')}
                    style={styles.heroImage}
                />
            </ThemedView>

            {/* Logout Button */}
            <ThemedText
                style={styles.logoutButton}
                onPress={() => {
                    clearUser(); // Clear user data on logout
                }}
            >
                Logout
            </ThemedText>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Or use your theme's background color
    },
    heroContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    heroImage: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
    },
    title: {
        textAlign: 'center',
        marginTop: 16,
        fontSize: 24,
        fontWeight: 'bold',
    },
    pageText: {
        marginHorizontal: 16,
        marginTop: 12,
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
    },
    logoutButton: {
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
        color: 'red',
    },
});