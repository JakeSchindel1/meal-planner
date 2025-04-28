import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { buttonVariants, colors, spacing, textVariants, layout } from '../../styles/styles';
import { useOnboarding } from '../../context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../types/navigation';

// Define navigation type for TypeScript
type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'TransitionToAccount'>;

const TransitionToAccountScreen: React.FC = () => {
  const { preferences } = useOnboarding();
  const navigation = useNavigation<NavigationProp>();

  // Function to handle continue button press
  const handleContinue = () => {
    // Navigate to the name entry screen
    navigation.navigate('EnterNameScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.celebration}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.title}>You're almost done!</Text>
          <Text style={styles.subtitle}>
            Let's save your preferences so we can create your perfect meal plan.
          </Text>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Here's what we know about you:</Text>
          {preferences.prepStyle && (
            <View style={styles.preferenceLine}>
              <Text style={styles.preferenceDot}>•</Text>
              <Text style={styles.preferenceText}>
                You prefer to 
                {preferences.prepStyle === 'fresh' && ' cook fresh meals daily'}
                {preferences.prepStyle === 'mealPrep' && ' meal prep for the week'}
                {preferences.prepStyle === 'mixed' && ' mix up meal prep and fresh cooking'}
              </Text>
            </View>
          )}
          
          {preferences.dietaryStyle && (
            <View style={styles.preferenceLine}>
              <Text style={styles.preferenceDot}>•</Text>
              <Text style={styles.preferenceText}>
                Your dietary style: {preferences.dietaryStyle}
              </Text>
            </View>
          )}
          
          {preferences.cookingSkill && (
            <View style={styles.preferenceLine}>
              <Text style={styles.preferenceDot}>•</Text>
              <Text style={styles.preferenceText}>
                You're a {preferences.cookingSkill.toLowerCase()} cook
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actionContainer}>
          <Text style={styles.actionText}>
            Create an account to save your preferences and start planning your meals!
          </Text>
          <TouchableOpacity
            style={[buttonVariants.primary, styles.button]}
            onPress={handleContinue}
          >
            <Text style={textVariants.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    ...layout.container,
    justifyContent: 'center',
  },
  celebration: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  title: {
    ...textVariants.heroTitle,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...textVariants.body,
    textAlign: 'center',
    marginHorizontal: spacing.lg,
    color: '#666',
  },
  summary: {
    alignSelf: 'stretch',
    backgroundColor: '#F0F9F0',
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  summaryTitle: {
    ...textVariants.subtitle,
    marginBottom: spacing.md,
  },
  preferenceLine: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  preferenceDot: {
    ...textVariants.body,
    marginRight: spacing.sm,
    color: colors.primary,
  },
  preferenceText: {
    ...textVariants.body,
    flex: 1,
  },
  actionContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  actionText: {
    ...textVariants.body,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    width: '100%',
  },
});

export default TransitionToAccountScreen; 