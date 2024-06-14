import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';

export default function BookDetails() {
    const route = useRoute();
    const { book } = route.params;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#282828' }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
                    <Image
                        source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
                        style={styles.detailsImage}
                    />
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
                        </View>
                    </View>
                </View>
                <Text style={styles.detailsInfos}>{book.volumeInfo.description}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
