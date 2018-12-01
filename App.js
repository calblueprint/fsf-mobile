import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { NavContainer, prefix } from './app/config/navigation';
import { initializeNotifications } from './app/lib/notifications';
import { initializeBackgroundFetch } from './app/lib/background'

export default class App extends React.Component {

  componentDidMount() {
    initializeNotifications()
    initializeBackgroundFetch()
  }

  render() {
    return (
      <NavContainer uriPrefix={prefix} />
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
