import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import MessagesScreen from '../screens/MessagesScreen';

// This defines the screens in our app.
// Any configuration relating to navigation as well as the "top bar" of the app lives here!

export const NavigationStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },

  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: 'Login',
    },
  },
  Messages: {
    screen: MessagesScreen,
    navigationOptions: {
      headerTitle: 'Messages'
    }
  }
});
