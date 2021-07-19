import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Landing, Login, Register, Home, Events } from './src/screens/';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Landing' component={Landing} />
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='AfterLogin' component={AfterLogin}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AfterLogin() {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Events" component={Events} />
    </Drawer.Navigator>
  );
}
