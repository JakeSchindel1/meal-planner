import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './AppNavigator';

// Create a navigation reference that can be used outside of components
export const navigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();

/**
 * Navigate to a screen from anywhere in the app
 * @param name - Name of the screen to navigate to
 * @param params - Parameters to pass to the screen
 */
export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.current) {
    // @ts-ignore: Argument of type 'name' is not assignable to parameter...
    navigationRef.current.navigate(name, params);
  } else {
    // Navigation ref is not ready yet
    console.warn('Navigation is not ready yet');
  }
} 