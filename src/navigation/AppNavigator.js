import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen imports (make sure these paths are correct)
import WelcomeScreen from '../screens/OnboardingScreen/OnboardingScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import LevelScreen from '../screens/LevelScreen/LevelScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen/LeaderboardScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Levels"
        component={LevelScreen}
        options={{ title: 'Select Level' }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="leadboard"
        component={LeaderboardScreen}
        options={{ title: 'Leaderboard' }}
      />
    </Stack.Navigator>
  );
}
