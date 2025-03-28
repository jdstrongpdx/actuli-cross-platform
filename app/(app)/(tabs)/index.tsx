import React, { useState } from 'react';
import {StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';
import ContactView from "@/components/profile/Views/ContactView";
import EducationView from "@/components/profile/Views/EducationView";
import { useAppUser } from '@/contexts/AppUserContext';
import ContactForm1 from "@/components/profile/Forms/ContactForm1";
import EducationForm2 from "@/components/profile/Forms/EducationForm2";
import {ListItem, Text, useTheme, Icon} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import WorkView from "@/components/profile/Views/WorkView";
import WorkForm3 from "@/components/profile/Forms/WorkForm3";
import RelationshipForm4 from "@/components/profile/Forms/RelationshipForm4";
import RelationshipView from "@/components/profile/Views/RelationshipView";

export default function ProfilePage() {
    const { user } = useAppUser();
    const [editingSection, setEditingSection] = useState<string | null>(null);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleAccordion = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };
    const { theme } = useTheme();

    const expandedIcon = theme.mode === "light" ? (
        <Icon name="chevron-right-box" type="material-community" />
        ) : (
            <Icon name="chevron-right-box-outline" type="material-community" />
        );

    if (!user) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ee" />
                <Text style={styles.loadingText}>Loading user data...</Text>
            </View>

        );
    }

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: theme.colors.background }, // Dynamically set background color
            ]}
        >

            <ScrollView contentContainerStyle={styles.contentContainer}>

                <Text h4>Your Profile:</Text>

                {/* Contact Section */}
                <ListItem.Accordion
                    content={
                        <>
                            <Icon name="person" size={30} style={{marginRight: 10}}/>
                            <ListItem.Content>
                                <ListItem.Title>Contact</ListItem.Title>
                            </ListItem.Content>
                        </>
                    }
                    isExpanded={expandedSection === "contact"}
                    onPress={() => toggleAccordion("contact")}
                    expandIcon={expandedIcon}
                        >
                    {editingSection === "contact" ? (
                        <ContactForm1
                            userData={user}
                            onComplete={() => setEditingSection(null)}
                        />
                    ) : (
                        <>
                            <ContactView userData={user} setEditingSection={setEditingSection} />
                        </>
                    )}
                </ListItem.Accordion>

                {/* Education Section */}
                <ListItem.Accordion
                    content={
                        <>
                            <Icon name="school" size={30} style={{marginRight: 10}}/>
                            <ListItem.Content>
                                <ListItem.Title>Education</ListItem.Title>
                            </ListItem.Content>
                        </>
                    }
                    isExpanded={expandedSection === "education"}
                    onPress={() => toggleAccordion("education")}
                    expandIcon={expandedIcon}
                >
                    {editingSection === "education" ? (
                        <EducationForm2
                            userData={user}
                            onComplete={() => setEditingSection(null)}
                        />
                    ) : (
                        <>
                            <EducationView userData={user} setEditingSection={setEditingSection}/>
                        </>
                    )}
                </ListItem.Accordion>

                {/* Work Section */}
                <ListItem.Accordion
                    content={
                        <>
                            <Icon name="work" size={30} style={{marginRight: 10}}/>
                            <ListItem.Content>
                                <ListItem.Title>Work</ListItem.Title>
                            </ListItem.Content>
                        </>
                    }
                    isExpanded={expandedSection === "work"}
                    onPress={() => toggleAccordion("work")}
                    expandIcon={expandedIcon}
                >
                    {editingSection === "work" ? (
                        <WorkForm3
                            userData={user}
                            onComplete={() => setEditingSection(null)}
                        />
                    ) : (
                        <>
                            <WorkView userData={user} setEditingSection={setEditingSection}/>
                        </>
                    )}
                </ListItem.Accordion>

                {/* Relationship Section */}
                <ListItem.Accordion
                    content={
                        <>
                            <Icon name="user-friends" size={30} style={{marginRight: 10}}/>
                            <ListItem.Content>
                                <ListItem.Title>Relationships</ListItem.Title>
                            </ListItem.Content>
                        </>
                    }
                    isExpanded={expandedSection === "relationships"}
                    onPress={() => toggleAccordion("relationships")}
                    expandIcon={expandedIcon}
                >
                    {editingSection === "relationships" ? (
                        <RelationshipForm4
                            userData={user}
                            onComplete={() => setEditingSection(null)}
                        />
                    ) : (
                        <>
                            <RelationshipView userData={user} setEditingSection={setEditingSection}/>
                        </>
                    )}
                </ListItem.Accordion>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#666',
    },
});