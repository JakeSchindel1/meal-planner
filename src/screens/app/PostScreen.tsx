import React from 'react';
import { View, Text } from 'react-native';
import { layout, textVariants } from '../../styles/styles';

const PostScreen: React.FC = () => {
  return (
    <View style={[layout.container, layout.centered]}>
      <Text style={textVariants.title}>Post</Text>
      <Text style={textVariants.body}>This is the Post screen. Add your post UI here.</Text>
    </View>
  );
};

export default PostScreen; 