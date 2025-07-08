import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Welcome: 'onboarding',     // this matches your screen name in navigator
      Register: 'register',
      Login: 'login',
      Levels: 'levels',
      Home: 'home',
      History: 'history',
      leadboard: 'leaderboard',
    },
  },
};





export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <AppNavigator />
    </NavigationContainer>
  );
}
