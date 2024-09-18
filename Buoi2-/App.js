import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartPage from './app/screens/StartPage';
import LoginPage from './app/screens/LoginPage';
import HomePage from './app/screens/HomePage';
import RegisterPage from './app/screens/RegisterPage';
import ForgotPassword from './app/screens/ForgotPassword';
import VerifyOTP from './app/screens/VerifyOTP'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartPage} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
