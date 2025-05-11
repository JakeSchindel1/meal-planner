import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { OnboardingScreen, OptionButton, CustomTextInput } from '../../components';
import { OnboardingScreenProps } from '../../types/navigation';
import { useOnboarding } from '../../context';
import { onboardingContent } from '../../lib/constants/onboarding';
import { buttonVariants, colors, spacing, textVariants } from '../../styles/styles';

const AllergiesScreen: React.FC<OnboardingScreenProps<'Allergies'>> = ({ navigation }) => {
  // Get the content for this screen from onboarding content
  const content = onboardingContent.find(item => item.id === 'allergies')!;
  const { updatePreference, preferences } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(preferences.allergies || []);
  const [customAllergies, setCustomAllergies] = useState<string[]>(
    (preferences.allergies || []).filter(allergy => 
      !content.options.some(option => option.value === allergy)
    )
  );

  // Toggle selection of a predefined option
  const toggleOption = (value: string) => {
    setSelected(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // Add a custom allergy
  const addCustomAllergy = (value: string) => {
    // Don't add duplicates
    if (customAllergies.includes(value)) return;
    
    setCustomAllergies(prev => [...prev, value]);
    setSelected(prev => [...prev, value]);
  };

  // Remove a custom allergy
  const removeCustomAllergy = (value: string) => {
    setCustomAllergies(prev => prev.filter(item => item !== value));
    setSelected(prev => prev.filter(item => item !== value));
  };

  // Handle continue button press
  const handleContinue = () => {
    updatePreference('allergies', selected);
    navigation.navigate('MealTimes');
  };

  return (
    <OnboardingScreen
      title={content.question}
      description={content.description}
      currentStep={4}
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
      
      {content.customOption && (
        <View style={styles.customSection}>
          <Text style={styles.customTitle}>Add custom allergies or restrictions</Text>
          
          <CustomTextInput
            placeholder="Type here (e.g., soy, corn, beef)"
            onAdd={addCustomAllergy}
          />
          
          {customAllergies.length > 0 && (
            <View style={styles.customChipsContainer}>
              {customAllergies.map(item => (
                <View key={item} style={styles.customChip}>
                  <Text style={styles.customChipText}>{item}</Text>
                  <TouchableOpacity
                    onPress={() => removeCustomAllergy(item)}
                    style={styles.removeButton}
                  >
                    <Text>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
      
      <View style={styles.buttonContainer}>
        {content.allowSkip && (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate('MealTimes')}
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
  customSection: {
    marginTop: spacing.lg,
  },
  customTitle: {
    ...textVariants.body,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  customChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  customChip: {
    backgroundColor: '#F0F9F0', // Light green
    borderRadius: 16,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  customChipText: {
    color: colors.primary,
    marginRight: 4,
  },
  removeButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
  }
});

export default AllergiesScreen; 