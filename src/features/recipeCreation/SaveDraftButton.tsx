import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { buttonVariants, textVariants, colors, spacing } from '../../styles/styles';
import { Ionicons } from '@expo/vector-icons';

interface SaveDraftButtonProps {
  recipeId: string;
  onSave: () => Promise<void>;
  isLoading: boolean;
}

/**
 * Button component for saving recipe as draft
 */
const SaveDraftButton: React.FC<SaveDraftButtonProps> = ({ 
  recipeId, 
  onSave, 
  isLoading 
}) => {
  return (
    <TouchableOpacity
      style={[styles.saveButton, isLoading && styles.disabledButton]}
      onPress={onSave}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.background} />
      ) : (
        <>
          <Ionicons name="save-outline" size={20} color={colors.background} style={styles.icon} />
          <Text style={textVariants.buttonText}>Save Draft</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    ...buttonVariants.secondary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  icon: {
    marginRight: spacing.sm,
  },
});

export default SaveDraftButton; 