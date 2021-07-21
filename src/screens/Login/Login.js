import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { firebase } from '../../firebase/config';
import styles from './LoginStyles';

function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onSigninPressed = () => {
        if (email === '' || password === '') {
            alert('Email and password required for sign in')
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((response) => {
                    const uid = response.user.uid;
                    const usersRef = firebase.firestore().collection('users')
                    usersRef
                        .doc(uid)
                        .get()
                        .then(firestoreDocument => {
                            if (!firestoreDocument.exists) {
                                alert('This user isn\'t registered');
                                return;
                            }
                            const user = firestoreDocument.data()
                            navigation.navigate('AfterLogin', {user});
                        })
                        .catch(error => {
                            alert(error);
                        })
                })
                .catch(() => {
                    alert('Username or password incorrect');
                });
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Showday Login</Text>
            <TextInput 
                style={styles.text__input}
                placeholder="Email"
                placeholderTextColor="#adadad"
                onChangeText={(text) => setEmail(text)}
                value={email}
                textContentType="emailAddress" />
            <TextInput 
                style={styles.text__input}
                placeholder="Password"
                placeholderTextColor="#adadad"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry />
            <TouchableOpacity 
                style={styles.button}
                onPress={onSigninPressed}>
                    <Text style={styles.button__text}>Sign in</Text>
            </TouchableOpacity>
            <Text style={styles.footer__text}>Need to Sign up?</Text>
            <Text style={styles.footer__link} onPress={() => navigation.navigate('Register')}>Create an account here</Text>
        </View>
    );
}

export default Login;
