import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AppUser, {Education} from "@/interfaces/AppUser";
import { ExternalLink } from '@/components/ExternalLink';
import { Text, Card, Button, useTheme } from '@rneui/themed';

interface EducationViewProps {
    userData: AppUser;
    setEditingSection: (section: string) => void;
}

const EducationView: React.FC<EducationViewProps> = ({ userData, setEditingSection }) => {
    const { theme } = useTheme(); // Get the current theme for dynamic styling

    if (!userData.profile.contact) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    const { educationList } = userData.profile;

    const Education = ({ education }: { education: Education }) => (
        <Card containerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
            {education.school && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>School: </Text>{education.school}
                </Text>
            )}
            {education.degreeType && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Degree Type: </Text>{education.degreeType}
                </Text>
            )}
            {education.degreeName && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Degree Name: </Text>{education.degreeName}
                </Text>
            )}
            {education.city && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>City: </Text>{education.city}
                </Text>
            )}
            {education.state && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>State: </Text>{education.state}
                </Text>
            )}
            {education.country && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Country: </Text>{education.country}
                </Text>
            )}
            {education.location && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Location: </Text>{education.location}
                </Text>
            )}
            {education.status && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Status: </Text>{education.status}
                </Text>
            )}
            {education.completionDate && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Completion Date: </Text>{new Date(education.completionDate).toLocaleDateString()}
                </Text>
            )}
            {education.grade && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Grade: </Text>{education.grade}
                </Text>
            )}
            {education.gradeScale && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Grade Scale: </Text>{education.gradeScale}
                </Text>
            )}
            {education.description && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Description: </Text>{education.description}
                </Text>
            )}
            {education.personalImportance && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Personal Importance: </Text>{education.personalImportance}
                </Text>
            )}
            {education.careerImportance && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Career Importance: </Text>{education.careerImportance}
                </Text>
            )}
        </Card>
    );

    if (!userData?.profile || !userData.profile) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    const educationListMap = (educationList && educationList.length > 0) ?
        (
            educationList.map((edu, index) => (
                <Education key={index} education={edu} />
            ))
        ) :
        (
            <View>
                <Text>No educational records found.</Text>
            </View>
        )

    return (
        <View>
            {educationListMap}

            <Button
                title="Edit Education"
                buttonStyle={{
                    backgroundColor: theme.colors.primary,
                    borderRadius: 3,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                onPress={() => setEditingSection('education')}
            />
        </View>
    );
};

export default EducationView;

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