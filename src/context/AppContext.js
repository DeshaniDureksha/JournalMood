import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mood options that will be used throughout the app
  const moodOptions = [
    { value: 'amazing', label: 'Amazing', emoji: '😁', color: '#10b981' },
    { value: 'good', label: 'Good', emoji: '😊', color: '#60a5fa' },
    { value: 'okay', label: 'Okay', emoji: '😐', color: '#fbbf24' },
    { value: 'poor', label: 'Poor', emoji: '😔', color: '#f87171' },
    { value: 'terrible', label: 'Terrible', emoji: '😭', color: '#ef4444' },
  ];

  // Load entries from storage on app start
  useEffect(() => {
    loadEntries();
  }, []);

  // Load entries from AsyncStorage
  const loadEntries = async () => {
    try {
      setLoading(true);
      const storedEntries = await AsyncStorage.getItem('journalEntries');
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (err) {
      setError('Failed to load your journal entries');
      console.error('Error loading entries:', err);
    } finally {
      setLoading(false);
    }
  };

  // Save entries to AsyncStorage
  const saveEntries = async (updatedEntries) => {
    try {
      await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    } catch (err) {
      setError('Failed to save your journal entries');
      console.error('Error saving entries:', err);
      throw err;
    }
  };

  // Add a new entry
  const addEntry = async (content, mood, imageUri) => {
    try {
      const timestamp = new Date().toISOString();
      const newEntry = {
        id: uuid.v4(),
        content,
        mood,
        image: imageUri,
        timestamp,
      };

      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries);
      await saveEntries(updatedEntries);
      return newEntry.id;
    } catch (err) {
      setError('Failed to save your journal entry');
      console.error('Error adding entry:', err);
      throw err;
    }
  };

  // Update an existing entry
  const updateEntry = async (entryId, updates) => {
    try {
      const updatedEntries = entries.map(entry =>
        entry.id === entryId ? { ...entry, ...updates } : entry
      );

      setEntries(updatedEntries);
      await saveEntries(updatedEntries);
    } catch (err) {
      setError('Failed to update your journal entry');
      console.error('Error updating entry:', err);
      throw err;
    }
  };

  // Delete an entry
  const deleteEntry = async (entryId) => {
    try {
      const updatedEntries = entries.filter(entry => entry.id !== entryId);
      setEntries(updatedEntries);
      await saveEntries(updatedEntries);
    } catch (err) {
      setError('Failed to delete your journal entry');
      console.error('Error deleting entry:', err);
      throw err;
    }
  };

  // Get a single entry by ID
  const getEntryById = (entryId) => {
    return entries.find(entry => entry.id === entryId);
  };

  // Group entries by date (for the journal list screen)
  const getEntriesByDate = () => {
    const grouped = {};
    
    entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).forEach(entry => {
      const date = entry.timestamp.split('T')[0]; // Get YYYY-MM-DD part
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(entry);
    });
    
    return grouped;
  };

  // Get entries grouped by month for visualization
  const getEntriesByMonth = () => {
    const grouped = {};
    
    entries.forEach(entry => {
      const date = new Date(entry.timestamp);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(entry);
    });
    
    return grouped;
  };

  // Get mood distribution data for visualization
  const getMoodData = () => {
    const moodCounts = {};
    
    moodOptions.forEach(mood => {
      moodCounts[mood.value] = {
        count: 0,
        label: mood.label,
        color: mood.color,
        emoji: mood.emoji
      };
    });
    
    entries.forEach(entry => {
      if (moodCounts[entry.mood]) {
        moodCounts[entry.mood].count++;
      }
    });
    
    return Object.values(moodCounts);
  };

  // Get entry count by weekday for visualization
  const getEntryCountByWeekday = () => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const counts = Array(7).fill(0);
    
    entries.forEach(entry => {
      const date = new Date(entry.timestamp);
      const dayOfWeek = date.getDay();
      counts[dayOfWeek]++;
    });
    
    return weekdays.map((day, index) => ({
      name: day,
      count: counts[index],
    }));
  };

  // Pick an image from gallery
  const pickImage = async () => {
    try {
      // Request permission first
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
          return null;
        }
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      
      if (!result.canceled) {
        return result.assets[0].uri;
      }
      return null;
    } catch (err) {
      setError('Failed to select image');
      console.error('Error picking image:', err);
      return null;
    }
  };

  // Clear error state
  const clearError = () => setError(null);

  // Context value
  const value = {
    entries,
    loading,
    error,
    moodOptions,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntryById,
    getEntriesByDate,
    getEntriesByMonth,
    getMoodData,
    getEntryCountByWeekday,
    pickImage,
    clearError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);