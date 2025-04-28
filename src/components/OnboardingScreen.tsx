import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { colors, spacing, textVariants, layout } from '../styles/styles';
import ProgressBar from './ProgressBar';

// Props for the onboarding screen template
interface OnboardingScreenProps {
  title: string;
  description?: string;
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

/**
 * A reusable template for onboarding screens
 * Includes progress bar, title, description, and child components
 */
const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  title,
  description,
  currentStep,
  totalSteps,
  children,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          
          {description ? (
            <Text style={styles.description}>{description}</Text>
          ) : null}
          
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    ...layout.container,
    flex: 1,
  },
  title: {
    ...textVariants.title,
    marginBottom: spacing.sm,
  },
  description: {
    ...textVariants.body,
    color: '#666',
    marginBottom: spacing.lg,
  },
  content: {
    flex: 1,
    marginTop: spacing.md,
  },
});

export default OnboardingScreen; 