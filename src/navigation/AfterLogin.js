import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, Events } from '../screens';

const Drawer = createDrawerNavigator();

function AfterLogin() {
    return (
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Events" component={Events} />
      </Drawer.Navigator>
    );
  }
  
export default AfterLogin;
