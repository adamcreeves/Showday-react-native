import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 45,
    },
    text: {
        fontSize: 35,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    },
    flatlist__Item: {
        alignItems:'center',
        margin: 8,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'red',
        padding: 10,
        width: 360
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
    button: {
        padding: 10,
        width: 225,
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#000",
        marginTop: 20,
    },
    button__text: {
        fontWeight: "bold",
        fontSize: 20
    },
    spinnerTextStyle: {
        color: '#aaaaaa'
    },
    text__input: {
        width: 275,
        height: 50,
        fontSize: 18,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        paddingLeft: 16,
        marginTop: 15
    },
});