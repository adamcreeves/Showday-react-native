import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Landing, Login, RegisterCompetitor, RegisterGuest, RegisterVendor, Home, Events } from './src/screens/';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Landing' component={Landing} />
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Registration} />
        <Stack.Screen name='AfterLogin' component={AfterLogin}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Registration() {
  return (
    <Tab.Navigator tabBarOptions={{ 
        activeTintColor: 'red', 
        inactiveTintColor: 'black', 
        style: { borderColor: 'black', borderWidth: 1, margin: 1, }}}>
      <Tab.Screen name='Guest' component={RegisterGuest} />
      <Tab.Screen name='Competitor' component={RegisterCompetitor} />
      <Tab.Screen name='Vendor' component={RegisterVendor} />
    </Tab.Navigator>
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
