import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { colors, spacing, textVariants, buttonVariants, inputVariants, layout } from '../../styles/styles'; // 👈 import shared styles
import { API_URL } from '../../services/api';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      // Sign up the user
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Create the user profile
      await fetch(`${API_URL}/user/createProfile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: data.user.id,
          email: data.user.email,
        }),
      });

      Alert.alert('Success', 'Account created! You can now log in.');
      // You could navigate to LoginScreen here automatically!
      
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={layout.container}>
      <Text style={textVariants.title}>Create an Account</Text>

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

      <TouchableOpacity style={buttonVariants.primary} onPress={handleSignup} disabled={loading}>
        <Text style={textVariants.buttonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
      </TouchableOpacity>
    </View>
  );
}
