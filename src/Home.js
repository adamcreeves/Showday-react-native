import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Events')}>
                    <Text style={styles.button_text}>Events</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9FFFFF',
        alignItems: 'center',
    },
    text: {
        fontSize: 35,
        color: "#006699",
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#00CCCC",
        padding: 10,
        width: 250,
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

export default Home;