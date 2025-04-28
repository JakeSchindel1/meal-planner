import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { buttonVariants, colors, spacing, textVariants, layout, inputVariants } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../types/navigation';
import { useOnboarding } from '../../context'; 
// Define navigation type for TypeScript
type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'EnterNameScreen'>;

const EnterNameScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const { updatePreference } = useOnboarding(); // 

  const handleNext = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setError('');

    // Save the name into onboarding context
    updatePreference('name', name);

    // Navigate to email entry screen
    navigation.navigate('EnterEmailScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>What's your name?</Text>
            <Text style={styles.subtitle}>
              Let us know what to call you
            </Text>
            
            <TextInput
              style={[
                inputVariants.default,
                styles.input,
                error ? styles.inputError : null
              ]}
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
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

export default EnterNameScreen;
