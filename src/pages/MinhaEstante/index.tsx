import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, Modal } from "react-native";
import { onSnapshot, query, collection } from "firebase/firestore";
import { database } from "../../config/firebaseConfig";
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MinhaEstante({ navigation }) {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [modalDetalhesVisible, setModalDetalhesVisible] = useState(false);

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

    const renderCapaLivro = ({ item }) => (
        <TouchableOpacity onPress={() => handleBookPress(item)}>
            <View style={styles.item}>
                <Image source={{ uri: item.capa }} style={styles.capaLivro} />
            </View>
        </TouchableOpacity>
    );

    const handleBookPress = (book) => {
        setSelectedBook(book);
        setModalDetalhesVisible(true);
    };

    const fecharDetalhes = () => {
        setModalDetalhesVisible(false);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                renderItem={renderCapaLivro}
                keyExtractor={item => item.id}
                numColumns={3}
            />
            {modalDetalhesVisible && (
                <Modal
                    animationType="slide"
                    visible={true}
                >
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButtonContainer} onPress={fecharDetalhes}>
                            <AntDesign name="arrowleft" size={24} color="#B0ADC1" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.editorButtonContainer}
                            onPress={() => {
                                navigation.navigate('Novo Livro', {
                                    id: selectedBook.id,
                                    nome: selectedBook.nome,
                                    autor: selectedBook.autor,
                                    genero: selectedBook.genero,
                                    edicao: selectedBook.edicao,
                                    volume: selectedBook.volume,
                                    paginas: selectedBook.paginas,
                                    capa: selectedBook.capa,
                                    etiqueta: selectedBook.etiqueta,
                                    status: selectedBook.status,
                                    tempo: selectedBook.tempo,
                                    nota: selectedBook.nota,
                                });
                                fecharDetalhes();
                            }}
                        >
                            <EvilIcons name="pencil" size={32} color="#B0ADC1" />
                        </TouchableOpacity>
                        <Image source={{ uri: selectedBook.capa }} style={styles.capaLivro} />
                        <Text style={styles.modalTitle}>{selectedBook.nome}</Text>
                        <Text style={styles.modalText}>{selectedBook.autor}</Text>
                        <View style={styles.modalTextLine}>
                            <Text style={styles.modalText}>Gênero: </Text>
                            <Text style={styles.modalText}>{selectedBook.genero}</Text>
                        </View>
                        <View style={styles.modalTextLine}>
                            <Text style={styles.modalText}>Edição: </Text>
                            <Text style={styles.modalText}>{selectedBook.edicao}</Text>
                            <Text style={styles.modalText}>   Volume: </Text>
                            <Text style={styles.modalText}>{selectedBook.volume}</Text>
                            <Text style={styles.modalText}>   Páginas: </Text>
                            <Text style={styles.modalText}>{selectedBook.paginas}</Text>
                        </View>
                        <Text style={styles.modalTitle}>Sobre a Leitura</Text>
                        <View style={styles.modalTextLine}>
                            <Text style={styles.modalText}>Etiqueta: </Text>
                            <Text style={styles.modalText}>{selectedBook.etiqueta}</Text>
                            <Text style={styles.modalText}>   Status: </Text>
                            <Text style={styles.modalText}>{selectedBook.status}</Text>
                        </View>
                        <View style={styles.modalTextLine}>
                            <Text style={styles.modalText}>Tempo de leitura: </Text>
                            <Text style={styles.modalText}>{selectedBook.tempo}</Text>
                        </View>
                        <View style={styles.modalTextLine}>
                            <Text style={styles.modalText}>Nota: </Text>
                            <Text style={styles.modalText}>{selectedBook.nota}</Text>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2A33',
        paddingHorizontal: 16,
        paddingTop: 20
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    capaLivro: {
        width: (screenWidth - 48) / 3,
        height: (screenWidth - 48) / 3 * 1.5,
        borderRadius: 8,
        marginBottom: 10,
        marginHorizontal: 2,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#2B2A33',
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        color: 'white',
    },
    modalTextLine: {
        flexDirection: 'row',
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    editorButtonContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#B0ADC1',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginBottom: 10,
        color: '#FFFFFF',
    },
});