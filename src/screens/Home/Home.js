import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { firebase } from '../../firebase/config';
import styles from './HomeStyles';


function Home(props) {
    const user = props.extraData;
    const nav = useNavigation();

    const login = () => {
        nav.navigate('Login');
      }
    
    const logout = () => {
        firebase.auth().signOut().then(() => {
          alert('You have been logged out');
        })
        .catch(error => alert(error.message));
    }

    nav.setOptions({
        headerLeft: () => (
            <View>
              {user ? (
                <TouchableOpacity 
                  onPress={logout}>
                  <Text>Logout</Text>
                    {/* <Image source={require('../../../assets/logout.png')} /> */}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={login}>
                      <Text>Login</Text>
                    {/* <Image source={require('../../../assets/login.png')} /> */}
                  </TouchableOpacity>
              )}
            </View>
          ),
    })
    const onEventsPressed = () => {
        nav.navigate('Events');
    }

    return (
        <View style={styles.container}>
            <View style={styles.button__row}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={onEventsPressed}>
                        <Text style={styles.button__text}>{'Upcoming\nEvents'}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => null}>
                        <Text style={styles.button__text}>Shows Today</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button__row}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => null}>
                        <Text style={styles.button__text}>Stats</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => null}>
                        <Text style={styles.button__text}>Locations</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button__row}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => null}>
                        <Text style={styles.button__text}>Workouts</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => null}>
                        <Text style={styles.button__text}>More</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Home;
