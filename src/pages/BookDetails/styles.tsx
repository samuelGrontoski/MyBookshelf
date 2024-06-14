import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#282828',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    bookItem: {
        flexDirection: 'row',
    },
    detailsImage: {
        width: 150,
        height: 250,
    },
    detailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
    detailsAuthor: {
        fontSize: 18,
        color: '#B0ADC1',
        textAlign: 'center',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#B0ADC1',
        paddingBottom: 10,
    },
    bookInfo: {
        flexDirection: 'column',
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#B0ADC1',
        paddingBottom: 10,
    },
    detailsInfosDesc: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 10,
    },
    detailsInfos: {
        fontSize: 16,
        color: '#B0ADC1',
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 10,
    },
});