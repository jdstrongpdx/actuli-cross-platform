import React from 'react';
import { View, StyleSheet } from 'react-native';
import { makeStyles } from '@rneui/themed';

interface BackgroundProps {
    children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
    const styles = useStyles();
    return <View style={styles.container}>{children}</View>;
};

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
}));

export default Background;