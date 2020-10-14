import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
export default function AuthRoutes() {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={Login} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={{
        headerShown: false
      }} />
    </Stack.Navigator>
  );
}