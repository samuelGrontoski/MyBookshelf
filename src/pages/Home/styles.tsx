import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#B0ADC1'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    color: '#B0ADC1'
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  loadingText: {
    color: '#B0ADC1',
    marginRight: 10,
  },
  bookItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#B0ADC1',
  },
  bookImage: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  bookInfo: {
    flexDirection: 'column',
    width: '80%',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B0ADC1'
  },
  bookInfos: {
    color: '#B0ADC1'
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});
