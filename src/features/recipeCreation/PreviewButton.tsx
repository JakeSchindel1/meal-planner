import React, { useState } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Modal, 
  View, 
  ScrollView, 
  Image, 
  ActivityIndicator,
  Pressable
} from 'react-native';
import { textVariants, colors, spacing, layout } from '@/styles/styles';
import { Ionicons } from '@expo/vector-icons';

interface PreviewButtonProps {
  recipeId: string;
}

/**
 * Button and modal for previewing how the recipe will look to users
 */
const PreviewButton: React.FC<PreviewButtonProps> = ({ recipeId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  
  const handleOpenPreview = async () => {
    setIsLoading(true);
    setIsModalVisible(true);
    
    try {
      // TODO: Add API call to get preview data
      console.log('Loading preview for recipe ID:', recipeId);
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Mock preview data
        setPreviewData({
          title: 'Delicious Recipe',
          image: 'https://via.placeholder.com/500',
          description: 'A wonderful recipe that is easy to make and tastes amazing!',
          ingredients: [
            '2 cups flour',
            '1 tsp salt',
            '1/2 cup butter',
            '2 eggs',
          ],
          instructions: [
            'Preheat oven to 350°F',
            'Mix dry ingredients in a bowl',
            'Add wet ingredients and mix well',
            'Bake for 30 minutes',
          ],
          appliances: ['Oven', 'Mixer'],
        });
        
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error loading preview:', error);
      setIsLoading(false);
    }
  };
  
  const handleClosePreview = () => {
    setIsModalVisible(false);
    setPreviewData(null);
  };
  
  return (
    <>
      <TouchableOpacity
        style={styles.previewButton}
        onPress={handleOpenPreview}
      >
        <Ionicons name="eye-outline" size={20} color={colors.primary} style={styles.icon} />
        <Text style={styles.previewText}>Preview</Text>
      </TouchableOpacity>
      
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={handleClosePreview}
      >
        <View style={styles.modalContainer}>
          {/* Header with close button */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Recipe Preview</Text>
            <Pressable onPress={handleClosePreview} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text} />
            </Pressable>
          </View>
          
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Loading preview...</Text>
            </View>
          ) : previewData ? (
            <ScrollView style={styles.previewContent}>
              {/* Recipe Image */}
              <Image 
                source={{ uri: previewData.image }} 
                style={styles.recipeImage} 
                resizeMode="cover"
              />
              
              {/* Recipe Title */}
              <Text style={styles.recipeTitle}>{previewData.title}</Text>
              
              {/* Recipe Description */}
              <Text style={styles.recipeDescription}>{previewData.description}</Text>
              
              {/* Ingredients */}
              <Text style={styles.sectionTitle}>Ingredients</Text>
              <View style={styles.ingredientsList}>
                {previewData.ingredients.map((ingredient: string, index: number) => (
                  <View key={index} style={styles.ingredientItem}>
                    <Ionicons name="ellipse" size={8} color={colors.primary} style={styles.bulletPoint} />
                    <Text style={styles.ingredientText}>{ingredient}</Text>
                  </View>
                ))}
              </View>
              
              {/* Instructions */}
              <Text style={styles.sectionTitle}>Instructions</Text>
              <View style={styles.instructionsList}>
                {previewData.instructions.map((instruction: string, index: number) => (
                  <View key={index} style={styles.instructionItem}>
                    <View style={styles.instructionNumber}>
                      <Text style={styles.instructionNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.instructionText}>{instruction}</Text>
                  </View>
                ))}
              </View>
              
              {/* Appliances */}
              <Text style={styles.sectionTitle}>Appliances</Text>
              <View style={styles.applianceList}>
                {previewData.appliances.map((appliance: string, index: number) => (
                  <View key={index} style={styles.applianceItem}>
                    <Text style={styles.applianceText}>{appliance}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                Failed to load preview. Please try again.
              </Text>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  previewText: {
    ...textVariants.body,
    color: colors.primary,
    fontWeight: '600',
  },
  icon: {
    marginRight: spacing.sm,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  modalTitle: {
    ...textVariants.subtitle,
  },
  closeButton: {
    padding: spacing.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...textVariants.body,
    marginTop: spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    ...textVariants.body,
    color: colors.error,
    textAlign: 'center',
  },
  previewContent: {
    flex: 1,
  },
  recipeImage: {
    width: '100%',
    height: 250,
  },
  recipeTitle: {
    ...textVariants.title,
    padding: spacing.lg,
  },
  recipeDescription: {
    ...textVariants.body,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...textVariants.subtitle,
    padding: spacing.lg,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  ingredientsList: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  bulletPoint: {
    marginRight: spacing.sm,
  },
  ingredientText: {
    ...textVariants.body,
  },
  instructionsList: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  instructionNumberText: {
    color: colors.background,
    fontWeight: 'bold',
  },
  instructionText: {
    ...textVariants.body,
    flex: 1,
  },
  applianceList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.lg,
    paddingTop: 0,
    gap: spacing.sm,
  },
  applianceItem: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  applianceText: {
    ...textVariants.body,
    color: colors.primary,
    fontSize: 12,
  },
});

export default PreviewButton; 