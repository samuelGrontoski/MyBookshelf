import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#282828',
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
