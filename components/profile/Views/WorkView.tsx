import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Text, Card, Button, useTheme } from '@rneui/themed';
import AppUser, {Work} from "@/interfaces/AppUser";

interface WorkViewProps {
    userData: AppUser;
    setEditingSection: (section: string) => void;
}

const WorkView: React.FC<WorkViewProps> = ({ userData, setEditingSection }) => {
    const { theme } = useTheme();
    const { workList } = userData.profile;

    if (!userData) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    const WorkItem = ({ work }: { work: Work }) => (
        <Card containerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
            {work.workTitle && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Work Title: </Text>{work.workTitle}
                </Text>
            )}
            {work.employer && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Employer: </Text>{work.employer}
                </Text>
            )}
            {work.industry && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Industry: </Text>{work.industry}
                </Text>
            )}
            {work.careerLevel && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Career Level: </Text>{work.careerLevel}
                </Text>
            )}
            {work.wage && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Wage: </Text>{work.wage}
                </Text>
            )}
            {work.wageScale && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Wage Scale: </Text>{work.wageScale}
                </Text>
            )}
            {work.city && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>City: </Text>{work.city}
                </Text>
            )}
            {work.state && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>State: </Text>{work.state}
                </Text>
            )}
            {work.country && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Country: </Text>{work.country}
                </Text>
            )}
            {work.location && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Location: </Text>{work.location}
                </Text>
            )}
            {work.startDate && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Start Date: </Text>{new Date(work.startDate).toLocaleDateString()}
                </Text>
            )}
            {work.endDate && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>End Date: </Text>{new Date(work.endDate).toLocaleDateString()}
                </Text>
            )}
            {work.status && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Status: </Text>{work.status}
                </Text>
            )}
            {work.description && (
                <Text style={[styles.text, { color: theme.colors.primary }]}>
                    <Text style={styles.label}>Description: </Text>{work.description}
                </Text>
            )}
        </Card>
    );

    const workListMap = (workList && workList.length > 0) ?
        (
            workList.map((work, index) => (
                <WorkItem key={index} work={work} />
            ))
        ) :
        (
            <Text>No work records found.</Text>
        )

    return (
        <View>
            {workListMap}

            <Button
                title="Edit Work"
                buttonStyle={{
                    backgroundColor: theme.colors.primary,
                    borderRadius: 3,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                onPress={() => setEditingSection('work')}
            />
        </View>
    );
};

export default WorkView;

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