import { useState, useEffect } from 'react';
import { IngredientItem } from '../types';
import { IngredientsService } from '../services/ingredientsService';

/**
 * Custom hook for managing ingredients state and operations
 * This moves all the state logic out of the UI component
 */
export const useIngredients = (recipeId: string) => {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load ingredients when the hook is first used
  useEffect(() => {
    if (recipeId) {
      loadIngredients();
    }
  }, [recipeId]);

  /**
   * Loads ingredients from the database
   * This was previously scattered in the component
   */
  const loadIngredients = async () => {
    setIsLoading(true);
    try {
      const loadedIngredients = await IngredientsService.loadIngredients(recipeId);
      setIngredients(loadedIngredients);
    } catch (error) {
      console.error('Error loading ingredients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Adds a new blank ingredient
   * This was previously in the component's handleAddIngredient
   */
  const addIngredient = () => {
    const newIngredient = IngredientsService.createNewIngredient();
    setIngredients(prev => [...prev, newIngredient]);
  };

  /**
   * Updates an existing ingredient
   * This was previously in the component's handleUpdateIngredient
   */
  const updateIngredient = async (updatedIngredient: IngredientItem) => {
    // Update local state immediately for better UX
    setIngredients(prev => 
      prev.map(ingredient => 
        ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
      )
    );

    // Save to database in the background
    try {
      await IngredientsService.saveIngredient(recipeId, updatedIngredient);
    } catch (error) {
      console.error('Error saving ingredient:', error);
      // In a real app, you might want to revert the local state here
    }
  };

  /**
   * Deletes an ingredient
   * This was previously in the component's handleDeleteIngredient
   */
  const deleteIngredient = async (ingredientId: string) => {
    // Update local state immediately for better UX
    setIngredients(prev => 
      prev.filter(ingredient => ingredient.id !== ingredientId)
    );

    // Delete from database in the background
    try {
      await IngredientsService.deleteIngredient(recipeId, ingredientId);
    } catch (error) {
      console.error('Error deleting ingredient:', error);
      // In a real app, you might want to restore the ingredient here
    }
  };

  // Return the state and functions that the component needs
  return {
    ingredients,
    isLoading,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    refreshIngredients: loadIngredients,
  };
}; 