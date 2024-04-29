import React from 'react';
import Routes from './src/routes';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      <Toast />
    </>
  );
}
