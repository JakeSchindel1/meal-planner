import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/styles';

// Props for the progress bar component
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

/**
 * A simple progress bar that shows onboarding progress
 * Highlights the current step in the primary color
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  // Calculate the percentage of completion (number between 0-1)
  const progress = currentStep / totalSteps;
  
  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View 
          style={[
            styles.fill, 
            { width: `${progress * 100}%` }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  track: {
    height: 8,
    backgroundColor: colors.gray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
});

export default ProgressBar; 