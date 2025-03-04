import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ActivitiesForm9: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Activities Form</Text>
        </View>
    );
};

export default ActivitiesForm9;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
});