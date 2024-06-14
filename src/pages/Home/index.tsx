import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

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
      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando</Text>
          <ActivityIndicator size="small" color="#B0ADC1" />
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => navigation.navigate('BookDetails', { book: item })}
          >
            {item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail && (
              <Image
                source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                style={styles.bookImage}
              />
            )}
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.volumeInfo.title}</Text>
              <Text style={styles.bookInfos}>{item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'No Author'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
