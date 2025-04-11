import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AppProvider } from './src/context/AppContext';

// Screens
import JournalListScreen from './src/screens/JournalListScreen';
import AddEntryScreen from './src/screens/AddEntryScreen';
import EditEntryScreen from './src/screens/EditEntryScreen';
import EntryDetailScreen from './src/screens/EntryDetailScreen';
import DashboardScreen from './src/screens/DashboardScreen';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Journal stack navigator
const JournalStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6366f1',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: '600',
        },
        // Simplify headers for non-tab screens
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
        name="JournalList" 
        component={JournalListScreen} 
        options={{ 
          title: 'My Journal',
          // Keep full header for main tab screen
          headerLeft: () => null,
        }}
      />
      <Stack.Screen 
        name="AddEntry" 
        component={AddEntryScreen} 
        options={({ navigation }) => ({ 
          title: 'New Entry',
          // Only show title and back button
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen 
        name="EditEntry" 
        component={EditEntryScreen} 
        options={{ 
          title: 'Edit Entry',
          // Only show title and back button
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="EntryDetail" 
        component={EntryDetailScreen} 
        options={{ 
          title: 'Journal Entry',
          // Only show title and back button
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

// Dashboard stack navigator
const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6366f1',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
        name="DashboardMain" 
        component={DashboardScreen} 
        options={{ 
          title: 'Dashboard',
          // Keep full header for main tab screen
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

// Main tab navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Journal') {
            iconName = focused ? 'journal' : 'journal-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#9ca3af',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 13,
          height: 78,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen name="Journal" component={JournalStack} />
      <Tab.Screen name="Dashboard" component={DashboardStack} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <TabNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}