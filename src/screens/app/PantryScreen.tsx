import React from 'react';
import { View, Text } from 'react-native';
import { layout, textVariants } from '@/styles/styles';

const PantryScreen: React.FC = () => {
  return (
    <View style={[layout.container, layout.centered]}>
      <Text style={textVariants.title}>Pantry</Text>
      <Text style={textVariants.body}>This is the Pantry screen. Add your pantry UI here.</Text>
    </View>
  );
};

export default PantryScreen; 