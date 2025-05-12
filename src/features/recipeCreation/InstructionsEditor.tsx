import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { textVariants, colors, spacing } from '@/styles/styles';
import { Ionicons } from '@expo/vector-icons';
import InstructionRow from './InstructionRow';

interface InstructionsEditorProps {
  recipeId: string;
}

// Define instruction data type
export interface InstructionItem {
  id: string;
  stepNumber: number;
  text: string;
  timerSeconds?: number;
  animationKey?: string;
}

/**
 * Component for editing recipe instructions/steps
 */
const InstructionsEditor: React.FC<InstructionsEditorProps> = ({ recipeId }) => {
  const [instructions, setInstructions] = useState<InstructionItem[]>([]);
  
  // Add a new instruction step
  const handleAddInstruction = () => {
    const newInstruction: InstructionItem = {
      id: `instruction_${Date.now()}`,
      stepNumber: instructions.length + 1,
      text: '',
    };
    
    setInstructions([...instructions, newInstruction]);
  };
  
  // Update an instruction
  const handleUpdateInstruction = (updatedInstruction: InstructionItem) => {
    const updatedInstructions = instructions.map((instruction) => 
      instruction.id === updatedInstruction.id ? updatedInstruction : instruction
    );
    
    setInstructions(updatedInstructions);
    
    // TODO: Add API call to update instruction in database
    console.log('Updated instruction for recipe ID:', recipeId, updatedInstruction);
  };
  
  // Delete an instruction
  const handleDeleteInstruction = (instructionId: string) => {
    // Get the current instruction's position
    const deletedInstructionIndex = instructions.findIndex(
      (instruction) => instruction.id === instructionId
    );
    
    if (deletedInstructionIndex === -1) return;
    
    // Filter out the deleted instruction and update step numbers
    const updatedInstructions = instructions
      .filter((instruction) => instruction.id !== instructionId)
      .map((instruction, index) => ({
        ...instruction,
        stepNumber: index + 1,
      }));
    
    setInstructions(updatedInstructions);
    
    // TODO: Add API call to delete instruction from database
    console.log('Deleted instruction for recipe ID:', recipeId, instructionId);
  };
  
  // Reorder instructions
  const handleReorderInstructions = (startIndex: number, endIndex: number) => {
    if (startIndex === endIndex) return;
    
    const reorderedInstructions = [...instructions];
    const [removed] = reorderedInstructions.splice(startIndex, 1);
    reorderedInstructions.splice(endIndex, 0, removed);
    
    // Update step numbers
    const updatedInstructions = reorderedInstructions.map(
      (instruction, index) => ({
        ...instruction,
        stepNumber: index + 1,
      })
    );
    
    setInstructions(updatedInstructions);
    
    // TODO: Add API call to update instruction order in database
    console.log('Reordered instructions for recipe ID:', recipeId);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Instructions</Text>
        <Text style={styles.count}>{instructions.length} {instructions.length === 1 ? 'step' : 'steps'}</Text>
      </View>
      
      {instructions.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No instructions added yet</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {instructions.map((item, index) => (
            <React.Fragment key={item.id}>
              {index > 0 && <View style={styles.separator} />}
              <InstructionRow
                instructionData={item}
                onChange={handleUpdateInstruction}
                onDelete={handleDeleteInstruction}
                onReorder={(direction) => {
                  const newIndex = direction === 'up' ? index - 1 : index + 1;
                  handleReorderInstructions(index, newIndex);
                }}
                canMoveUp={index > 0}
                canMoveDown={index < instructions.length - 1}
              />
            </React.Fragment>
          ))}
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddInstruction}
      >
        <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
        <Text style={styles.addButtonText}>Add Instruction</Text>
      </TouchableOpacity>
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
  emptyState: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  emptyText: {
    ...textVariants.body,
    color: colors.gray,
  },
  list: {
    marginBottom: spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray,
    opacity: 0.3,
    marginVertical: spacing.sm,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  addButtonText: {
    ...textVariants.body,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
});

export default InstructionsEditor; 