import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Text, Card, Button, useTheme } from '@rneui/themed';
import AppUser, {Relationship, Work} from "@/interfaces/AppUser";

interface WorkViewProps {
    userData: AppUser;
    setEditingSection: (section: string) => void;
}

const RelationshipView: React.FC<WorkViewProps> = ({ userData, setEditingSection }) => {
    const { theme } = useTheme();
    const { relationshipsList } = userData.profile;

    if (!userData) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    const RelationshipItem = ({ relationship }: { relationship: Relationship }) => (
        <Card containerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
            {relationship.name && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Work Title: </Text>{relationship.name}
                </Text>
            )}
            {relationship.relationshipType && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Employer: </Text>{relationship.relationshipType}
                </Text>
            )}
            {relationship.status && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Industry: </Text>{relationship.status}
                </Text>
            )}
            {relationship.interactionFrequency && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Career Level: </Text>{relationship.interactionFrequency}
                </Text>
            )}
            {relationship.description && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Wage: </Text>{relationship.description}
                </Text>
            )}
            {relationship.dateOfBirth && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Start Date: </Text>{new Date(relationship.dateOfBirth).toLocaleDateString()}
                </Text>
            )}
            {relationship.startDate && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Start Date: </Text>{new Date(relationship.startDate).toLocaleDateString()}
                </Text>
            )}
            {relationship.endDate && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>End Date: </Text>{new Date(relationship.endDate).toLocaleDateString()}
                </Text>
            )}
        </Card>
    );

    const relationshipListMap = (relationshipsList && relationshipsList.length > 0) ?
        (
            relationshipsList.map((relationship, index) => (
                <RelationshipItem key={index} relationship={relationship} />
            ))
        ) :
        (
            <Text>No relationship records found.</Text>
        )

    return (
        <View>
            {relationshipListMap}

            <Button
                title="Edit Relationships"
                buttonStyle={{
                    backgroundColor: theme.colors.primary,
                    borderRadius: 3,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                onPress={() => setEditingSection('relationships')}
            />
        </View>
    );
};

export default RelationshipView;

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
});