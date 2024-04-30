import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>"Bem-vindo ao MyBookshelf, onde cada página virada é um passo em direção a novas aventuras."</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2B2A33',
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: "center",
        padding: 20,
        color: '#B0ADC1',
    }
});