import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useAuthentication } from '../../hooks';
import { layout, textVariants, buttonVariants, spacing, colors } from '../../styles/styles';

// HomeScreen component
const HomeScreen: React.FC = () => {
  const { user, signOut, isLoading } = useAuthentication();

  // Handle logout
  const handleLogout = async () => {
    const success = await signOut();
    if (!success) {
      Alert.alert('Logout Failed', 'There was an error logging out. Please try again.');
    }
  };

  return (
    <View style={[layout.container, layout.centered, { padding: spacing.lg }]}> 
      <Text style={textVariants.heroTitle}>Home Screen</Text>
      <View style={{ marginVertical: spacing.lg, width: '100%' }}>
        <View style={{ flexDirection: 'row', marginBottom: spacing.sm }}>
          <Text style={[textVariants.subtitle, { marginRight: spacing.sm }]}>User Email:</Text>
          <Text style={textVariants.body}>{user?.email}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: spacing.sm }}>
          <Text style={[textVariants.subtitle, { marginRight: spacing.sm }]}>User ID:</Text>
          <Text style={textVariants.body}>{user?.id?.substring(0, 8)}...</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={[buttonVariants.error, { width: '100%', marginTop: spacing.xl }]} 
        onPress={handleLogout}
        disabled={isLoading}
      >
        <Text style={textVariants.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen; 