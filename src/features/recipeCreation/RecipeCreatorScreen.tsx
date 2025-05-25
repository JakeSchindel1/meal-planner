// src/features/recipeCreation/RecipeCreatorScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { layout, colors, spacing } from '@/styles/styles';

import supabase from '@/lib/supabaseClient';
import { useAuth } from '@/context';
import { ENV } from '@/constants';

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

const RecipeCreatorScreen: React.FC = () => {
  const { user, authUserId } = useAuth();                             // ✅ get both from context
  const [recipeId, setRecipeId] = useState<string | null>(null);
  const [recipeName, setRecipeName] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log('✅ Supabase URL:', ENV.SUPABASE_URL);
    console.log('✅ Internal user ID (user table):', user?.id ?? 'None');
    console.log('✅ Supabase auth user ID:', authUserId ?? 'None');
  }, [user, authUserId]);

  const handleRecipeNameSaved = (name: string, id: string) => {
    setRecipeName(name);
    setRecipeId(id);
    console.log(`✅ Recipe created: ${id} with name: ${name}`);
  };

  const handleSaveDraft = async () => {
    if (!recipeId) return;
    if (!recipeName) {
      Alert.alert('Missing Info', 'Please enter a recipe name before saving');
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('recipes')
        .update({ title: recipeName, status: 'draft' })
        .eq('id', recipeId);

      if (error) throw error;
      Alert.alert('Success', 'Recipe draft saved successfully');
    } catch (error) {
      console.error('Error saving draft:', error);
      Alert.alert('Error', 'Failed to save recipe draft');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!recipeId) return;
    if (!recipeName) {
      Alert.alert('Missing Info', 'Please enter a recipe name before publishing');
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('recipes')
        .update({ title: recipeName, status: 'published' })
        .eq('id', recipeId);

      if (error) throw error;
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
      <RecipeNameInput
        onNameSaved={handleRecipeNameSaved}
        recipeId={recipeId}
        userId={authUserId ?? ''}
      />
      {recipeId && (
        <View style={styles.content}>
          <ImportButtonsBar recipeId={recipeId} />
          <PhotoUpload recipeId={recipeId} />
          <RecipeDescriptionInput recipeId={recipeId} />
          <IngredientsEditor recipeId={recipeId} />
          <InstructionsEditor recipeId={recipeId} />
          <ApplianceSelector recipeId={recipeId} />
          <View style={styles.actionButtons}>
            <SaveDraftButton 
              recipeId={recipeId} 
              onSave={handleSaveDraft} 
              isLoading={isSaving} 
            />
            <PublishButton 
              recipeId={recipeId} 
              onPublish={handlePublish} 
              isLoading={isSaving}
              isDisabled={!recipeName} 
            />
            <PreviewButton recipeId={recipeId} />
          </View>
        </View>
      )}
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
    paddingBottom: 100,
  },
  actionButtons: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
});

export default RecipeCreatorScreen;
