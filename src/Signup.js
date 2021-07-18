import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function Signup({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>New User Registration</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.button_text}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
        marginBottom: 25,
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

export default Signup;