import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { firebase } from '../../firebase/config';
import styles from './HomeStyles';

function Home({ navigation }) {

    const onEventsPressed = () => {
        navigation.navigate('Events');
    }
    const onLogoutPressed = () => {
        firebase.auth().signOut().then(() => {
            alert('You have been logged out');
            navigation.navigate('Landing');
        })
        .catch(error => alert(error.message));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>It's Showday!</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={onEventsPressed}>
                    <Text style={styles.button_text}>Events</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={onLogoutPressed}>
                    <Text style={styles.button_text}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Home;
