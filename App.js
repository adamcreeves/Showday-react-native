import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login, Home, Events, CreateEvent } from './src/screens/';
import { Registration } from './src/navigation';
import { firebase } from './src/firebase/config';
import { TouchableOpacity, Image, View } from 'react-native';

const Stack = createStackNavigator();

export default function App({navigation}) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {	
    return (	
      <></>	
    )	
  }

  

  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home"  
            options={{ 
              headerTitle: 'Showday',
              headerTitleAlign: 'center',
              headerRight: () => (
                <TouchableOpacity 
                  onPress={() => alert('This is the menu button')}>
                    <Image source={require('./assets/menuicon.png')} />
                </TouchableOpacity>
              ),
              // headerLeft: () => (
              //   <View>
              //     {user ? (
              //       <TouchableOpacity 
              //         onPress={logout}>
              //           <Image source={require('./assets/logout.png')} />
              //       </TouchableOpacity>
              //     ) : (
              //       <TouchableOpacity
              //         onPress={login}>
              //           <Image source={require('./assets/login.png')} />
              //         </TouchableOpacity>
              //     )}
              //   </View>
              // ),
              headerLeftContainerStyle: {marginLeft: 20},
              headerRightContainerStyle: {marginRight: 20}}}>
                {props => <Home {...props} extraData={user} />}
              </Stack.Screen>
          <Stack.Screen 
            name="Events" 
            options={{ 
              headerTitle: 'Events',
              headerTitleAlign: 'center',
              headerRight: () => (
                <TouchableOpacity 
                  onPress={() => alert('This is the menu button')} 
                  style={{ marginLeft: 20}} >
                    <Image source={require('./assets/menuicon.png')} />
                </TouchableOpacity>
              ),
            headerRightContainerStyle: {marginRight: 20}}}>
              {props => <Events {...props} extraData={user} />}
            </Stack.Screen>
          <Stack.Screen 
            name='CreateEvent'
            options={{ 
              headerTitle: 'Create New Event',
              headerTitleAlign: 'center',
              headerRight: () => (
                <TouchableOpacity 
                  onPress={() => alert('This is the menu button')} 
                  style={{ marginLeft: 20}} >
                    <Image source={require('./assets/menuicon.png')} />
                </TouchableOpacity>
              ),
            headerRightContainerStyle: {marginRight: 20}}}>
              {props => <CreateEvent {...props} extraData={user} />}
            </Stack.Screen>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Register' component={Registration} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
