import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, textVariants, buttonVariants, inputVariants, layout, linkStyles } from '../styles/styles';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      Alert.alert('Success', 'Logged in successfully!');
      // TODO: Update your auth context with login status
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={layout.container}>
      <Text style={textVariants.title}>Log In</Text>

      <TextInput
        style={inputVariants.default}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={inputVariants.default}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={buttonVariants.primary} onPress={handleLogin} disabled={loading}>
        <Text style={textVariants.buttonText}>{loading ? 'Logging In...' : 'Log In'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={linkStyles.linkButton} onPress={handleGoToSignup}>
        <Text style={linkStyles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}
