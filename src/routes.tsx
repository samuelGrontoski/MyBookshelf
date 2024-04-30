import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

// Páginas
import Home from './pages/Home/index';
import NovoLivro from './pages/NovoLivro/index';
import MinhaEstante from './pages/MinhaEstante/index';

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#2B2A33',
                    borderTopColor: '#B0ADC1',
                    borderTopWidth: 1,
                    paddingBottom: 4,
                    paddingTop: 4,
                },
                tabBarActiveTintColor: '#0182AD',
                tabBarInactiveTintColor: '#B0ADC1',
                headerStyle: {
                    backgroundColor: '#2B2A33'
                },
                headerTintColor: '#B0ADC1',
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
            }}
        >
            <Tab.Screen 
                name="Inicio" 
                component={Home}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name="Novo Livro" 
                component={NovoLivro}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="open-book" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Minha Estante" 
                component={MinhaEstante}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name="bookshelf" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}