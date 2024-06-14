import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './index';
import BookDetails from '../BookDetails/index';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#141414',
        },
        headerTintColor: '#B0ADC1',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ headerTitle: 'Início' }} />
      <Stack.Screen name="BookDetails" component={BookDetails} options={{ headerTitle: 'Detalhes do Livro' }} />
    </Stack.Navigator>
  );
}
