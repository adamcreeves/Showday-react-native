import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login, Home, CreateEvent, EventDetails } from './src/screens/index';
import { Registration } from './src/navigation';
import Logout from './src/screens/Logout/Logout';
import { firebase } from './src/firebase/config';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const usersRef = firebase.firestore().collection('users');

  useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
          usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
              const userData = document.data()
              setUser(userData);
          })
          .catch((error) => {
              console.log(error);
          });
      }
      });
      return () => unsubscribe();
  }, []);

  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home">
              {props => <Home {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name='CreateEvent' component={CreateEvent} />
            <Stack.Screen name='EventDetails' component={EventDetails} />
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Logout' component={Logout} />
            <Stack.Screen name='Register' component={Registration} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

// options={{ 
//   headerTitle: 'Showday',
//   headerTitleAlign: 'center',
//   headerRight: () => (
//     <TouchableOpacity 
//       onPress={() => alert('This is the menu button')}>
//         <Image source={require('./assets/menuicon.png')} />
//     </TouchableOpacity>
//   ),
//   headerLeftContainerStyle: {marginLeft: 20},
//   headerRightContainerStyle: {marginRight: 20}}} 