import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, textVariants, buttonVariants, inputVariants, layout, linkStyles } from '@/styles/styles';
import { API_URL } from '@/services/api';
import { useAuth } from '@/context'; // or useAuthentication from '@/hooks'

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useAuth();

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
      const { error } = await login(email, password);
      if (error) {
        Alert.alert('Error', error.message || 'Login failed');
      }
      // No need to show a success alert; navigation will indicate success
    } catch (error: any) {
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
