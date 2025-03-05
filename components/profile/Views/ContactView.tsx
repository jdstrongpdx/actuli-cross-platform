import React from 'react';
import { View, Text, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import AppUser from "@/interfaces/AppUser";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import { ExternalLink } from '@/components/ExternalLink';

const ContactView: React.FC<{ userData: AppUser }> = ({ userData }) => {
    if (!userData.profile.contact) {
        return (
            <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ee" />
            </ThemedView>
        );
    }

    const { contact } = userData.profile;

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.text}>
                <ThemedText style={styles.label}>Name: </ThemedText>
                {`${contact.firstName || ''} ${contact.lastName || ''}`}
            </ThemedText>

            <ThemedText style={styles.text}>
                <ThemedText style={styles.label}>Address: </ThemedText>
                {contact.address || ''}
            </ThemedText>

            <ThemedText style={styles.text}>
                <ThemedText style={styles.label}>Email: </ThemedText>
                {contact.email || ''}
            </ThemedText>

            <ThemedText style={styles.text}>
                <ThemedText style={styles.label}>Mobile Phone Number: </ThemedText>
                {contact.mobilePhone || ''}
            </ThemedText>

            <ThemedText style={styles.text}>
                <ThemedText style={styles.label}>Home Phone Number: </ThemedText>
                {contact.homePhone || ''}
            </ThemedText>

            <ThemedText style={styles.text}>
                <ThemedText style={styles.label}>Website: </ThemedText>
                <ExternalLink href={contact.website} style={styles.link}>
                    {contact.website}
                </ExternalLink>
            </ThemedText>

            <ThemedText style={styles.text}>
                <ThemedText style={styles.label}>Date of Birth: </ThemedText>
                {contact.dateOfBirth
                    ? new Date(contact.dateOfBirth).toLocaleDateString()
                    : ''}
            </ThemedText>

            <ThemedText style={styles.text}>
                <ThemedText style={styles.label}>Age: </ThemedText>
                {contact.age || ''}
            </ThemedText>
        </ThemedView>
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