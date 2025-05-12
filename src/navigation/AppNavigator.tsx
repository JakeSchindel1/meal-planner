import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import LoginScreen from '@/screens/auth/LoginScreen';
import AuthChoiceScreen from '@/screens/auth/AuthChoiceScreen';
import { navigationRef } from './navigationService';
import { useAuth } from '@/context';
import { checkOnboardingComplete } from '@/utils/onboardingStorage';
import OnboardingNavigator from './OnboardingNavigator';
import TabsNavigator from './TabsNavigator'; // ✅ Import your bottom tab navigator

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  AuthChoice: undefined;
  OnboardingStartScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);

  useEffect(() => {
    const loadOnboardingStatus = async () => {
      const isComplete = await checkOnboardingComplete();
      setOnboardingComplete(isComplete);
    };
    loadOnboardingStatus();
  }, []);

  if (isLoading || onboardingComplete === null) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {!isAuthenticated ? (
        <Stack.Navigator
          initialRouteName="AuthChoice"
          screenOptions={{
            headerStyle: { backgroundColor: '#007AFF' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen 
            name="AuthChoice" 
            component={AuthChoiceScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: 'Login' }}
          />
          <Stack.Screen 
            name="OnboardingStartScreen" 
            component={OnboardingNavigator}
            options={{
              headerShown: false,
              presentation: 'card',
              animation: 'slide_from_right',
            }}
          />
        </Stack.Navigator>
      ) : (
        <TabsNavigator /> // ✅ This now shows your Home/Profile tab bar
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
