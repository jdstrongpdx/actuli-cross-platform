import { Slot } from 'expo-router';
import { SessionProvider } from '@/contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createTheme, ThemeProvider } from '@rneui/themed';
import Background from "@/components/Background"
import { useColorScheme } from 'react-native';

const lightTheme = {
    background: '#f0f0f0',
    primary: '#66b3ff',
};

const darkTheme = {
    background: '#121212',
    primary: '#3399ff',
};

export default function Root() {
    const deviceTheme = useColorScheme(); // 'light' or 'dark'

    const theme = createTheme({
        lightColors: lightTheme,
        darkColors: darkTheme,
        mode: deviceTheme || 'light', // Default to 'light' if no preference
    });

    return (
        <SafeAreaProvider>
            <SessionProvider>
                <ThemeProvider theme={theme}>
                    <Background>
                        <Slot />
                    </Background>
                </ThemeProvider>
            </SessionProvider>
        </SafeAreaProvider>
    );
}