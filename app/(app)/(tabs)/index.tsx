import React, { useState } from 'react';
import { ScrollView, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactView from "@/components/profile/Views/ContactView";
import EducationView from "@/components/profile/Views/EducationView";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from "@/components/Collapsible";
import { useAppUser } from '@/contexts/AppUserContext';
import ContactForm1 from "@/components/profile/Forms/ContactForm1";
import EducationForm2 from "@/components/profile/Forms/EducationForm2";
import AppUser, {Contact} from "@/interfaces/AppUser";

export default function ProfilePage() {
    const { user, saveUser } = useAppUser();
    const [editingSection, setEditingSection] = useState<string | null>(null);

    if (!user) {
        return (
            <ThemedView style={styles.loadingContainer}>
                <ThemedText style={styles.loadingText}>Loading user data...</ThemedText>
            </ThemedView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Collapsible Section: Contact View */}
            <Collapsible title="Contact Information">
                {editingSection === "contact" ? (
                    <ContactForm1
                        userData={user}
                        onComplete={() => setEditingSection(null)}
                    />
                ) : (
                    <>
                        <ContactView userData={user} />
                        <Button
                            title="Edit"
                            onPress={() => setEditingSection("contact")}
                        />
                    </>
                )}
            </Collapsible>

            {/* Collapsible Section: Education View */}
{/*            <Collapsible title="Education">
                {editingSection === "education" ? (
                    <EducationForm2
                        userData={user}
                        onCancel={() => setEditingSection(null)}
                        onSave={(updatedData: ) => {
                            saveUser(updatedData);
                            setEditingSection(null);
                        }}
                    />
                ) : (
                    <>
                        <EducationView userData={user} />
                        <Button
                            title="Edit"
                            onPress={() => setEditingSection("education")}
                        />
                    </>
                )}
            </Collapsible>*/}


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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