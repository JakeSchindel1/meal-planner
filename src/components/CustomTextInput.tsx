import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, inputVariants } from '../styles/styles';

// Props for the custom text input with add button
interface CustomTextInputProps {
  placeholder: string;
  onAdd: (value: string) => void;
}

/**
 * A text input with an "Add" button for custom entries
 * Used for adding custom allergies/restrictions
 */
const CustomTextInput: React.FC<CustomTextInputProps> = ({ placeholder, onAdd }) => {
  const [text, setText] = useState('');

  // Handle adding the text and clearing the input
  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
        returnKeyType="done"
        onSubmitEditing={handleAdd}
      />
      <TouchableOpacity
        style={[styles.addButton, !text.trim() && styles.disabledButton]}
        onPress={handleAdd}
        disabled={!text.trim()}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: spacing.md,
  },
  input: {
    ...inputVariants.default,
    flex: 1,
    marginBottom: 0,
  },
  addButton: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    marginLeft: spacing.sm,
  },
  disabledButton: {
    backgroundColor: colors.gray,
  },
  addButtonText: {
    color: colors.background,
    fontWeight: 'bold',
  },
});

export default CustomTextInput; 