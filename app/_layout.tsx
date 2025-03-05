import { Slot } from 'expo-router';
import { SessionProvider } from '@/contexts/AuthContext';
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import { useColorScheme } from '@/hooks/useColorScheme';

export default function Root() {
    const colorScheme = useColorScheme();
    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <SessionProvider>
                <Slot />
            </SessionProvider>
        </ThemeProvider>
    );
}