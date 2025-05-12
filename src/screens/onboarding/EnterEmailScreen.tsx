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
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { buttonVariants, colors, spacing, textVariants, layout, inputVariants } from '@/styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '@/types/navigation';
import { useOnboarding } from '@/context'; 

// Define navigation type for TypeScript
type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'EnterEmailScreen'>;

const EnterEmailScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const { updatePreference } = useOnboarding(); // Hook into onboarding context

  // Simple email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Save the email into onboarding context
    updatePreference('email', email);

    // Navigate to password entry screen
    navigation.navigate('EnterPasswordScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>What's your email?</Text>
            <Text style={styles.subtitle}>
              We'll use this for account access and recovery
            </Text>
            
            <TextInput
              style={[
                inputVariants.default,
                styles.input,
                error ? styles.inputError : null
              ]}
              placeholder="example@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              autoFocus={true}
            />
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          <TouchableOpacity
            style={[buttonVariants.primary, styles.button]}
            onPress={handleNext}
          >
            <Text style={textVariants.buttonText}>Next</Text>
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
  button: {
    marginTop: spacing.lg,
    width: '100%',
  },
});

export default EnterEmailScreen;
