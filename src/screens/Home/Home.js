import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './HomeStyles'

function Home({ navigation }) {

    const onEventsPressed = () => {
        navigation.navigate('Events');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>It's Showday!</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={onEventsPressed}>
                    <Text style={styles.button_text}>Events</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Home;
