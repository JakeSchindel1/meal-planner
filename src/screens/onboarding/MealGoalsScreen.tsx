import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { OnboardingScreen, OptionButton } from '../../components';
import { OnboardingScreenProps } from '../../types/navigation';
import { useOnboarding } from '../../context';
import { onboardingContent } from '../../lib/constants/onboarding';
import { buttonVariants, colors, spacing, textVariants } from '../../styles/styles';

const MealGoalsScreen: React.FC<OnboardingScreenProps<'MealGoals'>> = ({ navigation }) => {
  // Get the content for this screen from onboarding content
  const content = onboardingContent.find(item => item.id === 'mealGoals')!;
  const { updatePreference, preferences } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(preferences.mealGoals || []);

  // Toggle selection of an option
  const toggleOption = (value: string) => {
    setSelected(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // Handle continue button press
  const handleContinue = () => {
    updatePreference('mealGoals', selected);
    navigation.navigate('DietaryStyle');
  };

  return (
    <OnboardingScreen
      title={content.question}
      description={content.description}
      currentStep={2}
      totalSteps={onboardingContent.length}
    >
      {content.options.map(option => (
        <OptionButton
          key={option.value}
          label={option.label}
          description={option.description}
          selected={selected.includes(option.value)}
          onPress={() => toggleOption(option.value)}
        />
      ))}
      
      <View style={styles.buttonContainer}>
        {content.allowSkip && (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate('DietaryStyle')}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[buttonVariants.primary, styles.continueButton]}
          onPress={handleContinue}
        >
          <Text style={textVariants.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </OnboardingScreen>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: spacing.lg,
  },
  skipButton: {
    alignSelf: 'center',
    padding: 10,
    marginBottom: spacing.md,
  },
  skipText: {
    color: colors.gray,
    fontWeight: '600',
  },
  continueButton: {
    marginTop: spacing.sm,
  }
});

export default MealGoalsScreen; 