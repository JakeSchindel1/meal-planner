// src/features/recipeCreation/RecipeNameInput.tsx
import React, { useState } from 'react';
import { TextInput, Button, Alert, View, FlatList, TouchableOpacity, Text, Modal, StyleSheet, SafeAreaView } from 'react-native';
import supabase from '@/lib/supabaseClient';

interface RecipeNameInputProps {
  userId: string;
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
  const [showDrafts, setShowDrafts] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);

  const createDraft = async () => {
    if (!name || !userId) return;

    setLoading(true);
    try {
      if (recipeId) {
        // ✅ update existing draft
        const { error } = await supabase
          .from('recipes')
          .update({ title: name })
          .eq('id', recipeId);

        if (error) throw error;
      } else {
        // ✅ create new draft
        const { data, error } = await supabase
          .from('recipes')
          .insert([{ title: name, status: 'draft' }])
          .select()
          .single();

        if (error) throw error;
        if (data) onNameSaved(name, data.id);
      }
    } catch (error: any) {
      Alert.alert('Error saving recipe', error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const loadDrafts = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('status', 'draft');

      if (error) throw error;
      setDrafts(data ?? []);
      setShowDrafts(true);
    } catch (error: any) {
      Alert.alert('Error loading drafts', error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const deleteDraft = async () => {
    if (!recipeId) return;
    Alert.alert('Delete Draft?', 'Are you sure you want to delete this draft?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
          try {
            const { error } = await supabase
              .from('recipes')
              .delete()
              .eq('id', recipeId);

            if (error) throw error;
            setName('');
            onNameSaved('', '');
          } catch (error: any) {
            Alert.alert('Error deleting draft', error.message || 'Unknown error');
          }
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>What's Cooking?</Text>
        <Text style={styles.heroSubtitle}>Share your next culinary masterpiece!</Text>
      </View>

      {/* Main Action Card */}
      <View style={styles.mainCard}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="My Amazing Recipe..."
            value={name}
            onChangeText={setName}
            onBlur={createDraft}
            editable={!loading}
            style={styles.recipeInput}
            placeholderTextColor="#999"
          />
          <TouchableOpacity 
            style={[styles.createButton, (!name || loading) && styles.createButtonDisabled]}
            onPress={createDraft}
            disabled={!name || loading}
          >
            <Text style={styles.createButtonText}>
              {loading ? '✨ Saving...' : (recipeId ? '✅ Saved!' : '🚀 Start Creating')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Cards */}
      <View style={styles.actionCards}>
        <TouchableOpacity style={styles.actionCard} onPress={loadDrafts}>
          <Text style={styles.actionEmoji}>📝</Text>
          <Text style={styles.actionTitle}>Continue Draft</Text>
          <Text style={styles.actionSubtitle}>
            {drafts.length > 0 ? `${drafts.length} waiting for you!` : 'No drafts yet'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionEmoji}>📱</Text>
          <Text style={styles.actionTitle}>Import Recipe</Text>
          <Text style={styles.actionSubtitle}>From URL or photo</Text>
        </TouchableOpacity>
      </View>

      {/* Delete Draft Button (only show if editing) */}
      {recipeId && (
        <TouchableOpacity style={styles.deleteButton} onPress={deleteDraft}>
          <Text style={styles.deleteButtonText}>🗑️ Delete This Draft</Text>
        </TouchableOpacity>
      )}

      {/* Drafts Modal - keeping the existing beautiful grid */}
      <Modal visible={showDrafts} animationType="slide">
        <SafeAreaView style={styles.modalContent}>
          <Text style={styles.modalTitle}>📝 Your Recipe Drafts</Text>
          
          {drafts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateEmoji}>🍽️</Text>
              <Text style={styles.emptyStateText}>No drafts found</Text>
              <Text style={styles.emptyStateSubtext}>Start creating to see drafts here!</Text>
            </View>
          ) : (
            <FlatList
              data={drafts}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.gridContainer}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.draftTile}
                  onPress={() => {
                    setName(item.title);
                    onNameSaved(item.title, item.id);
                    setShowDrafts(false);
                  }}
                >
                  <Text style={styles.draftText} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.draftDate}>{new Date(item.created_at).toLocaleDateString()}</Text>
                </TouchableOpacity>
              )}
            />
          )}
          
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowDrafts(false)}>
              <Text style={styles.closeButtonText}>✨ Close</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff', // Soft background like Duolingo
  },
  heroSection: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
    backgroundColor: '#667eea', // Beautiful purple gradient fallback for React Native
  },
  heroEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#e8eaff',
    textAlign: 'center',
  },
  mainCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    margin: 20,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  inputContainer: {
    gap: 12,
  },
  recipeInput: {
    padding: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: '#f7fafc',
    color: '#2d3748',
  },
  createButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#48bb78', // Green like success
    alignItems: 'center',
    shadowColor: '#48bb78',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonDisabled: {
    backgroundColor: '#cbd5e0',
    shadowOpacity: 0,
    elevation: 0,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionCards: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#f56565',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    margin: 20,
    shadowColor: '#f56565',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContent: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9ff'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#2d3748',
  },
  draftItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  draftText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2d3748'
  },
  draftDate: {
    fontSize: 12,
    color: '#718096'
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  gridContainer: {
    paddingVertical: 16,
  },
  draftTile: {
    width: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    minHeight: 100,
    justifyContent: 'space-between',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2d3748',
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  closeButton: {
    backgroundColor: '#667eea',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default RecipeNameInput;
