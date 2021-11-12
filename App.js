import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Login, Home, CreateEvent, EventDetails } from "./src/screens/index";
import { Registration } from "./src/navigation";
import { firebase } from "./src/firebase/config";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const usersRef = firebase.firestore().collection("users");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => <Home {...props} extraData={user} />}
        </Stack.Screen>
        <Stack.Screen name="CreateEvent" component={CreateEvent} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Registration} />
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
