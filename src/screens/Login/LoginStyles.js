import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    text__subtitle: {
        fontSize: 27,
        marginBottom: 20,
    },
    text__input: {
        width: 300,
        fontSize: 22,
        marginBottom: 20,
        borderColor: "#000000",
        borderWidth: 1,
        padding: 7,
    },
    button: {
        padding: 10,
        width: 300,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000"
    },
    button__text: {
        fontWeight: "bold",
        fontSize: 20
    },
    footer__text : {
        marginTop: 25,
        fontSize: 20
    },
    footer__link: {
        fontSize: 22,
        color: '#0000FF',
        fontWeight: 'bold',
    },
  });