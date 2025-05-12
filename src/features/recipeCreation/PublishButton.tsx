import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { buttonVariants, textVariants, colors, spacing } from '@/styles/styles';
import { Ionicons } from '@expo/vector-icons';

interface PublishButtonProps {
  recipeId: string;
  onPublish: () => Promise<void>;
  isLoading: boolean;
  isDisabled?: boolean;
}

/**
 * Button component for publishing a recipe (making it publicly visible)
 */
const PublishButton: React.FC<PublishButtonProps> = ({ 
  recipeId, 
  onPublish, 
  isLoading,
  isDisabled = false
}) => {
  return (
    <TouchableOpacity
      style={[styles.publishButton, (isLoading || isDisabled) && styles.disabledButton]}
      onPress={onPublish}
      disabled={isLoading || isDisabled}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.background} />
      ) : (
        <>
          <Ionicons name="cloud-upload-outline" size={20} color={colors.background} style={styles.icon} />
          <Text style={textVariants.buttonText}>Publish Recipe</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  publishButton: {
    ...buttonVariants.primary,
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

export default PublishButton; 