import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';

export default function DetalhesLivro() {
    const route = useRoute();
    const { book } = route.params;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#282828' }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.detailsTitle}>{book.volumeInfo.title}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}