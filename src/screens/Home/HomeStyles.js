import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 45,
    },
    button__row: {
        flexDirection: 'row',
        marginTop: 10,
    },
    text: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        padding: 10,
        width: 190,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#000",
        margin: 5,
    },
    button__text: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: 'center',
    },
    flatlist__Item: {
        alignItems:'center',
        margin: 8,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'red',
        padding: 10,
        width: 350
    },
    flatlist__ItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flatlist__TitleText: {
        fontSize: 21,
        fontWeight: 'bold',
        margin: 5,
    },
    flatlist__Text: {
        fontSize: 18,
        margin: 5,
    },
});