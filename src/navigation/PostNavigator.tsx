import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RecipeCreatorScreen } from '@/features/recipeCreation';
import { colors } from '@/styles/styles';
import { ScrollView } from 'react-native';

// Define types for the Post stack navigator
export type PostStackParamList = {
  RecipeCreator: undefined;
  // Add other post-related screens here later as needed
};

const Stack = createStackNavigator<PostStackParamList>();

/**
 * Wrapper component to provide scrolling for RecipeCreatorScreen
 */
const ScrollableRecipeCreator: React.FC = () => {
  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <RecipeCreatorScreen />
    </ScrollView>
  );
};

/**
 * Navigation stack for recipe creation
 * Routes directly to RecipeCreatorScreen when Post tab is pressed
 */
const PostNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="RecipeCreator"
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
        name="RecipeCreator"
        component={ScrollableRecipeCreator}
        options={{ 
          title: 'Create Recipe',
          headerTitleAlign: 'center',
        }}
      />
      {/* Add additional recipe-related screens here */}
    </Stack.Navigator>
  );
};

export default PostNavigator; 