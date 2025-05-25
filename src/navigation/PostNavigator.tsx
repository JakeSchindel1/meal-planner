import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PostScreen from '@/screens/app/PostScreen';
import { colors } from '@/styles/styles';
import { ScrollView } from 'react-native';

// Define types for the Post stack navigator
export type PostStackParamList = {
  Post: undefined;
  // Add other post-related screens here later as needed
};

const Stack = createStackNavigator<PostStackParamList>();

/**
 * Wrapper component to provide scrolling for PostScreen
 */
const ScrollablePostScreen: React.FC = () => {
  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <PostScreen />
    </ScrollView>
  );
};

/**
 * Navigation stack for post/recipe creation
 * Routes to PostScreen when Post tab is pressed
 */
const PostNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Post"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.background,
        headerTitleStyle: { fontWeight: 'bold' },
        presentation: 'card',
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      }}
    >
      <Stack.Screen
        name="Post"
        component={ScrollablePostScreen}
        options={{ 
          headerShown: false,
        }}
      />
      {/* Add additional post-related screens here */}
    </Stack.Navigator>
  );
};

export default PostNavigator; 