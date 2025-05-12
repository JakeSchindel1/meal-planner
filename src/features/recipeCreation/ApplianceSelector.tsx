import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { textVariants, colors, spacing } from '@/styles/styles';
import { Ionicons } from '@expo/vector-icons';

interface ApplianceSelectorProps {
  recipeId: string;
}

// Sample appliance data - in a real app this would come from your API
interface Appliance {
  id: string;
  name: string;
  icon?: string;
}

const SAMPLE_APPLIANCES: Appliance[] = [
  { id: 'oven', name: 'Oven', icon: 'flame' },
  { id: 'stove', name: 'Stove', icon: 'flame-outline' },
  { id: 'microwave', name: 'Microwave', icon: 'radio' },
  { id: 'blender', name: 'Blender', icon: 'cut' },
  { id: 'food_processor', name: 'Food Processor', icon: 'restaurant' },
  { id: 'instant_pot', name: 'Instant Pot', icon: 'timer' },
  { id: 'air_fryer', name: 'Air Fryer', icon: 'thermometer' },
  { id: 'slow_cooker', name: 'Slow Cooker', icon: 'time' },
];

/**
 * Component for selecting appliances used in the recipe
 */
const ApplianceSelector: React.FC<ApplianceSelectorProps> = ({ recipeId }) => {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load available appliances
  useEffect(() => {
    const loadAppliances = async () => {
      setIsLoading(true);
      
      try {
        // TODO: Replace with actual API call to get appliances
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setAppliances(SAMPLE_APPLIANCES);
        
        // TODO: Load selected appliances for this recipe from API
        // For now, leave none selected
      } catch (error) {
        console.error('Error loading appliances:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAppliances();
  }, [recipeId]);
  
  // Toggle appliance selection
  const toggleAppliance = (applianceId: string) => {
    const newSelectedIds = selectedIds.includes(applianceId)
      ? selectedIds.filter(id => id !== applianceId)
      : [...selectedIds, applianceId];
    
    setSelectedIds(newSelectedIds);
    
    // TODO: Save selected appliances to database
    console.log('Updated appliances for recipe ID:', recipeId, newSelectedIds);
  };
  
  // Render appliance item
  const renderAppliance = (item: Appliance) => {
    const isSelected = selectedIds.includes(item.id);
    
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.applianceItem,
          isSelected && styles.selectedApplianceItem
        ]}
        onPress={() => toggleAppliance(item.id)}
      >
        {item.icon && (
          <Ionicons 
            name={item.icon as any} 
            size={20} 
            color={isSelected ? colors.background : colors.primary} 
            style={styles.applianceIcon}
          />
        )}
        <Text 
          style={[
            styles.applianceName,
            isSelected && styles.selectedApplianceName
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  
  // Chunk the appliances into pairs
  const renderApplianceGrid = () => {
    const rows = [];
    // Split appliances into rows of 2
    for (let i = 0; i < appliances.length; i += 2) {
      const rowItems = appliances.slice(i, i + 2);
      rows.push(
        <View key={`row_${i}`} style={styles.applianceRow}>
          {rowItems.map(renderAppliance)}
          {/* Add empty space if odd number of items */}
          {rowItems.length === 1 && <View style={styles.emptyApplianceSpace} />}
        </View>
      );
    }
    return rows;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Appliances</Text>
        <Text style={styles.count}>
          {selectedIds.length} {selectedIds.length === 1 ? 'selected' : 'selected'}
        </Text>
      </View>
      
      {isLoading ? (
        <Text style={styles.loadingText}>Loading appliances...</Text>
      ) : (
        <>
          <Text style={styles.helper}>
            Select the appliances needed for this recipe:
          </Text>
          
          <View style={styles.applianceGrid}>
            {renderApplianceGrid()}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    ...textVariants.subtitle,
  },
  count: {
    ...textVariants.body,
    color: colors.gray,
  },
  helper: {
    ...textVariants.body,
    marginBottom: spacing.md,
  },
  loadingText: {
    ...textVariants.body,
    color: colors.gray,
    fontStyle: 'italic',
    marginBottom: spacing.lg,
  },
  applianceGrid: {
    marginBottom: spacing.md,
  },
  applianceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  applianceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: spacing.sm,
    width: '48%',
  },
  emptyApplianceSpace: {
    width: '48%',
  },
  selectedApplianceItem: {
    backgroundColor: colors.primary,
  },
  applianceIcon: {
    marginRight: spacing.sm,
  },
  applianceName: {
    ...textVariants.body,
    color: colors.primary,
  },
  selectedApplianceName: {
    color: colors.background,
  },
});

export default ApplianceSelector; 