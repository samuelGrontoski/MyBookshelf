import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { database } from "../../config/firebaseConfig";
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function EditBook({ route }) {
    const [selectedBook, setSelectedBook] = useState(route.params ? route.params.selectedBook : {});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigation = useNavigation();

    const salvarLivro = async () => {
        try {
            const livroRef = doc(database, "livros", selectedBook.id);
            if (selectedBook.id) {
                await updateDoc(livroRef, selectedBook);
            } else {
                await setDoc(livroRef, selectedBook, { merge: true });
            }

            console.log("Livro adicionado com ID: ", livroRef.id);
            Toast.show({
                type: 'success',
                text1: 'Leitura salva com sucesso',
            });

            navigation.navigate('MinhaEstante');

        } catch (error) {
            console.error("Erro ao adicionar livro: ", error);
            Toast.show({
                type: 'error',
                text1: 'Erro ao salvar leitura',
                text2: error.message,
            });
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#282828' }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Image source={{ uri: selectedBook.capa }} style={styles.capaLivro} />
                <TouchableOpacity style={styles.editorButtonContainer} onPress={() => { setShowConfirmation(true) }}>
                    <Feather name="x" size={32} color="#FF6347" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButtonContainer} onPress={() => salvarLivro()}>
                    <Feather name="save" size={24} color="#0182AD" />
                </TouchableOpacity>
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
                        <Text style={styles.detailsInfosDesc}>Status:</Text>
                        <Picker
                            selectedValue={selectedBook.status}
                            onValueChange={status => setSelectedBook({ ...selectedBook, status })}
                            style={styles.picker}
                        >
                            <Picker.Item label="Lido" value="Lido" />
                            <Picker.Item label="Lendo" value="Lendo" />
                            <Picker.Item label="Aguardando" value="Aguardando" />
                            <Picker.Item label="Não adquirido" value="Não adquirido" />
                        </Picker>
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
                        <Text style={styles.modalText}>Cancelar edição?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: '#FF6347' }}
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={styles.buttonText}>Sim</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: '#0182AD' }}
                                onPress={() => setShowConfirmation(false)}
                            >
                                <Text style={styles.buttonText}>Não</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
