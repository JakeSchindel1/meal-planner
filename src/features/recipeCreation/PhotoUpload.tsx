import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { textVariants, colors, spacing } from '../../styles/styles';
import { Ionicons } from '@expo/vector-icons';

interface PhotoUploadProps {
  recipeId: string;
}

/**
 * Component for uploading and displaying the main recipe photo
 */
const PhotoUpload: React.FC<PhotoUploadProps> = ({ recipeId }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Handle photo selection
  const handleSelectPhoto = async () => {
    // TODO: Implement image picker functionality
    setIsUploading(true);
    
    try {
      // Simulate photo upload
      setTimeout(() => {
        // Placeholder image URL - replace with your actual image upload logic
        const placeholderUrl = 'https://via.placeholder.com/500';
        setPhotoUrl(placeholderUrl);
        
        // TODO: Save photo URL to recipe in database
        console.log('Uploaded photo for recipe ID:', recipeId);
        
        setIsUploading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error uploading photo:', error);
      Alert.alert('Error', 'Failed to upload photo');
      setIsUploading(false);
    }
  };
  
  // Handle removing the photo
  const handleRemovePhoto = () => {
    setPhotoUrl(null);
    // TODO: Remove photo from recipe in database
    console.log('Removed photo for recipe ID:', recipeId);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipe Photo</Text>
      
      {!photoUrl ? (
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={handleSelectPhoto}
          disabled={isUploading}
        >
          {isUploading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <>
              <Ionicons name="camera" size={32} color={colors.primary} />
              <Text style={styles.uploadText}>Tap to upload photo</Text>
            </>
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.photoContainer}>
          <Image 
            source={{ uri: photoUrl }} 
            style={styles.photo}
            resizeMode="cover"
          />
          <View style={styles.photoActions}>
            <TouchableOpacity 
              style={styles.photoActionButton}
              onPress={handleSelectPhoto}
            >
              <Ionicons name="refresh" size={24} color={colors.background} />
              <Text style={styles.actionButtonText}>Change</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.photoActionButton, styles.removeButton]}
              onPress={handleRemovePhoto}
            >
              <Ionicons name="trash" size={24} color={colors.background} />
              <Text style={styles.actionButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  uploadButton: {
    borderWidth: 2,
    borderColor: colors.gray,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    height: 200,
  },
  uploadText: {
    ...textVariants.body,
    color: colors.primary,
    marginTop: spacing.md,
  },
  photoContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    height: 200,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: spacing.sm,
  },
  photoActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  removeButton: {
    marginLeft: 'auto',
  },
  actionButtonText: {
    color: colors.background,
    marginLeft: spacing.xs,
  },
});

export default PhotoUpload; 