import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';

export default function DetalhesLivro({ route }) {
    const { selectedBook } = route.params;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#282828' }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.detailsTitle}>{selectedBook.nome}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
