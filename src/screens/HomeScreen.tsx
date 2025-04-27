import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthentication } from '../hooks';
import ENV from '../constants/env'; // Use default import instead of named import

// Define the navigation parameters type for type safety
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

// Props type with navigation prop
type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

// HomeScreen component
const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { user, signOut, isLoading } = useAuthentication();

  console.log('Supabase URL:', ENV.SUPABASE_URL);
  console.log('Supabase Anon Key:', ENV.SUPABASE_ANON_KEY);

  // Handle logout
  const handleLogout = async () => {
    const success = await signOut();
    if (!success) {
      Alert.alert('Logout Failed', 'There was an error logging out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoLabel}>User Email:</Text>
        <Text style={styles.userInfoValue}>{user?.email}</Text>
      </View>
      
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoLabel}>User ID:</Text>
        <Text style={styles.userInfoValue}>{user?.id.substring(0, 8)}...</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  userInfoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    width: 80,
  },
  userInfoValue: {
    fontSize: 16,
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen; 