import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { useAppUser } from '@/contexts/AppUserContext';
import { Text, Switch, useTheme, useThemeMode } from '@rneui/themed';
import { useSession } from '@/contexts/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SettingsPage() {
    const { token, signIn, signOut } = useSession();
    const { clearUser } = useAppUser();
    const { theme } = useTheme();

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: theme.colors.background }, // Dynamically set background color
            ]}
        >
            {/* Hero Section */}
            <View style={styles.heroContainer}>
                <Image
                    source={require('@/assets/images/actuliLogo.png')}
                    style={styles.heroImage}
                />
            </View>

            {/* Logout Button */}
            {token ? (
                <Text style={styles.logoutButton} onPress={() => signOut()}>
                    Logout
                </Text>
            ) : (
                <Text style={styles.logoutButton} onPress={() => signIn()}>
                    Sign In
                </Text>
            )}

            <Text style={styles.logoutButton} onPress={() => clearUser()}>
                Clear User Data
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    logoutButton: {
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
        color: 'red',
    },
});