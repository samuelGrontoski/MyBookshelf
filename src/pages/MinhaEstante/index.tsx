import React, { useState, useEffect } from "react";
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import { ScrollView, View, Text, FlatList, Image, TouchableOpacity, Modal, TextInput, Button } from "react-native";
import { onSnapshot, query, collection, deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { database } from "../../config/firebaseConfig";
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons';

import styles from './styles';

export default function MinhaEstante({ navigation }) {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [modalDetalhesVisible, setModalDetalhesVisible] = useState(false);
    const [showEdicao, setShowEdicao] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [livro, setLivro] = useState(selectedBook ? selectedBook : {
        nome: '',
        autor: '',
        genero: '',
        edicao: '',
        volume: '',
        paginas: '',
        capa: '',
        etiqueta: '',
        status: '',
        tempo: '',
        nota: '',
    }

    );

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

    const handleDeleteBook = async () => {
        setShowConfirmation(false);

        try {
            await deleteDoc(doc(database, "livros", selectedBook.id));

            Toast.show({
                type: 'success',
                text1: 'Leitura excluída com sucesso',
            });
            fecharDetalhes();
        } catch (error) {
            console.error("Erro ao excluir o livro:", error);
            Toast.show({
                type: 'error',
                text1: 'Erro ao excluir leitura',
                text2: error.message,
            });
        }
    };

    const salvarLivro = async () => {
        try {
            const livroRef = doc(database, "livros", livro.id);
            if (livro.id) {
                await updateDoc(livroRef, livro);
            } else {
                await setDoc(livroRef, livro, { merge: true });
            }

            console.log("Livro adicionado com ID: ", livroRef.id);
            Toast.show({
                type: 'success',
                text1: 'Leitura salva com sucesso',
            });

            setLivro('');
            handleBookPress(livro);
            setShowEdicao(false);


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
                    visible={modalDetalhesVisible}
                >
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButtonContainer} onPress={() => fecharDetalhes()}>
                            <AntDesign name="arrowleft" size={24} color="#B0ADC1" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editorButtonContainer} onPress={() => { setShowEdicao(true), setLivro(selectedBook) }}>
                            <EvilIcons name="pencil" size={32} color="#B0ADC1" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButtonContainer} onPress={() => setShowConfirmation(true)}>
                            <Feather name="trash-2" size={24} color="#FF6347" />
                        </TouchableOpacity>
                        <Image source={{ uri: selectedBook.capa }} style={styles.capaLivro} />
                        <Text style={styles.modalTitle}>{selectedBook.nome}</Text>
                        <Text style={styles.modalText}>{selectedBook.autor}</Text>
                        <View style={styles.modalTextLine}>
                            <Text style={styles.modalText}>Gênero: </Text>
                            <Text style={styles.modalText}>{selectedBook.genero}</Text>
                        </View>
                        <Text style={styles.modalText}>{selectedBook.edicao}º edição, volume {selectedBook.volume}</Text>
                        <Text style={styles.modalText}>{selectedBook.paginas} páginas</Text>
                        <Text style={styles.modalTitle}>Sobre a Leitura</Text>
                        <Text style={styles.modalText}>Possui o livro: {selectedBook.etiqueta}</Text>
                        <Text style={styles.modalText}>Status: {selectedBook.status}</Text>
                        <Text style={styles.modalText}>Término da leitura: {selectedBook.tempo}</Text>
                        <Text style={styles.modalText}>Nota: {selectedBook.nota} de 5</Text>
                        {/* Confirmação para deletar leitura */}
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
                        {/* Edição */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={showEdicao}
                            onRequestClose={() => setShowEdicao(false)}
                        >
                            <ScrollView contentContainerStyle={styles.scrollStyle}>
                                <Text style={styles.title}>Editar informações</Text>
                                <Text style={styles.title2}>Sobre o livro</Text>

                                <View style={styles.group}>
                                    <Text style={styles.text}>Nome do livro:</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={nome => setLivro({ ...livro, nome })}
                                        value={livro.nome}
                                        placeholder="Nome do livro"
                                    />
                                </View>
                                <View style={styles.group}>
                                    <Text style={styles.text}>Nome do autor:</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={autor => setLivro({ ...livro, autor })}
                                        value={livro.autor}
                                        placeholder="Nome do autor"
                                    />
                                </View>
                                <View style={styles.group}>
                                    <Text style={styles.text}>Gênero do livro:</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={genero => setLivro({ ...livro, genero })}
                                        value={livro.genero}
                                        placeholder="Gênero"
                                    />
                                </View>
                                <View style={styles.textLine}>
                                    <View style={styles.group2}>
                                        <Text style={styles.text}>Nº da edição:</Text>
                                        <TextInput
                                            style={styles.input2}
                                            onChangeText={edicao => setLivro({ ...livro, edicao })}
                                            value={livro.edicao}
                                            placeholder="Nº da edição"
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <View style={styles.group2}>
                                        <Text style={styles.text}>Nº do volume:</Text>
                                        <TextInput
                                            style={styles.input2}
                                            onChangeText={volume => setLivro({ ...livro, volume })}
                                            value={livro.volume}
                                            placeholder="Volume"
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <View style={styles.group2}>
                                        <Text style={styles.text}>Nº de páginas:</Text>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={paginas => setLivro({ ...livro, paginas })}
                                            value={livro.paginas}
                                            placeholder="Páginas"
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>
                                <View style={styles.group}>
                                    <Text style={styles.text}>URL da capa:</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={capa => setLivro({ ...livro, capa })}
                                        value={livro.capa}
                                        placeholder="URL da Capa"
                                    />
                                </View>

                                <Text style={styles.title2}>Sobre a leitura</Text>
                                <View style={styles.group}>
                                    <Text style={styles.text}>Possui o livro?</Text>
                                    <Picker
                                        selectedValue={livro.etiqueta}
                                        onValueChange={etiqueta => setLivro({ ...livro, etiqueta })}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="Sim" value="Sim" />
                                        <Picker.Item label="Não" value="Não" />
                                        <Picker.Item label="Tenho interesse" value="Tenho interesse" />
                                    </Picker>
                                </View>
                                <View style={styles.group}>
                                    <Text style={styles.text}>Status da leitura:</Text>
                                    <Picker
                                        selectedValue={livro.status}
                                        onValueChange={status => setLivro({ ...livro, status })}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="Lido" value="Lido" />
                                        <Picker.Item label="Lendo" value="Lendo" />
                                        <Picker.Item label="Aguardando" value="Aguardando" />
                                        <Picker.Item label="Não adquirido" value="Não adquirido" />
                                    </Picker>
                                </View>
                                <View style={styles.group}>
                                    <Text style={styles.text}>Data de conclusão da leitura DD/MM/AAAA:</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={tempo => setLivro({ ...livro, tempo })}
                                        value={livro.tempo}
                                        placeholder="DD/MM/AAAA (dia/mês/ano)"
                                    />
                                </View>
                                <View style={styles.group}>
                                    <Text style={styles.text}>Nota para a leitura (0 a 5):</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={nota => {
                                            const notaNumber = parseFloat(nota);
                                            if (!isNaN(notaNumber) && notaNumber >= 0 && notaNumber <= 5) {
                                                setLivro({ ...livro, nota: notaNumber.toString() });
                                            }
                                        }}
                                        value={livro.nota}
                                        placeholder="Nota para a leitura (0 a 5)"
                                        keyboardType="numeric"
                                    />
                                </View>
                                <Button
                                    title='Salvar'
                                    color='#0182AD'
                                    onPress={salvarLivro}
                                />
                            </ScrollView>
                        </Modal>
                    </View>
                </Modal>
            )}
        </View>
    );
}