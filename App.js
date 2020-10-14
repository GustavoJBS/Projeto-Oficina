import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import AuthProvider from './src/contexts/auth';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
          <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}