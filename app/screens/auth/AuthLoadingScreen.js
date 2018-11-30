import React from 'react';
import { NativeModules, ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import BaseScreen from '../BaseScreen'

const { NavigationBridge } = NativeModules

// This screen determines whether the user is logged in or not
class AuthLoadingScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('apikey');

    // This will switch to the landing screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if (!userToken) {
      this.props.navigation.navigate('Auth')
      return
    }

    var landing
    landing = await NavigationBridge.getLandingScreen()
    /*try {
      landing = await NavigationBridge.getLandingScreen()
    } catch (err) {
      landing = "main"
    }*/

    if (landing == "main") {
      this.props.navigation.navigate('App')
    } else if (landing == "donations") {
      this.props.navigation.navigate('Donate')
    } else {
      this.props.navigation.navigate('App')
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen
