import React from "react";
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

// Páginas
import BookStack from "./pages/NovoLivro/BookStack";
import HomeStack from './pages/Home/HomeStack';
import BookshelfStack from './pages/MinhaEstante/BookshelfStack';

import Logo from './assets/myBookshelf_icon.png';

const Tab = createBottomTabNavigator();

function HeaderTitleWithImage({ title, imageSource }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={imageSource} style={{ width: 30, height: 30, marginRight: 10 }} />
            <Text style={{ color: '#0182AD', fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
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
                headerTintColor: '#0182AD',
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
            }}
        >
            <Tab.Screen 
                name="Início" 
                component={HomeStack}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="home" size={size} color={color} />
                    ),
                    headerTitle: () => <HeaderTitleWithImage title="myBookshelf" imageSource={Logo} />
                }}
            />
            <Tab.Screen 
                name="Novo Livro" 
                component={BookStack}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="open-book" size={size} color={color} />
                    ),
                    headerTitle: () => <HeaderTitleWithImage title="myBookshelf" imageSource={Logo} />
                }}
            />
            <Tab.Screen 
                name="Minha Estante" 
                component={BookshelfStack}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name="bookshelf" size={size} color={color} />
                    ),
                    headerTitle: () => <HeaderTitleWithImage title="myBookshelf" imageSource={Logo} />
                }}
            />
        </Tab.Navigator>
    )
}