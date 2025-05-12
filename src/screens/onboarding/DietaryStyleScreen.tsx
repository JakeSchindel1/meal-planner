import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { OnboardingScreen, OptionButton } from '@/components';
import { OnboardingScreenProps } from '@/types/navigation';
import { useOnboarding } from '@/context';
import { onboardingContent } from '@/constants/onboarding';
import { colors } from '@/styles/styles';

const DietaryStyleScreen: React.FC<OnboardingScreenProps<'DietaryStyle'>> = ({ navigation }) => {
  // Get the content for this screen from onboarding content
  const content = onboardingContent.find(item => item.id === 'dietaryStyle')!;
  const { updatePreference, preferences } = useOnboarding();
  const [selected, setSelected] = useState<string | undefined>(preferences.dietaryStyle);

  // Auto-advance when an option is selected after a small delay (for animation)
  useEffect(() => {
    if (selected) {
      const timer = setTimeout(() => {
        navigation.navigate('Allergies');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selected, navigation]);

  // Handle option selection
  const handleSelect = (value: string) => {
    setSelected(value);
    updatePreference('dietaryStyle', value);
  };

  return (
    <OnboardingScreen
      title={content.question}
      description={content.description}
      currentStep={3}
      totalSteps={onboardingContent.length}
    >
      {content.options.map(option => (
        <OptionButton
          key={option.value}
          label={option.label}
          description={option.description}
          selected={selected === option.value}
          onPress={() => handleSelect(option.value)}
        />
      ))}
      
      {content.allowSkip && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('Allergies')}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}
    </OnboardingScreen>
  );
};

const styles = StyleSheet.create({
  skipButton: {
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
  },
  skipText: {
    color: colors.gray,
    fontWeight: '600',
  },
});

export default DietaryStyleScreen; 