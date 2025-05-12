import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { inputVariants, colors, spacing } from '@/styles/styles';
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

const IngredientRow: React.FC<IngredientRowProps> = ({
  ingredientData,
  onChange,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(ingredientData.name === '');
  const [ingredient, setIngredient] = useState(ingredientData);
  const [showUnitOptions, setShowUnitOptions] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (ingredient !== ingredientData) {
        onChange(ingredient);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [ingredient]);

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
            placeholder="Notes (optional, e.g. 'diced')"
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
              {ingredient.note ? `, ${ingredient.note}` : ''}
            </Text>
          </View>

          <View style={styles.displayActions}>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Ionicons name="pencil" size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(ingredient.id)}>
              <Ionicons name="trash" size={20} color={colors.danger} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  editContainer: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  nameInput: {
    flex: 1,
  },
  quantityInput: {
    width: 80,
    marginRight: spacing.sm,
  },
  unitContainer: {
    flex: 1,
  },
  unitInput: {},
  unitDropdown: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    zIndex: 10,
  },
  unitOption: {
    padding: spacing.sm,
  },
  unitOptionText: {
    color: colors.text,
  },
  noteInput: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  doneText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  displayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayContent: {},
  displayActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsText: {
    color: colors.textSecondary,
  },
});

export default IngredientRow;
