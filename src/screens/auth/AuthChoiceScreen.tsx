import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { textVariants, buttonVariants, spacing, layout } from '@/styles/styles';

// Type-safe navigation prop
type NavigationProp = StackNavigationProp<RootStackParamList, 'AuthChoice'>;

const AuthChoiceScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={layout.container}>
      <View style={[
        layout.container,
        layout.centered,
        { padding: spacing.xl }
      ]}>
        {/* Welcome text */}
        <Text style={[
          textVariants.heroTitle,
          { textAlign: 'center', marginBottom: spacing.sm }
        ]}>
          Welcome to MealPlanner! 🍽️
        </Text>

        {/* Subtitle */}
        <Text style={[
          textVariants.subtitle,
          { textAlign: 'center', marginBottom: spacing.xl }
        ]}>
          Let's get you started.
        </Text>

        {/* Buttons container */}
        <View style={{ width: '100%', gap: spacing.md }}>
          {/* Login Button */}
          <TouchableOpacity 
            style={buttonVariants.primary}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={textVariants.buttonText}>
              Log In
            </Text>
          </TouchableOpacity>

          {/* Create Account Button */}
          <TouchableOpacity 
            style={buttonVariants.secondary}
            onPress={() => navigation.navigate('OnboardingStartScreen')}
          >
            <Text style={textVariants.buttonText}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthChoiceScreen; 