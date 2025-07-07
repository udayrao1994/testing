import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './LoginScreen.styles';
import InputField from '../../components/InputField'; // Adjust path if needed

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showMessageBox = (message) => {
    Alert.alert('Message', message);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showMessageBox('Please enter both email and password');
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const { email: storedEmail, password: storedPassword } = JSON.parse(storedUser);
        if (email === storedEmail && password === storedPassword) {
          showMessageBox('Login successful!');
          navigation.replace('Levels');
        } else {
          showMessageBox('Invalid email or password');
        }
      } else {
        showMessageBox('No user found. Please register first.');
      }
    } catch (error) {
      showMessageBox('Error reading user data');
      console.error('Login error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Quiz App</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to continue</Text>

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

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>or login with</Text>
            <View style={styles.separatorLine} />
          </View>

          <TouchableOpacity style={styles.googleButton}>
            <Text>G</Text>
          </TouchableOpacity>

          <Text style={styles.loginText}>
            Don't have an account?{' '}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate('Register')}
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
