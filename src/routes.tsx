import React from "react";
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

// Páginas
import Home from './pages/Home/index';
import NovoLivro from './pages/NovoLivro/index';
import MinhaEstante from './pages/MinhaEstante/index';

import Logo from './assets/myBookshelf_icon.png';

const Tab = createBottomTabNavigator();

function HeaderTitleWithImage({ title, imageSource }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={imageSource} style={{ width: 30, height: 30, marginRight: 10 }} />
            <Text style={{ color: '#B0ADC1', fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
        </View>
    );
}

export default function Routes() {
    return (
        <Tab.Navigator
            initialRouteName="Início"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#141414',
                    borderTopColor: '#B0ADC1',
                    borderTopWidth: 1,
                    paddingBottom: 4,
                    paddingTop: 4,
                },
                tabBarActiveTintColor: '#0182AD',
                tabBarInactiveTintColor: '#B0ADC1',
                headerStyle: {
                    backgroundColor: '#141414',
                    borderBottomColor: '#B0ADC1',
                    borderBottomWidth: 1,
                },
                headerTintColor: '#B0ADC1',
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
            }}
        >
            <Tab.Screen 
                name="Início" 
                component={Home}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="home" size={size} color={color} />
                    ),
                    headerTitle: () => <HeaderTitleWithImage title="Início" imageSource={Logo} />
                }}
            />
            <Tab.Screen 
                name="Novo Livro" 
                component={NovoLivro}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="open-book" size={size} color={color} />
                    ),
                    headerTitle: () => <HeaderTitleWithImage title="Novo Livro" imageSource={Logo} />
                }}
            />
            <Tab.Screen 
                name="Minha Estante" 
                component={MinhaEstante}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name="bookshelf" size={size} color={color} />
                    ),
                    headerTitle: () => <HeaderTitleWithImage title="Minha Estante" imageSource={Logo} />
                }}
            />
        </Tab.Navigator>
    )
}