import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 25,
    },
    button__row: {
        flexDirection: 'row',
        marginTop: 10,
    },
    text: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        padding: 10,
        width: 170,
        height: 170,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#000",
        margin: 10,
    },
    button__text: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: 'center',
    }
});