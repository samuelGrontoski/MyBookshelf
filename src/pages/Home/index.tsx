import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image } from 'react-native';
import axios from 'axios';

export default function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchBooks = async () => {
    setLoading(true);
    setError(null);
    let queryParam = query.trim();

    if (!queryParam) {
      setError('O campo de busca não pode estar vazio.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${queryParam}`);
      setBooks(response.data.items || []);
    } catch (error) {
      setError('Erro ao buscar livros. Tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesquisar Livro</Text>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar por título ou autor"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Pesquisar" onPress={searchBooks} />
      {loading && <Text>Carregando...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            {item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail && (
              <Image
                source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                style={styles.bookImage}
              />
            )}
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.volumeInfo.title}</Text>
              <Text>{item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'No Author'}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  bookItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookImage: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  bookInfo: {
    flexDirection: 'column',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});
