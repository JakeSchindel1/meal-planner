import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { inputVariants, colors, spacing, textVariants } from '../../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { InstructionItem } from './InstructionsEditor';

interface InstructionRowProps {
  instructionData: InstructionItem;
  onChange: (updatedInstruction: InstructionItem) => void;
  onDelete: (instructionId: string) => void;
  onReorder: (direction: 'up' | 'down') => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

/**
 * Component for a single instruction row entry
 */
const InstructionRow: React.FC<InstructionRowProps> = ({ 
  instructionData, 
  onChange, 
  onDelete,
  onReorder,
  canMoveUp,
  canMoveDown
}) => {
  const [isEditing, setIsEditing] = useState(instructionData.text === '');
  const [instruction, setInstruction] = useState(instructionData);
  const [timerHours, setTimerHours] = useState('0');
  const [timerMinutes, setTimerMinutes] = useState('0');
  const [timerSeconds, setTimerSeconds] = useState('0');
  
  // Set timer fields whenever instruction changes
  useEffect(() => {
    if (instruction.timerSeconds) {
      const totalSeconds = instruction.timerSeconds;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      setTimerHours(hours.toString());
      setTimerMinutes(minutes.toString());
      setTimerSeconds(seconds.toString());
    }
  }, [instruction.timerSeconds]);
  
  // Update parent when instruction changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (instruction !== instructionData) {
        onChange(instruction);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [instruction]);
  
  // Update local state
  const updateInstruction = (field: keyof InstructionItem, value: any) => {
    setInstruction({ ...instruction, [field]: value });
  };
  
  // Update timer in seconds
  const updateTimer = () => {
    const hours = parseInt(timerHours || '0');
    const minutes = parseInt(timerMinutes || '0');
    const seconds = parseInt(timerSeconds || '0');
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    if (totalSeconds > 0) {
      updateInstruction('timerSeconds', totalSeconds);
    } else {
      // If timer is 0, remove it
      const { timerSeconds, ...rest } = instruction;
      setInstruction(rest as InstructionItem);
    }
    
    setIsEditing(false);
  };
  
  // Format timer for display
  const formatTimer = (seconds?: number) => {
    if (!seconds) return null;
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (remainingSeconds > 0) parts.push(`${remainingSeconds}s`);
    
    return parts.join(' ');
  };
  
  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>{instruction.stepNumber}</Text>
          </View>
          
          <View style={styles.contentContainer}>
            <TextInput
              style={[inputVariants.default, styles.textInput]}
              placeholder="Describe this step..."
              value={instruction.text}
              onChangeText={(text) => updateInstruction('text', text)}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              autoFocus
            />
            
            <View style={styles.timerContainer}>
              <Text style={styles.timerLabel}>Set a timer (optional):</Text>
              <View style={styles.timerInputs}>
                <View style={styles.timerInputGroup}>
                  <TextInput
                    style={styles.timerInput}
                    placeholder="0"
                    value={timerHours}
                    onChangeText={setTimerHours}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <Text style={styles.timerUnit}>h</Text>
                </View>
                
                <View style={styles.timerInputGroup}>
                  <TextInput
                    style={styles.timerInput}
                    placeholder="0"
                    value={timerMinutes}
                    onChangeText={setTimerMinutes}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <Text style={styles.timerUnit}>m</Text>
                </View>
                
                <View style={styles.timerInputGroup}>
                  <TextInput
                    style={styles.timerInput}
                    placeholder="0"
                    value={timerSeconds}
                    onChangeText={setTimerSeconds}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <Text style={styles.timerUnit}>s</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={updateTimer}
              >
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.displayContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>{instruction.stepNumber}</Text>
          </View>
          
          <View style={styles.displayContent}>
            <Text style={styles.stepText}>{instruction.text}</Text>
            
            {instruction.timerSeconds && (
              <View style={styles.timerBadge}>
                <Ionicons name="time-outline" size={16} color={colors.secondary} />
                <Text style={styles.timerBadgeText}>
                  {formatTimer(instruction.timerSeconds)}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.displayActions}>
            <View style={styles.reorderButtons}>
              <TouchableOpacity 
                style={[
                  styles.reorderButton, 
                  !canMoveUp && styles.disabledButton
                ]}
                onPress={() => canMoveUp && onReorder('up')}
                disabled={!canMoveUp}
              >
                <Ionicons name="chevron-up" size={18} color={canMoveUp ? colors.primary : colors.gray} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.reorderButton,
                  !canMoveDown && styles.disabledButton
                ]}
                onPress={() => canMoveDown && onReorder('down')}
                disabled={!canMoveDown}
              >
                <Ionicons name="chevron-down" size={18} color={canMoveDown ? colors.primary : colors.gray} />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="pencil-outline" size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => onDelete(instruction.id)}
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
    flexDirection: 'row',
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  stepNumber: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
    gap: spacing.md,
  },
  textInput: {
    minHeight: 100,
  },
  timerContainer: {
    gap: spacing.sm,
  },
  timerLabel: {
    ...textVariants.body,
    fontSize: 14,
  },
  timerInputs: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  timerInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerInput: {
    ...inputVariants.default,
    width: 50,
    height: 40,
    textAlign: 'center',
  },
  timerUnit: {
    marginLeft: spacing.xs,
    ...textVariants.body,
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
    alignItems: 'flex-start',
  },
  displayContent: {
    flex: 1,
    paddingRight: spacing.md,
  },
  stepText: {
    ...textVariants.body,
    marginBottom: spacing.sm,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  timerBadgeText: {
    ...textVariants.body,
    fontSize: 12,
    color: colors.secondary,
    marginLeft: spacing.xs,
  },
  displayActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reorderButtons: {
    flexDirection: 'column',
    marginRight: spacing.sm,
  },
  reorderButton: {
    padding: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default InstructionRow; 