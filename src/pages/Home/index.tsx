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
      <Text style={styles.text}>
      Seus livros, suas histórias, sempre ao seu alcance.
      </Text>
      <Text style={styles.text}>
      Bem vindo ao myBookshelf!
      </Text>
    </View>
  );
}
