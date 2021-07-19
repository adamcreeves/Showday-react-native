import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './LandingStyles';

function Landing({ navigation }) {
    
    const onLoginPressed = () => {
        navigation.navigate('Login');
    }
    const onRegisterPressed = () => {
        navigation.navigate('Register');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Showday</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={onLoginPressed}>
                    <Text style={styles.button_text}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={onRegisterPressed}>
                    <Text style={styles.button_text}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Landing;
