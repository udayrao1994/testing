import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './RegisterScreen.styles';
import InputField from '../../components/InputField'; // Make sure this path matches your folder structure

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const showMessageBox = (message) => {
    Alert.alert('Message', message);
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      showMessageBox('Please fill all fields.');
      return;
    }

    if (password !== confirmPassword) {
      showMessageBox('Passwords do not match!');
      return;
    }

    try {
      const userData = { fullName, email, password };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      showMessageBox('Registration successful!');
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigation.navigate('Login');
    } catch (error) {
      showMessageBox('Failed to save user data.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Quiz App</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up now to get started</Text>

          <InputField
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <InputField
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <InputField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <InputField
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>

          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
