import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { textVariants, colors, spacing, buttonVariants } from '@/styles/styles';
import { Ionicons } from '@expo/vector-icons';
import IngredientRow from './IngredientRow';

interface IngredientsEditorProps {
  recipeId: string;
}

// Define ingredient data type
export interface IngredientItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  note?: string;
}

/**
 * Component for editing the recipe ingredients list
 */
const IngredientsEditor: React.FC<IngredientsEditorProps> = ({ recipeId }) => {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  
  // Add a new blank ingredient
  const handleAddIngredient = () => {
    const newIngredient: IngredientItem = {
      id: `ingredient_${Date.now()}`,
      name: '',
      quantity: '',
      unit: '',
    };
    
    setIngredients([...ingredients, newIngredient]);
  };
  
  // Update an ingredient
  const handleUpdateIngredient = (updatedIngredient: IngredientItem) => {
    const updatedIngredients = ingredients.map((ingredient) => 
      ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
    );
    
    setIngredients(updatedIngredients);
    
    // TODO: Add API call to update ingredient in database
    console.log('Updated ingredient for recipe ID:', recipeId, updatedIngredient);
  };
  
  // Delete an ingredient
  const handleDeleteIngredient = (ingredientId: string) => {
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== ingredientId
    );
    
    setIngredients(updatedIngredients);
    
    // TODO: Add API call to delete ingredient from database
    console.log('Deleted ingredient for recipe ID:', recipeId, ingredientId);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Ingredients</Text>
        <Text style={styles.count}>{ingredients.length} {ingredients.length === 1 ? 'item' : 'items'}</Text>
      </View>
      
      {ingredients.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No ingredients added yet</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {ingredients.map((item, index) => (
            <React.Fragment key={item.id}>
              {index > 0 && <View style={styles.separator} />}
              <IngredientRow
                ingredientData={item}
                onChange={handleUpdateIngredient}
                onDelete={handleDeleteIngredient}
              />
            </React.Fragment>
          ))}
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddIngredient}
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