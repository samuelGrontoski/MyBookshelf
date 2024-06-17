import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';
import { database } from "../../config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import styles from './styles';

export default function BookDetails() {
    const route = useRoute();
    const { book } = route.params;
    const [livro, setLivro] = useState({
        nome: book.volumeInfo.title,
        autor: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Sem Autor',
        genero: book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Sem Categorias',
        paginas: book.volumeInfo.pageCount,
        editora: book.volumeInfo.publisher,
        capa: book.volumeInfo.imageLinks.thumbnail,
        etiqueta: '',
        status: '',
        tempo: '',
        nota: '',
    });

    const salvarLivro = async () => {
        try {
            const livroRef = await addDoc(collection(database, "livros"), livro);
            console.log("Livro adicionado com ID: ", livroRef.id);

            Toast.show({
                type: 'success',
                text1: 'Leitura salva com sucesso',
            });
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
                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Image
                            source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
                            style={styles.detailsImage}
                        />
                        <TouchableOpacity onPress={salvarLivro}>
                            <Image
                                source={require('../../assets/add_icon.png')}
                                style={{ width: 50, height: 50, position: 'absolute', top: 0, right: -100 }}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                <View style={styles.textContainer}>
                    <Text style={styles.detailsTitle}>{book.volumeInfo.title}</Text>
                    <Text style={styles.detailsAuthor}>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Sem Autor'}</Text>
                    <View style={styles.bookInfo}>
                        <View style={styles.bookItem}>
                            <Text style={styles.detailsInfosDesc}>Gênero:</Text>
                            <Text style={styles.detailsInfos}>{book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Sem Categorias'}</Text>
                            <Text style={styles.detailsInfosDesc}>Páginas:</Text>
                            <Text style={styles.detailsInfos}>{book.volumeInfo.pageCount}</Text>
                        </View>
                        <View style={styles.bookItem}>
                            <Text style={styles.detailsInfosDesc}>Editora:</Text>
                            <Text style={styles.detailsInfos}>{book.volumeInfo.publisher}</Text>
                            <Text style={styles.detailsInfosDesc}>Publicação:</Text>
                            <Text style={styles.detailsInfos}>{book.volumeInfo.publishedDate}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.detailsInfosDesc}>Descrição:</Text>
                <Text style={styles.detailsInfos}>{book.volumeInfo.description}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
