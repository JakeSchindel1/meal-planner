import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { textVariants, inputVariants, colors, spacing } from '@/styles/styles';

interface RecipeDescriptionInputProps {
  recipeId: string;
}

/**
 * Input field for recipe description
 */
const RecipeDescriptionInput: React.FC<RecipeDescriptionInputProps> = ({ recipeId }) => {
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Auto-save description when it changes after a delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveDescription();
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [description]);
  
  // Save description to database
  const saveDescription = async () => {
    if (!description.trim() || isSaving) return;
    
    setIsSaving(true);
    try {
      // TODO: Implement API call to save description
      console.log('Saving description for recipe ID:', recipeId, description);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error('Error saving description:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[inputVariants.default, styles.textArea]}
        placeholder="Describe your recipe in a few sentences..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        textAlignVertical="top" // makes Android TextInput expand vertically
      />
      {isSaving && (
        <Text style={styles.savingText}>Saving...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  label: {
    ...textVariants.subtitle,
    marginBottom: spacing.md,
  },
  textArea: {
    height: 120,
    paddingTop: spacing.md,
  },
  savingText: {
    ...textVariants.body,
    color: colors.gray,
    fontSize: 12,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
});

export default RecipeDescriptionInput; 