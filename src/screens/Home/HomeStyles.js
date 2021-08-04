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
    loginLogoutButton: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 2,
    },
    button: {
        paddingVertical: 10,
        width: 135,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#000",
        marginVertical: 8,
        marginHorizontal: 2,
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
        width: 360
    },
    flatlist__ItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
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