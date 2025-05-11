import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { layout, colors, spacing } from '../../styles/styles';

// Import child components
import RecipeNameInput from './RecipeNameInput';
import ImportButtonsBar from './ImportButtonsBar';
import PhotoUpload from './PhotoUpload';
import RecipeDescriptionInput from './RecipeDescriptionInput';
import IngredientsEditor from './IngredientsEditor';
import InstructionsEditor from './InstructionsEditor';
import ApplianceSelector from './ApplianceSelector';
import SaveDraftButton from './SaveDraftButton';
import PublishButton from './PublishButton';
import PreviewButton from './PreviewButton';

/**
 * Main component for creating and editing recipes
 * Manages overall state and coordinates child components
 */
const RecipeCreatorScreen: React.FC = () => {
  // Main state for recipe
  const [recipeId, setRecipeId] = useState<string | null>(`recipe_${Date.now()}`); // Create a default ID on load
  const [recipeName, setRecipeName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Handle when recipe name is saved
  const handleRecipeNameSaved = (name: string, id: string) => {
    setRecipeName(name);
    console.log(`Recipe name updated: ${name}`);
  };
  
  // Save draft
  const handleSaveDraft = async () => {
    if (!recipeId) return;
    
    // Validate that recipe has a name before saving
    if (!recipeName) {
      Alert.alert('Missing Info', 'Please enter a recipe name before saving');
      return;
    }
    
    setIsSaving(true);
    try {
      // TODO: Implement API call to save draft
      console.log('Saving draft for recipe ID:', recipeId);
      Alert.alert('Success', 'Recipe draft saved successfully');
    } catch (error) {
      console.error('Error saving draft:', error);
      Alert.alert('Error', 'Failed to save recipe draft');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Publish recipe
  const handlePublish = async () => {
    if (!recipeId) return;
    
    // Validate that recipe has a name before publishing
    if (!recipeName) {
      Alert.alert('Missing Info', 'Please enter a recipe name before publishing');
      return;
    }
    
    setIsSaving(true);
    try {
      // TODO: Implement API call to publish recipe
      console.log('Publishing recipe ID:', recipeId);
      Alert.alert('Success', 'Recipe published successfully');
    } catch (error) {
      console.error('Error publishing recipe:', error);
      Alert.alert('Error', 'Failed to publish recipe');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Recipe Name */}
        <RecipeNameInput onNameSaved={handleRecipeNameSaved} />
        
        {/* Import Tools */}
        <ImportButtonsBar recipeId={recipeId || ''} />
        
        {/* Photo Upload */}
        <PhotoUpload recipeId={recipeId || ''} />
        
        {/* Description */}
        <RecipeDescriptionInput recipeId={recipeId || ''} />
        
        {/* Ingredients */}
        <IngredientsEditor recipeId={recipeId || ''} />
        
        {/* Instructions */}
        <InstructionsEditor recipeId={recipeId || ''} />
        
        {/* Appliances */}
        <ApplianceSelector recipeId={recipeId || ''} />
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <SaveDraftButton 
            recipeId={recipeId || ''} 
            onSave={handleSaveDraft} 
            isLoading={isSaving} 
          />
          <PublishButton 
            recipeId={recipeId || ''} 
            onPublish={handlePublish} 
            isLoading={isSaving}
            isDisabled={!recipeName} 
          />
          <PreviewButton recipeId={recipeId || ''} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    ...layout.container,
    padding: spacing.lg,
    paddingBottom: 100, // Extra padding at bottom for better scrolling
  },
  actionButtons: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
});

export default RecipeCreatorScreen; 