import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Define the onboarding navigation param list
export type OnboardingStackParamList = {
  PrepStyle: undefined;
  MealGoals: undefined;
  DietaryStyle: undefined;
  Allergies: undefined;
  MealTimes: undefined;
  CookingSkill: undefined;
  HouseholdSize: undefined;
  KitchenEquipment: undefined;
  MealDays: undefined;
  TransitionToAccount: undefined;
  EnterNameScreen: undefined;
  EnterEmailScreen: undefined;
  EnterPasswordScreen: undefined;
};

// Create screen props type for onboarding screens
export type OnboardingScreenProps<T extends keyof OnboardingStackParamList> = {
  navigation: StackNavigationProp<OnboardingStackParamList, T>;
  route: RouteProp<OnboardingStackParamList, T>;
}; 