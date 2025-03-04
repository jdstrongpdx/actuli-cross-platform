import React from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactView from "@/components/profile/Views/ContactView";
import EducationView from "@/components/profile/Views/EducationView";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from "@/components/Collapsible";
import { useAppUser } from '@/contexts/AppUserContext'; // Import the useAppUser hook

export default function ProfilePage() {
    const { user, clearUser } = useAppUser(); // Access the user and actions from the context

    if (!user) {
        return (
            <ThemedView style={styles.loadingContainer}>
                <ThemedText style={styles.loadingText}>Loading user data...</ThemedText>
            </ThemedView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Hero Section */}
            <ThemedView style={styles.heroContainer}>
                <Image
                    source={require('@/assets/images/actuliLogo.png')}
                    style={styles.heroImage}
                />
            </ThemedView>

            <ScrollView>
                {/* Collapsible Section: Contact View */}
                <Collapsible title="Contact Information">
                    <ContactView userData={user} /> {/* Pass user data */}
                </Collapsible>

                {/* Collapsible Section: Education View */}
                <Collapsible title="Education">
                    <EducationView userData={user} /> {/* Pass user data */}
                </Collapsible>

                {/* Logout Button */}
                <ThemedText
                    style={styles.logoutButton}
                    onPress={() => {
                        clearUser(); // Clear user data on logout
                    }}
                >
                    Logout
                </ThemedText>
            </ScrollView>
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
    logoutButton: {
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
        color: 'red',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#666',
    },
});