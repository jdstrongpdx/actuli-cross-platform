import { Image, StyleSheet, View } from 'react-native';
import {Text, useTheme} from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GoalsPage() {
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

            {/* Title */}
            <Text style={styles.title}>
                Goals Page
            </Text>

            {/* Page Text */}
            <Text style={styles.pageText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                vehicula, erat eget accumsan vehicula, sapien ipsum dictum dolor, id
                auctor mi lorem at magna.
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