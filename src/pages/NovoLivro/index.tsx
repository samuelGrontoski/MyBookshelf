import React, { useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { database } from "../../config/firebaseConfig";

export default function NovoLivro({ route }) {
    const [livro, setLivro] = useState(route.params ? route.params : {
        id: '',
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
    });

    useEffect(() => {
        console.log("Parâmetros recebidos em NovoLivro:", route.params);
        setLivro(route.params ? route.params : {});
    }, [route.params]);

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
            <Text style={styles.title}>Nova leitura</Text>

            <TextInput
                style={styles.input}
                onChangeText={nome => setLivro({ ...livro, nome })}
                value={livro.nome}
                placeholder="Nome do livro"
            />
            <TextInput
                style={styles.input}
                onChangeText={autor => setLivro({ ...livro, autor })}
                value={livro.autor}
                placeholder="Nome do autor"
            />
            <TextInput
                style={styles.input}
                onChangeText={genero => setLivro({ ...livro, genero })}
                value={livro.genero}
                placeholder="Gênero"
            />
            <TextInput
                style={styles.input}
                onChangeText={edicao => setLivro({ ...livro, edicao })}
                value={livro.edicao}
                placeholder="Edição"
            />
            <TextInput
                style={styles.input}
                onChangeText={volume => setLivro({ ...livro, volume })}
                value={livro.volume}
                placeholder="Volume"
            />
            <TextInput
                style={styles.input}
                onChangeText={paginas => setLivro({ ...livro, paginas })}
                value={livro.paginas}
                placeholder="Páginas"
            />
            <TextInput
                style={styles.input}
                onChangeText={capa => setLivro({ ...livro, capa })}
                value={livro.capa}
                placeholder="URL da Capa"
            />
            <TextInput
                style={styles.input}
                onChangeText={etiqueta => setLivro({ ...livro, etiqueta })}
                value={livro.etiqueta}
                placeholder="Etiqueta"
            />
            <TextInput
                style={styles.input}
                onChangeText={status => setLivro({ ...livro, status })}
                value={livro.status}
                placeholder="Status da leitura"
            />
            <TextInput
                style={styles.input}
                onChangeText={tempo => setLivro({ ...livro, tempo })}
                value={livro.tempo}
                placeholder="Tempo de leitura"
            />
            <TextInput
                style={styles.input}
                onChangeText={nota => setLivro({ ...livro, nota })}
                value={livro.nota}
                placeholder="Nota da leitura"
            />
            <Button
                title='Salvar'
                color='#0182AD'
                onPress={salvarLivro}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#2B2A33',
        paddingHorizontal: 32,
        gap: 8,
    },
    title: {
        fontSize: 32,
        marginBottom: 32,
        color: '#B0ADC1',
        fontWeight: 'bold',
        marginTop: 32
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#B0ADC1',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
    }
});