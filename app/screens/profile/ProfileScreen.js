import {
  WebBrowser
} from 'expo';
import React from 'react';
import {
  Button,
  Text,
  View,
  AsyncStorage,
  Alert
} from 'react-native';

import BaseScreen from '../BaseScreen'
import {
  okAlert
} from '../../lib/alerts'
import {
  getStoredId,
} from '../../lib/login';

class ProfileScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = {
      componentDidMount: false,
      loggedIn: false,
      result: null,
    };
  }

  render() {
    if (!this.state.componentDidMount) {
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      if (this.state.loggedIn) {
        return (
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text>Your Profile</Text>
            <Button
              onPress={() => this._signOutAsync()}
              title='Sign Out'
              />
          </View>
        );
      } else {
        return (
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text>Sign In or Sign Up to view your profile!</Text>
            <Button onPress={this._navigateLogin} title="Sign In" />
            <Button onPress={this._handleRegister} title= "Join FSF" />
          </View>
        );
      }
    }
  }

  componentDidMount() {
    const idPromise = getStoredId();
    idPromise.then(_ => {
        this.setState({
          loggedIn: true,
          componentDidMount: true,
        });
      }
    ).catch(_ => {
        this.setState({
          loggedIn: false,
          componentDidMount: true,
        });
      }
    );
  }

  _signOutAsync = async () => {
    okAlert('Logged Out', '');
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  _handleRegister = async () => {
    let result = await WebBrowser.openBrowserAsync('https://my.fsf.org/join');
    this.setState({ result });
  };

  _navigateLogin = async() => {
    this.props.navigation.navigate('Auth');
  };
}
export default ProfileScreen;
