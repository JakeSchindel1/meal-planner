import React from 'react';
import { View, Text } from 'react-native';
import { layout, textVariants } from '../../styles/styles';

const ProfileScreen: React.FC = () => {
  return (
    <View style={[layout.container, layout.centered]}>
      <Text style={textVariants.title}>Profile</Text>
      <Text style={textVariants.body}>This is the Profile screen. Add your profile UI here.</Text>
    </View>
  );
};

export default ProfileScreen;
