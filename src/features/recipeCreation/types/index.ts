// Shared types for recipe creation feature

/**
 * Represents a single ingredient in a recipe
 */
export interface IngredientItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  note?: string;
} 