import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OnboardingScreen = ({ navigation }) => {
  const handleContinue = () => {
    navigation.replace('MainApp'); // Navigates to your TabNavigator
  };

  return (
    <View style={styles.container}>
      {/* App icon or illustration */}
      <View style={styles.iconContainer}>
        <Ionicons name="journal" size={100} color="#6366f1" />
      </View>

      {/* Title and subtitle */}
      <Text style={styles.title}>Welcome to JournalMood</Text>
      <Text style={styles.subtitle}>
        Start your journey of self-reflection and personal growth. Track your thoughts, moods, and progress every day.
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#eef2ff',
    padding: 32,
    borderRadius: 100,
    marginBottom: 32,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#4338ca',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 12,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
