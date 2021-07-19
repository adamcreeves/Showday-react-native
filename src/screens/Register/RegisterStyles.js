import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#99FFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        fontSize: 35,
        color: "#006699",
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text__input: {
        backgroundColor: "#ffffff",
        width: 300,
        fontSize: 22,
        marginBottom: 20,
        borderColor: "#000000",
        borderWidth: 1,
        padding: 7,
    },
    button: {
        backgroundColor: "#00CCCC",
        padding: 10,
        width: 300,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000"
    },
    button_text: {
        fontWeight: "bold",
        fontSize: 20
    }
  });