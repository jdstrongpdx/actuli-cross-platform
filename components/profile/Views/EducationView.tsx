import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppUser from '@/interfaces/AppUser';

const EducationView: React.FC<{ userData: AppUser }> = ({ userData }) => {
    const { educationList } = userData.profile;

    console.log(educationList);

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
                            <Text>{edu.school || ''}</Text>
                        </Text>
                    )}
                    {edu.degreeType && (
                        <Text style={styles.text}>
                            <Text style={styles.label}>Degree Type: </Text>
                            <Text>{edu.degreeType || ''}</Text>
                        </Text>
                    )}
                    {edu.city && (
                        <Text style={styles.text}>
                            <Text style={styles.label}>City: </Text>
                            <Text>{edu.city || ''}</Text>
                        </Text>
                    )}
                    {edu.state && (
                        <Text style={styles.text}>
                            <Text style={styles.label}>State: </Text>
                            <Text>{edu.state || ''}</Text>
                        </Text>
                    )}
                    {edu.status && (
                        <Text style={styles.text}>
                            <Text style={styles.label}>Status: </Text>
                            <Text>{edu.status || ''}</Text>
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
    },
    label: {
        fontWeight: 'bold',
    },
});