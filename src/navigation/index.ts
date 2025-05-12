/**
 * Navigation barrel file for easy imports
 * 
 * Usage:
 * import { AppNavigator, navigate } from '@/navigation';
 */

// Export AppNavigator and navigationService functions
export { default as AppNavigator } from './AppNavigator';
export { navigate, navigationRef } from './navigationService';
export type { RootStackParamList } from './AppNavigator';

// These are commented out to avoid duplicate exports
// export { default as AppNavigator } from './AppNavigator';
// export * from './navigationService'; 