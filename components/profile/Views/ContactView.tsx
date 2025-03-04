import React from 'react';
import { View, Text, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import AppUser from "@/interfaces/AppUser";

const ContactView: React.FC<{ userData: AppUser }> = ({ userData }) => {
    if (!userData.profile.contact) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ee" />
            </View>
        );
    }

    const { contact } = userData.profile;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                <Text style={styles.label}>Name: </Text>
                {`${contact.firstName || ''} ${contact.lastName || ''}`}
            </Text>

            <Text style={styles.text}>
                <Text style={styles.label}>Address: </Text>
                {contact.address || ''}
            </Text>

            <Text style={styles.text}>
                <Text style={styles.label}>Email: </Text>
                {contact.email || ''}
            </Text>

            <Text style={styles.text}>
                <Text style={styles.label}>Mobile Phone Number: </Text>
                {contact.mobilePhone || ''}
            </Text>

            <Text style={styles.text}>
                <Text style={styles.label}>Home Phone Number: </Text>
                {contact.homePhone || ''}
            </Text>

            {contact.website ? (
                <Text style={styles.text}>
                    <Text style={styles.label}>Website: </Text>
                    <Text
                        style={styles.link}
                        onPress={() => Linking.openURL(contact.website)}
                    >
                        {contact.website}
                    </Text>
                </Text>
            ) : null}

            <Text style={styles.text}>
                <Text style={styles.label}>Date of Birth: </Text>
                {contact.dateOfBirth
                    ? new Date(contact.dateOfBirth).toLocaleDateString()
                    : ''}
            </Text>

            <Text style={styles.text}>
                <Text style={styles.label}>Age: </Text>
                {contact.age || ''}
            </Text>
        </View>
    );
};

export default ContactView;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    label: {
        fontWeight: 'bold',
    },
    link: {
        color: '#6200ee',
        textDecorationLine: 'underline',
    },
});