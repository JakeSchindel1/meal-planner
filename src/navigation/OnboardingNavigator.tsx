import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackParamList } from '@/types/navigation';
import { OnboardingProvider } from '@/context';

// Import all screens from the barrel export
import {
  PrepStyleScreen,
  MealGoalsScreen,
  DietaryStyleScreen,
  AllergiesScreen,
  MealTimesScreen,
  CookingSkillScreen,
  HouseholdSizeScreen,
  KitchenEquipmentScreen,
  MealDaysScreen,
  TransitionToAccountScreen,
  EnterNameScreen,
  EnterEmailScreen,
  EnterPasswordScreen,
} from '@/screens/onboarding';

// Create the stack navigator
const Stack = createStackNavigator<OnboardingStackParamList>();

/**
 * Navigator for the onboarding flow
 * Wrapped with OnboardingProvider for state management
 */
const OnboardingNavigator = () => {
  return (
    <OnboardingProvider>
      <Stack.Navigator
        initialRouteName="PrepStyle"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false, // Disable swipe-back to ensure sequential completion
        }}
      >
        <Stack.Screen name="PrepStyle" component={PrepStyleScreen} />
        <Stack.Screen name="MealGoals" component={MealGoalsScreen} />
        <Stack.Screen name="DietaryStyle" component={DietaryStyleScreen} />
        <Stack.Screen name="Allergies" component={AllergiesScreen} />
        <Stack.Screen name="MealTimes" component={MealTimesScreen} />
        <Stack.Screen name="CookingSkill" component={CookingSkillScreen} />
        <Stack.Screen name="HouseholdSize" component={HouseholdSizeScreen} />
        <Stack.Screen name="KitchenEquipment" component={KitchenEquipmentScreen} />
        <Stack.Screen name="MealDays" component={MealDaysScreen} />
        <Stack.Screen name="TransitionToAccount" component={TransitionToAccountScreen} />
        <Stack.Screen name="EnterNameScreen" component={EnterNameScreen} />
        <Stack.Screen name="EnterEmailScreen" component={EnterEmailScreen} />
        <Stack.Screen name="EnterPasswordScreen" component={EnterPasswordScreen} />
      </Stack.Navigator>
    </OnboardingProvider>
  );
};

export default OnboardingNavigator; 