import React, { useState, useEffect } from "react";
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import { ScrollView, SafeAreaView, View, Text, FlatList, Image, TouchableOpacity, Modal, TextInput, Button } from "react-native";
import { onSnapshot, query, collection, deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { database } from "../../config/firebaseConfig";

import styles from './styles';

export default function MinhaEstante({ navigation }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const q = query(collection(database, "livros"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const livros = [];
            snapshot.forEach((doc) => {
                livros.push({ id: doc.id, ...doc.data() });
            });
            setBooks(livros);
        });
        return () => unsubscribe();
    }, []);

    const handleBookPress = (book) => {
        navigation.navigate('DetalhesLivro', { selectedBook: book });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                keyExtractor={item => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleBookPress(item)}>
                        <View style={styles.item}>
                            <Image source={{ uri: item.capa }} style={styles.capaLivro} />
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}