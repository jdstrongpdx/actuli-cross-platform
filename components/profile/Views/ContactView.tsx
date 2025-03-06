import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AppUser from "@/interfaces/AppUser";
import { ExternalLink } from '@/components/ExternalLink';
import { Text, Card, Button, useTheme } from '@rneui/themed'; // Added useTheme for theme handling

interface ContactViewProps {
    userData: AppUser;
    setEditingSection: (section: string) => void;
}

const ContactView: React.FC<ContactViewProps> = ({ userData, setEditingSection }) => {
    const { theme } = useTheme(); // Get the current theme for dynamic styling

    if (!userData.profile.contact) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    const { contact } = userData.profile;

    return (
        <Card containerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.text, { color: theme.colors.primary }]}>
                <Text style={styles.label}>Name: </Text>
                {`${contact.firstName || ''} ${contact.lastName || ''}`}
            </Text>

            <Text style={[styles.text, { color: theme.colors.primary }]}>
                <Text style={styles.label}>Address: </Text>
                {contact.address || ''}
            </Text>

            <Text style={[styles.text, { color: theme.colors.primary }]}>
                <Text style={styles.label}>Email: </Text>
                {contact.email || ''}
            </Text>

            <Text style={[styles.text, { color: theme.colors.primary }]}>
                <Text style={styles.label}>Mobile Phone Number: </Text>
                {contact.mobilePhone || ''}
            </Text>

            <Text style={[styles.text, { color: theme.colors.primary }]}>
                <Text style={styles.label}>Home Phone Number: </Text>
                {contact.homePhone || ''}
            </Text>

            <Text style={[styles.text, { color: theme.colors.primary }]}>
                <Text style={styles.label}>Website: </Text>
                <ExternalLink
                    href={contact.website}
                    style={[styles.link, { color: theme.colors.secondary }]} // Use the secondary color for links
                >
                    {contact.website}
                </ExternalLink>
            </Text>

            <Text style={[styles.text, { color: theme.colors.primary }]}>
                <Text style={styles.label}>Date of Birth: </Text>
                {contact.dateOfBirth
                    ? new Date(contact.dateOfBirth).toLocaleDateString()
                    : ''}
            </Text>

            <Text style={[styles.text, { color: theme.colors.primary }]}>
                <Text style={styles.label}>Age: </Text>
                {contact.age || ''}
            </Text>

            <Button
                title="Edit Contact"
                buttonStyle={{
                    backgroundColor: theme.colors.primary,
                    borderRadius: 3,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                onPress={() => setEditingSection('contact')}
            />
        </Card>
    );
};

export default ContactView;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
    },
    link: {
        textDecorationLine: 'underline',
    },
    divider: {
        marginBottom: 16,
    },
});