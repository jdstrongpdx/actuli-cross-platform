import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppUser from "@/interfaces/AppUser";

const EducationView: React.FC<{ userData: AppUser }> = ({ userData }) => {
    const { educationList } = userData.profile;

    if (!educationList || educationList.length === 0) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No Education Data Entered</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {educationList.map((edu, index) => (
                <View
                    key={index}
                    style={[
                        styles.educationItem,
                        index !== educationList.length - 1 && styles.educationItemSeparator,
                    ]}
                >
                    {edu.school && (
                        <Text style={styles.text}>
                            <Text style={styles.label}>School: </Text>
                            {edu.school}
                        </Text>
                    )}
                    {edu.degreeType && (
                        <Text style={styles.text}>
                            <Text style={styles.label}>Degree Type: </Text>
                            {edu.degreeType}
                        </Text>
                    )}
                    {edu.location && (
                        <Text style={styles.text}>
                            <Text style={styles.label}>Location: </Text>
                            {edu.location}
                        </Text>
                    )}
                    {edu.status && (
                        <Text style={styles.text}>
                            <Text style={styles.label}>Status: </Text>
                            {edu.status}
                        </Text>
                    )}
                    {edu.completionDate && (
                        <Text style={styles.text}>
                            <Text style={styles.label}>Completion Date: </Text>
                            {edu.completionDate}
                        </Text>
                    )}
                    {edu.grade && (
                        <Text style={styles.text}>
                            <Text style={styles.label}>Grade: </Text>
                            {edu.grade}
                        </Text>
                    )}
                    {edu.gradeScale && (
                        <Text style={styles.text}>
                            <Text style={styles.label}>Grade Scale: </Text>
                            {edu.gradeScale}
                        </Text>
                    )}
                    {edu.description && (
                        <Text style={styles.text}>
                            <Text style={styles.label}>Description: </Text>
                            {edu.description}
                        </Text>
                    )}
                    {edu.importance && (
                        <Text style={styles.text}>
                            <Text style={styles.label}>Importance: </Text>
                            {edu.importance}
                        </Text>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

export default EducationView;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 16,
        color: '#666',
    },
    educationItem: {
        marginBottom: 16,
    },
    educationItemSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 16,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    label: {
        fontWeight: 'bold',
    },
});