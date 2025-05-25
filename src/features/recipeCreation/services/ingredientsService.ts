import supabase from '@/lib/supabaseClient';
import { IngredientItem } from '../types';

/**
 * Service for handling ingredient-related database operations
 * This keeps all the business logic separate from UI components
 */
export class IngredientsService {
  
  /**
   * Creates a new ingredient ID using timestamp
   * This was previously done in the component
   */
  static generateIngredientId(): string {
    return `ingredient_${Date.now()}`;
  }

  /**
   * Creates a new blank ingredient object
   * This standardizes how new ingredients are created
   */
  static createNewIngredient(): IngredientItem {
    return {
      id: this.generateIngredientId(),
      name: '',
      quantity: '',
      unit: '',
    };
  }

  /**
   * Saves an ingredient to the database
   * TODO: Implement actual database save when ready
   */
  static async saveIngredient(recipeId: string, ingredient: IngredientItem): Promise<void> {
    // This will replace the TODO comments in the components
    console.log('Saving ingredient for recipe ID:', recipeId, ingredient);
    
    // Future implementation:
    // const { error } = await supabase
    //   .from('recipe_ingredients')
    //   .upsert({
    //     recipe_id: recipeId,
    //     ingredient_id: ingredient.id,
    //     name: ingredient.name,
    //     quantity: ingredient.quantity,
    //     unit: ingredient.unit,
    //     note: ingredient.note
    //   });
    // 
    // if (error) throw error;
  }

  /**
   * Deletes an ingredient from the database
   * TODO: Implement actual database delete when ready
   */
  static async deleteIngredient(recipeId: string, ingredientId: string): Promise<void> {
    // This will replace the TODO comments in the components
    console.log('Deleting ingredient for recipe ID:', recipeId, ingredientId);
    
    // Future implementation:
    // const { error } = await supabase
    //   .from('recipe_ingredients')
    //   .delete()
    //   .eq('recipe_id', recipeId)
    //   .eq('ingredient_id', ingredientId);
    // 
    // if (error) throw error;
  }

  /**
   * Loads ingredients for a recipe from the database
   * TODO: Implement actual database load when ready
   */
  static async loadIngredients(recipeId: string): Promise<IngredientItem[]> {
    console.log('Loading ingredients for recipe ID:', recipeId);
    
    // Future implementation:
    // const { data, error } = await supabase
    //   .from('recipe_ingredients')
    //   .select('*')
    //   .eq('recipe_id', recipeId);
    // 
    // if (error) throw error;
    // return data || [];
    
    // For now, return empty array
    return [];
  }
} 