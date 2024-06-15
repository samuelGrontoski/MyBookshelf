import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NovoLivro from './index';
import BookDetails from '../BookDetails/index';

const Stack = createNativeStackNavigator();

export default function BookStack() {
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
      <Stack.Screen 
        name="NovoLivro" 
        component={NovoLivro} 
        options={{ 
          headerTitle: 'Pesquisar Livro',
          headerTitleAlign: 'center'
        }} 
      />
      <Stack.Screen name="BookDetails" component={BookDetails} options={{ headerTitle: 'Detalhes do Livro' }} />
    </Stack.Navigator>
  );
}
