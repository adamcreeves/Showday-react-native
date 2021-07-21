import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Landing, Login } from './src/screens/';
import { AfterLogin, Registration } from './src/navigation';

const Stack = createStackNavigator();

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
