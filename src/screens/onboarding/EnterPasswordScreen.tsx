import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { buttonVariants, colors, spacing, textVariants, layout, inputVariants } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { useOnboarding } from '../../context'; // 👈 Import your onboarding context
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator'; // or wherever your main stack types are
import { API_URL } from '../../services/api';

const EnterPasswordScreen: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { preferences, updatePreference, clearPreferences } = useOnboarding(); // 👈

  const handleCreateAccount = async () => {
    setError('');

    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    console.log('Current preferences:', preferences);

    if (!preferences.email || !preferences.name) {
      Alert.alert('Missing Info', 'Please complete previous steps.');
      return;
    }

    setLoading(true);

    try {
      // Update password into context
      updatePreference('password', password);

      // Send signup request
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: preferences.email,
          password: password,
          name: preferences.name,
          preferences: {
            prepStyle: preferences.prepStyle,
            dietaryStyle: preferences.dietaryStyle,
            cookingSkill: preferences.cookingSkill,
            mealGoals: preferences.mealGoals,
            allergies: preferences.allergies,
            mealDays: preferences.mealDays,
            mealTimes: preferences.mealTimes,
            kitchenEquipment: preferences.kitchenEquipment,
            householdSize: preferences.householdSize,
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Success! Auth state will update and navigation will happen automatically.
      clearPreferences(); // Optional: clear onboarding context
      // navigation.navigate('Home'); // Removed: let auth state handle navigation

    } catch (error: any) {
      console.error('Signup error:', error.message);
      Alert.alert('Error', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Create a password</Text>
            <Text style={styles.subtitle}>
              Create a secure password for your account
            </Text>
            
            <TextInput
              style={[
                inputVariants.default,
                styles.input,
                error ? styles.inputError : null
              ]}
              placeholder="Password (min. 8 characters)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password-new"
              textContentType="newPassword"
              autoFocus={true}
            />
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <Text style={styles.passwordHint}>
              Your password should be at least 8 characters and include a mix of letters, numbers, and symbols for best security.
            </Text>
          </View>

          <TouchableOpacity
            style={[buttonVariants.primary, styles.button]}
            onPress={handleCreateAccount}
            disabled={loading}
          >
            <Text style={textVariants.buttonText}>
              {loading ? 'Creating...' : 'Create Account'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    ...layout.container,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...textVariants.title,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...textVariants.body,
    marginBottom: spacing.xl,
    color: '#666',
  },
  input: {
    width: '100%',
    height: 50,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    marginTop: -spacing.md,
    marginBottom: spacing.md,
  },
  passwordHint: {
    ...textVariants.body,
    fontSize: 14,
    color: '#666',
    marginTop: spacing.md,
  },
  button: {
    marginTop: spacing.lg,
    width: '100%',
  },
});

export default EnterPasswordScreen;
