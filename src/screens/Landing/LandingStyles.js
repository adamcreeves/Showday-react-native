import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        color: "#000000",
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#00CCCC",
        padding: 10,
        width: 300,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000",
        marginBottom: 20
    },
    button_text: {
        fontWeight: "bold",
        fontSize: 20,
    }
  });