import React, { useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from "react-native";

export default function NovoLivro() {
    const [nomeLivro, setNomeLivro] = useState('');
    const [nomeAutor, setNomeAutor] = useState('');
    const [genero, setGenero] = useState('');
    const [edicao, setEdicao] = useState('');
    const [volume, setVolume] = useState('');
    const [paginas, setPaginas] = useState(null);
    const [capa, setCapa] = useState(null);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Novo livro</Text>

            <TextInput
                style={styles.input}
                onChangeText={setNomeLivro}
                value={nomeLivro}
                placeholder="Nome do livro"
            />
            <TextInput
                style={styles.input}
                onChangeText={setNomeAutor}
                value={nomeAutor}
                placeholder="Nome do autor"
            />
            <TextInput
                style={styles.input}
                onChangeText={setGenero}
                value={genero}
                placeholder="Gênero"
            />
            <TextInput
                style={styles.input}
                onChangeText={setEdicao}
                value={edicao}
                placeholder="Edição"
            />
            <TextInput
                style={styles.input}
                onChangeText={setVolume}
                value={volume}
                placeholder="Volume"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPaginas}
                value={paginas}
                placeholder="Páginas"
            />
            <TextInput
                style={styles.input}
                onChangeText={setCapa}
                value={capa}
                placeholder="URL da Capa"
            />
            <Button
                title='Salvar'
                color='#0182AD'
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