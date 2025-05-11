import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { OnboardingScreen, OptionButton } from '../../components';
import { OnboardingScreenProps } from '../../types/navigation';
import { useOnboarding } from '../../context';
import { onboardingContent } from '../../lib/constants/onboarding';
import { buttonVariants, colors, spacing, textVariants } from '../../styles/styles';

const MealDaysScreen: React.FC<OnboardingScreenProps<'MealDays'>> = ({ navigation }) => {
  // Get the content for this screen from onboarding content
  const content = onboardingContent.find(item => item.id === 'mealDays')!;
  const { updatePreference, preferences } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(preferences.mealDays || []);

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
    updatePreference('mealDays', selected);
    navigation.navigate('TransitionToAccount');
  };

  return (
    <OnboardingScreen
      title={content.question}
      description={content.description}
      currentStep={9}
      totalSteps={onboardingContent.length}
    >
      <View style={styles.daysContainer}>
        {content.options.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.dayButton,
              selected.includes(option.value) && styles.selectedDay
            ]}
            onPress={() => toggleOption(option.value)}
          >
            <Text 
              style={[
                styles.dayText, 
                selected.includes(option.value) && styles.selectedDayText
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.buttonContainer}>
        {content.allowSkip && (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate('TransitionToAccount')}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[
            buttonVariants.primary, 
            styles.continueButton,
            selected.length === 0 && styles.disabledButton
          ]}
          disabled={selected.length === 0}
          onPress={handleContinue}
        >
          <Text style={textVariants.buttonText}>See my results</Text>
        </TouchableOpacity>
      </View>
    </OnboardingScreen>
  );
};

const styles = StyleSheet.create({
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  dayButton: {
    width: '30%',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  selectedDay: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: '#F0F9F0',
  },
  dayText: {
    ...textVariants.body,
    fontWeight: '600',
  },
  selectedDayText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
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
  },
  disabledButton: {
    opacity: 0.5,
  }
});

export default MealDaysScreen; 