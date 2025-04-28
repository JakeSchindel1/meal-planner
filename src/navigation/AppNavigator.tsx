import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// Import screens
import { HomeScreen, LoginScreen, SignupScreen } from '../screens';
import { navigationRef } from './navigationService';
import { useAuth } from '../context';
import { checkOnboardingComplete } from '../utils/onboardingStorage';
import OnboardingNavigator from './OnboardingNavigator'; // 👈 import your onboarding flow!

// Define the navigation parameters type for type safety
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
};

// Create the stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Auth stack (when user is not authenticated)
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#007AFF' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ title: 'Login' }} 
    />
    <Stack.Screen 
      name="Signup" 
      component={SignupScreen} 
      options={{ title: 'Create Account' }} 
    />
  </Stack.Navigator>
);

// App stack (when user is authenticated)
const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#007AFF' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ title: 'Home' }} 
    />
  </Stack.Navigator>
);

// Loading screen while checking auth or onboarding
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);

  // Check onboarding status locally
  useEffect(() => {
    const loadOnboardingStatus = async () => {
      const isComplete = await checkOnboardingComplete();
      setOnboardingComplete(isComplete);
    };

    loadOnboardingStatus();
  }, []);

  // Show loading screen if still checking
  if (isLoading || onboardingComplete === null) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {!isAuthenticated ? (
        onboardingComplete ? (
          <AuthStack /> // 👈 onboarding complete? show login/signup
        ) : (
          <OnboardingNavigator /> // 👈 onboarding NOT complete? show onboarding flow
        )
      ) : (
        <AppStack /> // 👈 already logged in? go home
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default AppNavigator;
