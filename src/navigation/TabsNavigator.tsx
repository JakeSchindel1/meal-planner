import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/app/HomeScreen';
import SearchScreen from '../screens/app/SearchScreen';
import PantryScreen from '../screens/app/PantryScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import PostNavigator from './PostNavigator';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'ellipse';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Post') iconName = 'add-circle-outline';
          else if (route.name === 'Pantry') iconName = 'restaurant-outline';
          else if (route.name === 'Profile') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen 
        name="Post" 
        component={PostNavigator} 
        options={{ 
          tabBarLabel: 'Create',
        }}
      />
      <Tab.Screen name="Pantry" component={PantryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
