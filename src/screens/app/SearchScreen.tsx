import React from 'react';
import { View, Text } from 'react-native';
import { layout, textVariants } from '../../styles/styles';

const SearchScreen: React.FC = () => {
  return (
    <View style={[layout.container, layout.centered]}>
      <Text style={textVariants.title}>Search</Text>
      <Text style={textVariants.body}>This is the Search screen. Add your search UI here.</Text>
    </View>
  );
};

export default SearchScreen; 