import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from "react-native";

export default function MinhaEstante() {
    const [books, setBooks] = useState([]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Estante dos meus livros</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2B2A33',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});
