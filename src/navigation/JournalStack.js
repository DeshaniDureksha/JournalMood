import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JournalListScreen from '../screens/JournalListScreen';
import AddEntryScreen from '../screens/AddEntryScreen';
import EditEntryScreen from '../screens/EditEntryScreen';
import EntryDetailScreen from '../screens/EntryDetailScreen';

const Stack = createNativeStackNavigator();

const JournalStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#4338ca',
        },
        headerStyle: {
          backgroundColor: '#ffffff',
        },
      }}
    >
      <Stack.Screen 
        name="JournalList" 
        component={JournalListScreen} 
        options={{ title: 'My Journal' }} 
      />
      <Stack.Screen 
        name="AddEntry" 
        component={AddEntryScreen} 
        options={{ title: 'New Entry' }}
      />
      <Stack.Screen 
        name="EditEntry" 
        component={EditEntryScreen} 
        options={{ title: 'Edit Entry' }}
      />
      <Stack.Screen 
        name="EntryDetail" 
        component={EntryDetailScreen} 
        options={{ title: 'Journal Entry' }} 
      />
    </Stack.Navigator>
  );
};

export default JournalStack;