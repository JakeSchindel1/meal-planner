import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { inputVariants, colors, spacing } from '../../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { IngredientItem } from './IngredientsEditor';

interface IngredientRowProps {
  ingredientData: IngredientItem;
  onChange: (updatedIngredient: IngredientItem) => void;
  onDelete: (ingredientId: string) => void;
}

// Common units for dropdown (in a real app, this could come from an API)
const COMMON_UNITS = [
  'g', 'kg', 'ml', 'l', 'cup', 'tbsp', 'tsp', 'oz', 'lb', 'pinch', 'piece', 'slice'
];

/**
 * Component for a single ingredient row entry
 */
const IngredientRow: React.FC<IngredientRowProps> = ({ 
  ingredientData, 
  onChange, 
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(ingredientData.name === '');
  const [ingredient, setIngredient] = useState(ingredientData);
  const [showUnitOptions, setShowUnitOptions] = useState(false);
  
  // Update parent when ingredient changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (ingredient !== ingredientData) {
        onChange(ingredient);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [ingredient]);
  
  // Update local state
  const updateIngredient = (field: keyof IngredientItem, value: string) => {
    setIngredient({ ...ingredient, [field]: value });
  };
  
  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <View style={styles.row}>
            <TextInput
              style={[inputVariants.default, styles.nameInput]}
              placeholder="Ingredient name"
              value={ingredient.name}
              onChangeText={(text) => updateIngredient('name', text)}
              autoFocus
            />
          </View>
          
          <View style={styles.row}>
            <TextInput
              style={[inputVariants.default, styles.quantityInput]}
              placeholder="Qty"
              value={ingredient.quantity}
              onChangeText={(text) => updateIngredient('quantity', text)}
              keyboardType="numeric"
            />
            
            <View style={styles.unitContainer}>
              <TextInput
                style={[inputVariants.default, styles.unitInput]}
                placeholder="Unit"
                value={ingredient.unit}
                onChangeText={(text) => updateIngredient('unit', text)}
                onFocus={() => setShowUnitOptions(true)}
              />
              
              {showUnitOptions && (
                <View style={styles.unitDropdown}>
                  {COMMON_UNITS.map((unit) => (
                    <TouchableOpacity
                      key={unit}
                      style={styles.unitOption}
                      onPress={() => {
                        updateIngredient('unit', unit);
                        setShowUnitOptions(false);
                      }}
                    >
                      <Text style={styles.unitOptionText}>{unit}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
          
          <TextInput
            style={[inputVariants.default, styles.noteInput]}
            placeholder="Notes (optional, e.g. 'diced' or 'room temp')"
            value={ingredient.note || ''}
            onChangeText={(text) => updateIngredient('note', text)}
          />
          
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.displayContainer}>
          <View style={styles.displayContent}>
            <Text style={styles.nameText}>{ingredient.name}</Text>
            <Text style={styles.detailsText}>
              {ingredient.quantity} {ingredient.unit}
              {ingredient.note && `, ${ingredient.note}`}
            </Text>
          </View>
          
          <View style={styles.displayActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="pencil-outline" size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => onDelete(ingredient.id)}
            >
              <Ionicons name="trash-outline" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: spacing.sm,
  },
  editContainer: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  nameInput: {
    flex: 1,
  },
  quantityInput: {
    width: 80,
  },
  unitContainer: {
    flex: 1,
    position: 'relative',
  },
  unitInput: {
    flex: 1,
  },
  unitDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    marginTop: spacing.xs,
    maxHeight: 150,
    zIndex: 1,
    elevation: 5,
  },
  unitOption: {
    padding: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  unitOptionText: {
    fontSize: 14,
  },
  noteInput: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: spacing.sm,
  },
  doneText: {
    color: colors.primary,
    fontWeight: '600',
  },
  displayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayContent: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  detailsText: {
    fontSize: 14,
    color: colors.text,
  },
  displayActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
});

export default IngredientRow; 