import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { textVariants, colors, spacing } from '@/styles/styles';
import { Ionicons } from '@expo/vector-icons';
import IngredientRow from './IngredientRow';
import { useIngredients } from './hooks/useIngredients';

interface IngredientsEditorProps {
  recipeId: string;
}

/**
 * Component for editing the recipe ingredients list
 * Now focuses purely on UI - all business logic moved to useIngredients hook
 */
const IngredientsEditor: React.FC<IngredientsEditorProps> = ({ recipeId }) => {
  // All state management and business logic is now in this custom hook
  const {
    ingredients,
    isLoading,
    addIngredient,
    updateIngredient,
    deleteIngredient,
  } = useIngredients(recipeId);
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Ingredients</Text>
        <Text style={styles.count}>{ingredients.length} {ingredients.length === 1 ? 'item' : 'items'}</Text>
      </View>
      
      {ingredients.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            {isLoading ? 'Loading ingredients...' : 'No ingredients added yet'}
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {ingredients.map((item, index) => (
            <React.Fragment key={item.id}>
              {index > 0 && <View style={styles.separator} />}
              <IngredientRow
                ingredientData={item}
                onChange={updateIngredient}
                onDelete={deleteIngredient}
              />
            </React.Fragment>
          ))}
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={addIngredient}
        disabled={isLoading}
      >
        <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
        <Text style={styles.addButtonText}>Add Ingredient</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    ...textVariants.subtitle,
  },
  count: {
    ...textVariants.body,
    color: colors.gray,
  },
  emptyState: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  emptyText: {
    ...textVariants.body,
    color: colors.gray,
  },
  list: {
    marginBottom: spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray,
    opacity: 0.3,
    marginVertical: spacing.sm,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  addButtonText: {
    ...textVariants.body,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
});

export default IngredientsEditor; 