import { router } from 'expo-router';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { Text } from '@rneui/themed';

import { useSession } from "@/contexts/AuthContext";
import React from "react";

export default function SignIn() {
    const { signIn } = useSession();
    return (
        <SafeAreaView style={styles.container}>
            <Text
                onPress={() => {
                    signIn();
                    // Navigate after signing in. You may want to tweak this to ensure sign-in is
                    // successful before navigating.
                    router.replace('/');
                }}>
                Sign In
            </Text>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <Image
                        source={require('@/assets/images/actuliLogo.png')} // Adjust the source as needed
                        style={styles.headerImage}
                        resizeMode="cover"
                    />
                </View>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.subtitle}>Welcome to</Text>
                    <Text style={styles.title}>Actuli</Text>
                    <Text style={styles.subtitle}>Self Actualization. Realized.</Text>
                    <Text style={styles.italicText}>
                        self-actualization : noun {'\n'}
                        The realization or fulfillment of one's talents and potentialities...{'\n'}
                        ...the act of becoming the best version of oneself.
                    </Text>
                </View>

                {/* Introduction Section */}
                <View style={styles.introSection}>
                    <Text style={styles.leadText}>
                        One of the hardest questions in life is: out of the THOUSANDS of things I COULD do, what is the ONE thing I SHOULD do?
                    </Text>
                    <Text style={styles.leadText}>
                        What are the things that are most important to me, and how can I become a better person while being true to myself?
                    </Text>
                    <Text style={styles.text}>
                        Actuli.com is your personal life coach and planner, designed to help you create meaningful changes in your life. It provides tools to help you balance, manage, and achieve your goals in a way that fits your unique personality and priorities.
                    </Text>
                </View>

                {/* "What Makes Actuli Different?" Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What Makes Actuli Different?</Text>
                    <View style={styles.list}>
                        {[
                            'You are the customer, not the product.',
                            'You own your data and can download or delete it anytime you want.',
                            'Your personal data is never shared, sold, or distributed.',
                            'We are a privately owned company with the goal of making meaningful software.',
                            'Security best practices - professionally managed hosting and security providers, encryption of your data during transit and on the servers, restricted access to information, etc.',
                            'No advertisements.',
                            'You vote on what features get developed, and which ones do not.',
                        ].map((item, index) => (
                            <Text key={index} style={styles.listItem}>
                                • {item}
                            </Text>
                        ))}
                    </View>
                </View>

                {/* "How Actuli Works" Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How Does Actuli Work?</Text>
                    <View style={styles.list}>
                        {[
                            'First, you create a comprehensive profile that serves as a snapshot of your current self across eight major areas of life.',
                            'Second, you prioritize which parts of your life you want to change or improve.',
                            'Third, anonymous data (never including personally identifiable information) will be sent to an AI that generates customized goals tailored to your interests, needs, and personality. You choose which ones you want to work on, alter, or throw out.',
                            'Fourth, Actuli will provide a balanced, actionable list of goals for the month, empowering you to make real progress in the areas that are most important to you.',
                            'Fifth, throughout the month, you work towards these personal goals with built-in tools to track progress. This keeps you organized and motivated. In the future, we aim to add the ability to invite your friends, who can see your progress and cheer you on.',
                            'Sixth, at the end of each month, you’ll spend just 15 minutes to reflect, update your priorities, and generate new goals, ensuring your goals evolve as you grow. Over time, Actuli adapts to your changing priorities and ensures your goals stay relevant and personalized.',
                        ].map((item, index) => (
                            <Text key={index} style={styles.listItem}>
                                • {item}
                            </Text>
                        ))}
                    </View>
                </View>

                {/* AI Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Wait, Did You Say AI?</Text>
                    <Text style={styles.text}>
                        <Text style={styles.boldText}>What is AI?</Text> Artificial Intelligence (AI) is a technology that processes and learns from data to provide intelligent outputs. In Actuli, AI is used to provide a deeper level of insight into life planning and customization.
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.boldText}>How is your data sent and used?</Text> All data is anonymized (removing any personal information) and encrypted to protect your privacy. We only send what’s necessary to help the AI provide actionable results.
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.boldText}>Why AI?</Text> Using AI allows the app to provide highly customized goals that are tailored to your needs and interests without designing a custom solution for each person.
                    </Text>
                </View>

                {/* Next Steps */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Next Steps...</Text>
                    <Text style={styles.subtext}>
                        The application is currently in development, and will have a "Notify Me" release option soon.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 16,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerImage: {
        width: '50%',
        maxWidth: 500,
        height: undefined,
        aspectRatio: 1, // Ensures proper scaling
        borderRadius: 20,
    },
    titleSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#c9a408',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
    },
    italicText: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 10,
    },
    introSection: {
        marginBottom: 20,
        alignSelf: 'stretch',
    },
    leadText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    list: {
        marginLeft: 10,
    },
    listItem: {
        fontSize: 16,
        marginBottom: 6,
    },
    boldText: {
        fontWeight: 'bold',
    },
    subtext: {
        fontSize: 16,
        marginTop: 10,
    },
});