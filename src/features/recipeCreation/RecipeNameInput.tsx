// src/features/recipeCreation/RecipeNameInput.tsx
import React, { useState } from 'react';
import { TextInput, Button, Alert } from 'react-native';
import supabase from '@/lib/supabaseClient';

interface RecipeNameInputProps {
  userId: string;                              // ✅ new prop
  onNameSaved: (name: string, recipeId: string) => void;
  recipeId: string | null;
}

const RecipeNameInput: React.FC<RecipeNameInputProps> = ({
  userId,
  onNameSaved,
  recipeId
}) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const createDraft = async () => {
    if (!name || recipeId || !userId) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('recipes')
        .insert([{ title: name, creator_id: userId, status: 'draft' }])
        .select()
        .single();

      if (error) throw error;
      if (data) onNameSaved(name, data.id);

    } catch (error: any) {
      Alert.alert('Error creating recipe', error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
    console.log('🔎 recipe insert payload:', {
      title: name,
      status: 'draft'
    });    
  };

  return (
    <>
      <TextInput
        placeholder="Enter recipe name"
        value={name}
        onChangeText={setName}
        onBlur={createDraft}                    // ✅ auto-create on blur
        editable={!loading}
        style={{ marginBottom: 12, borderBottomWidth: 1, borderColor: '#ccc', padding: 8 }}
      />
      <Button
        title={loading ? 'Saving...' : (recipeId ? 'Name Saved' : 'Save Name')}
        onPress={createDraft}
        disabled={!name || loading || !!recipeId}
      />
    </>
  );
};

export default RecipeNameInput;
