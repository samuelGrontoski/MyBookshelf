import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { database } from "../../config/firebaseConfig";
import Toast from 'react-native-toast-message';
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function DetalhesLivro({ route }) {
    const { selectedBook } = route.params;
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigation = useNavigation();

    const handleDeleteBook = async () => {
        setShowConfirmation(false);

        try {
            await deleteDoc(doc(database, "livros", selectedBook.id));

            Toast.show({
                type: 'success',
                text1: 'Leitura excluída com sucesso',
            });
            navigation.navigate('MinhaEstante');
        } catch (error) {
            console.error("Erro ao excluir o livro:", error);
            Toast.show({
                type: 'error',
                text1: 'Erro ao excluir leitura',
                text2: error.message,
            });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#282828' }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Image source={{ uri: selectedBook.capa }} style={styles.capaLivro} />
                <TouchableOpacity style={styles.editorButtonContainer} onPress={() => { navigation.navigate('EditBook', { selectedBook: selectedBook }); }}>
                    <EvilIcons name="pencil" size={32} color="#0182AD" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButtonContainer} onPress={() => setShowConfirmation(true)}>
                    <Feather name="trash-2" size={24} color="#FF6347" />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.detailsTitle}>{selectedBook.nome}</Text>
                    <Text style={styles.detailsAuthor}>{selectedBook.autor}</Text>
                    <View style={styles.bookInfo}>
                        <View style={styles.bookItem}>
                            <Text style={styles.detailsInfosDesc}>Gênero:</Text>
                            <Text style={styles.detailsInfos}>{selectedBook.genero}</Text>
                            <Text style={styles.detailsInfosDesc}>Páginas:</Text>
                            <Text style={styles.detailsInfos}>{selectedBook.paginas}</Text>
                        </View>
                        <View style={styles.bookItem}>
                            <Text style={styles.detailsInfosDesc}>Status da leitura:</Text>
                            <Text style={styles.detailsInfos}>{selectedBook.status}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.detailsInfosDesc}>Descrição:</Text>
                <Text style={styles.detailsInfos}>{selectedBook.descricao}</Text>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showConfirmation}
                onRequestClose={() => setShowConfirmation(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Tem certeza que deseja excluir esta leitura?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: '#FF6347' }}
                                onPress={handleDeleteBook}
                            >
                                <Text style={styles.buttonText}>Sim</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: '#0182AD' }}
                                onPress={() => setShowConfirmation(false)}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
