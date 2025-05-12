import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { buttonVariants, textVariants, colors, spacing, inputVariants } from '@/styles/styles';
import { Ionicons } from '@expo/vector-icons';

interface ImportButtonsBarProps {
  recipeId: string;
}

/**
 * Provides options to import recipe data from website URL or by scanning a recipe card
 */
const ImportButtonsBar: React.FC<ImportButtonsBarProps> = ({ recipeId }) => {
  const [urlModalVisible, setUrlModalVisible] = useState(false);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle import from website
  const handleImportFromWeb = async () => {
    if (!url.trim()) {
      Alert.alert('Error', 'Please enter a valid URL');
      return;
    }
    
    setIsLoading(true);
    try {
      // TODO: Implement API call to import recipe from URL
      console.log('Importing recipe from URL:', url, 'for recipe ID:', recipeId);
      
      // Simulate API call
      setTimeout(() => {
        Alert.alert('Success', 'Recipe imported successfully!');
        setUrlModalVisible(false);
        setUrl('');
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error importing recipe:', error);
      Alert.alert('Error', 'Failed to import recipe');
      setIsLoading(false);
    }
  };
  
  // Handle scan recipe card
  const handleScanRecipe = () => {
    // TODO: Implement camera integration
    Alert.alert('Coming Soon', 'Recipe scanning will be available in the next update!');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Import Recipe</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.importButton}
          onPress={() => setUrlModalVisible(true)}
        >
          <Ionicons name="globe-outline" size={24} color={colors.primary} />
          <Text style={styles.buttonText}>Import from Website</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.importButton}
          onPress={handleScanRecipe}
        >
          <Ionicons name="camera-outline" size={24} color={colors.primary} />
          <Text style={styles.buttonText}>Scan Recipe Card</Text>
        </TouchableOpacity>
      </View>
      
      {/* URL Input Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={urlModalVisible}
        onRequestClose={() => setUrlModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Import Recipe from Website</Text>
            <TextInput
              style={[inputVariants.default, styles.urlInput]}
              placeholder="Paste recipe URL here"
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              autoFocus
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => {
                  setUrlModalVisible(false);
                  setUrl('');
                }}
                disabled={isLoading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[buttonVariants.primary, styles.importUrlButton]}
                onPress={handleImportFromWeb}
                disabled={isLoading}
              >
                <Text style={textVariants.buttonText}>
                  {isLoading ? 'Importing...' : 'Import'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  label: {
    ...textVariants.subtitle,
    marginBottom: spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: spacing.md,
    flex: 1,
  },
  buttonText: {
    ...textVariants.body,
    color: colors.primary,
    marginLeft: spacing.sm,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: spacing.lg,
    width: '100%',
  },
  modalTitle: {
    ...textVariants.subtitle,
    marginBottom: spacing.lg,
  },
  urlInput: {
    marginBottom: spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
  },
  cancelButton: {
    padding: spacing.md,
  },
  cancelButtonText: {
    ...textVariants.body,
    color: colors.text,
  },
  importUrlButton: {
    minWidth: 100,
  },
});

export default ImportButtonsBar; 