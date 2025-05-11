import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { textVariants, inputVariants, colors, spacing } from '../../styles/styles';

interface RecipeNameInputProps {
  onNameSaved: (name: string, recipeId: string) => void;
}

/**
 * Input field for recipe name
 */
const RecipeNameInput: React.FC<RecipeNameInputProps> = ({ onNameSaved }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  // Update parent component when name changes
  const handleNameChange = (text: string) => {
    setName(text);
    setError('');
    
    // Pass the updated name to parent component
    // Using a placeholder recipeId since we're not creating a draft at this step
    onNameSaved(text, `recipe_${Date.now()}`);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipe Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[inputVariants.default, styles.input, error ? styles.inputError : null]}
          placeholder="Enter recipe name"
          value={name}
          onChangeText={handleNameChange}
          maxLength={100}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  label: {
    ...textVariants.subtitle,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.xs,
  },
});

export default RecipeNameInput; 