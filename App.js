import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavContainer } from './app/config/navigation';
import { initializeNotifications } from './app/lib/notifications';
import initializeBackgroundFetch from './app/lib/background';

export default class App extends React.Component {
  
  componentDidMount() {
    initializeNotifications();
    initializeBackgroundFetch();
  }

  render() {
    return (
      <NavContainer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
