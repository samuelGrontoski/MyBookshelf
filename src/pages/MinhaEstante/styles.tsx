import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282828',
        paddingHorizontal: 16,
        paddingTop: 20
    },
    containerEdicao: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#2B2A33',
        paddingHorizontal: 32,
        paddingVertical: 20,
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    capaLivro: {
        width: (screenWidth - 48) / 3,
        height: (screenWidth - 48) / 3 * 1.5,
        borderRadius: 8,
        marginBottom: 10,
        marginHorizontal: 2,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#2B2A33',
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
        color: '#B0ADC1',
    },
    modalTextLine: {
        flexDirection: 'row',
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    editorButtonContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    deleteButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    scrollStyle: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#2B2A33',
        paddingHorizontal: 32,
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#B0ADC1',
        marginBottom: 20,
    },
    title2: {
        fontSize: 28,
        marginBottom: 16,
        marginTop: 16,
        color: '#B0ADC1',
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
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