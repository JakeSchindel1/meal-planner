import React, { createContext, useState, useContext } from 'react';

// Type definition for user preferences collected during onboarding
export interface UserPreferences {
  prepStyle?: string;
  mealGoals?: string[];
  dietaryStyle?: string;
  allergies?: string[];
  mealTimes?: string[];
  cookingSkill?: string;
  householdSize?: string;
  kitchenEquipment?: string[];
  mealDays?: string[];
  name?: string;
  email?: string;
  password?: string;
}

// Context type definition
interface OnboardingContextType {
  preferences: UserPreferences;
  updatePreference: (key: keyof UserPreferences, value: any) => void;
  clearPreferences: () => void;
}

// Create the context with default values
const OnboardingContext = createContext<OnboardingContextType>({
  preferences: {},
  updatePreference: () => {},
  clearPreferences: () => {},
});

// Custom hook to use the onboarding context
export const useOnboarding = () => useContext(OnboardingContext);

// Provider component
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({});

  // Update a specific preference value
  const updatePreference = (key: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // Clear all preferences
  const clearPreferences = () => {
    setPreferences({});
  };

  return (
    <OnboardingContext.Provider
      value={{
        preferences,
        updatePreference,
        clearPreferences,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingContext; 