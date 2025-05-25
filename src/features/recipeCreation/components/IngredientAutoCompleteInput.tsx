import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { inputVariants, colors, spacing } from '@/styles/styles';
import supabase from '@/lib/supabaseClient';

interface IngredientAutoCompleteInputProps {
  value: string;
  onSelect: (name: string) => void;
}

const IngredientAutoCompleteInput: React.FC<IngredientAutoCompleteInputProps> = ({ value, onSelect }) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!inputValue) {
      setSuggestions([]);
      return;
    }

    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      fetchSuggestions(inputValue);
    }, 300);
    setDebounceTimer(timer);

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [inputValue]);

  const fetchSuggestions = async (query: string) => {
    const { data, error } = await supabase
      .from('ingredients')
      .select('name')
      .ilike('name', `${query}%`)
      .limit(10);

    if (!error && data) {
      setSuggestions(data.map(item => item.name));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (name: string) => {
    setInputValue(name);
    setSuggestions([]);
    onSelect(name);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[inputVariants.default, styles.fixedInput]}
        placeholder="Ingredient name"
        value={inputValue}
        onChangeText={setInputValue}
      />
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {suggestions.map((item) => (
            <TouchableOpacity key={item} onPress={() => handleSelect(item)} style={styles.suggestionItem}>
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  fixedInput: {
    width: 200, // ✅ fixed width for input
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',               
    left: 0,
    width: 200,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
    maxHeight: 150,
    overflow: 'scroll',
    marginTop: 4,
  },
  suggestionItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  suggestionText: {
    color: colors.text,
  },
});

export default IngredientAutoCompleteInput;
