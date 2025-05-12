import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { colors, spacing, textVariants } from '@/styles/styles';

// Props for the option button
interface OptionButtonProps {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
}

/**
 * A button for selecting options during onboarding
 * Shows a selected state with a highlight color and checkmark
 */
const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  description,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={[styles.label, selected && styles.selectedText]}>{label}</Text>
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>
      
      {selected && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selected: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: '#F0F9F0', // Light green background
  },
  content: {
    flex: 1,
  },
  label: {
    ...textVariants.body,
    fontWeight: '600',
  },
  selectedText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  description: {
    ...textVariants.body,
    fontSize: 14,
    color: '#666',
    marginTop: spacing.xs,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  checkmarkText: {
    color: colors.background,
    fontWeight: 'bold',
  }
});

export default OptionButton; 