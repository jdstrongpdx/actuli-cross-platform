import {Link, router, Stack} from 'expo-router';
import { StyleSheet, View } from 'react-native';
import {Button, Text} from '@rneui/themed';
import React from "react";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text>404 - This page was not found.</Text>
        <Button
            title="Return to Home"
            onPress={() => {
              // Navigate after signing in. You may want to tweak this to ensure sign-in is
              // successful before navigating.
              router.replace('/');
            }}
            buttonStyle={{
              backgroundColor: '#6200ee',
              borderRadius: 8,
              paddingVertical: 12,
            }}
            titleStyle={{
              fontSize: 16,
              fontWeight: 'bold'
            }}
            containerStyle={{
              margin: 20,
            }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
