/**
 * Barrel file for navigation exports
 * 
 * Example usage:
 * import { AppNavigator, navigate } from '@/navigation';
 */

// Export navigation components and utilities
export { default as AppNavigator } from './AppNavigator';
export { navigate, navigationRef } from './navigationService';
export type { RootStackParamList } from './AppNavigator';

// export { default as AppNavigator } from './AppNavigator';
// export * from './navigationService'; 