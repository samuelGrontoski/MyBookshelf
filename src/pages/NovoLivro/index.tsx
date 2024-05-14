import React, { useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
import { ScrollView, Text, StyleSheet, TextInput, Button, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../config/firebaseConfig";

export default function NovoLivro({ }) {
    const [livro, setLivro] = useState({
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

    const salvarLivro = async () => {
        try {
            const livroRef = await addDoc(collection(database, "livros"), livro);
            console.log("Livro adicionado com ID: ", livroRef.id);

            setLivro({
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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Adicionar nova leitura</Text>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#2B2A33',
        paddingHorizontal: 32,
        paddingVertical: 20,
    },
    title: {
        fontSize: 32,
        marginBottom: 16,
        color: '#B0ADC1',
        fontWeight: 'bold',
        marginTop: 32
    },
    title2: {
        fontSize: 28,
        marginBottom: 16,
        marginTop: 16,
        color: '#B0ADC1',
        fontWeight: 'bold',
    },
    text: {
        textAlign: 'left',
        fontSize: 16,
        color: '#B0ADC1',
        marginBottom: 2,
    },
    textLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#B0ADC1',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    input2: {
        height: 40,
        borderColor: '#B0ADC1',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    group: {
        width: '100%',
    },
    group2: {
        width: '30%',
    },
    picker: {
        width: '40%',
        height: 40,
        marginBottom: 16,
        color: '#B0ADC1',
    },
});
