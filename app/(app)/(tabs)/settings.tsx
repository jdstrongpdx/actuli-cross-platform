import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SettingsPage() {
    return (
        <SafeAreaView style={styles.container}>
            {/* Hero Section */}
            <ThemedView style={styles.heroContainer}>
                <Image
                    source={require('@/assets/images/actuliLogo.png')}
                    style={styles.heroImage}
                />
            </ThemedView>

            {/* Title */}
            <ThemedText type="title" style={styles.title}>
                Settings Page
            </ThemedText>

            {/* Page Text */}
            <ThemedText style={styles.pageText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                vehicula, erat eget accumsan vehicula, sapien ipsum dictum dolor, id
                auctor mi lorem at magna.
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
});