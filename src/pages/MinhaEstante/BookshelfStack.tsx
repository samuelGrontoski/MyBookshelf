import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MinhaEstante from './index';
import DetalhesLivro from './DetalhesLivro';
import EditBook from './EditBook';

const Stack = createNativeStackNavigator();

export default function BookshelfStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#141414',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="MinhaEstante" 
        component={MinhaEstante} 
        options={{ 
          headerTitle: 'Minha Estante',
          headerTitleAlign: 'center'
        }} 
      />
      <Stack.Screen name="DetalhesLivro" component={DetalhesLivro} options={{ headerTitle: 'Detalhes da Leitura' }} />
      <Stack.Screen name="EditBook" component={EditBook} options={{ headerTitle: 'Editar Leitura' }} />
    </Stack.Navigator>
  );
}