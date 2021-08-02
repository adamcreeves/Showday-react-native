import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { firebase } from '../../firebase/config';
import styles from './LogoutStyles';

function Logout () {
    const [visible, setVisible] = useState(false);
    const nav = useNavigation();

    const yesPressed = async () => {
        setVisible(true);
        try {
            await firebase.auth().signOut();
            nav.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    const noPressed = () => nav.goBack();

    return (
        <View style={styles.container}>
            <Spinner visible={visible} />
            <Text style={styles.text}>Are you sure you want to log out?</Text>
            <View style={styles.button__container}>
                <TouchableOpacity 
                    onPress={yesPressed}
                    style={styles.button}>
                    <Text style={styles.button__text}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={noPressed}
                    style={styles.button}>
                    <Text style={styles.button__text}>No</Text>
                </TouchableOpacity>
            </View>
        </View>
    );   
}

export default Logout;