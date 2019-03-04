import React from 'react';
import {
  Alert,
  Button,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  casLogin,
  getCiviCRMApiKey,
  getLoginTicket,
  getStoredApiKey,
  getStoredId,
  storeApiKey,
  storeId,
  guestLogin,
  isGuestLoggedIn,
} from '../../lib/login';
import BaseScreen from '../BaseScreen'
import {
  okAlert
} from '../../lib/alerts';

import { WebBrowser } from 'expo';

class LoginScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      result: null,
      componentDidMount: false,
    };
  }

  _attemptLogin = async () => {
    try {
      const { props, state } = { props: this.props, state: this.state };
      const loginTicket = await getLoginTicket();

      const serviceTicket = await casLogin(state.email, state.password, loginTicket);

      const apiKey = await getCiviCRMApiKey(serviceTicket);

      storeApiKey(apiKey.key);
      storeId(apiKey.id);

      okAlert('Login succeeded', `${apiKey.id} ${apiKey.key}`);
      this.props.navigation.navigate('App');
    } catch (error) {
      console.log(error);
      okAlert('Login failed', 'Try again');
    }
  };

  _guestLogin = async () => {
    guestLogin().then(_ => {
        this.props.navigation.navigate('App');
      }
    ).catch(_ => {
      console.log("Guest Login Error")
    });
  };

  _handleRegister = async () => {
    let result = await WebBrowser.openBrowserAsync('https://my.fsf.org/join');
    this.setState({ result });
  };

  render() {
    if (this.state.componentDidMount) {
      return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#ff7878' }}>
          { this.state.showRegister && this.renderRegister() }
          <View style={styles.container}>
            <Text>Email</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={text => this.setState({ email: text })}
            />
            <Text>Password</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry
            />
          </View>
          <Button onPress={this._attemptLogin} title="Login" />
          <Button onPress={this._handleRegister} title="Join FSF" />
          <Button onPress={this._guestLogin} title="Continue as Guest" />
        </View>
      );
    } else {
      return (
        <View>
          Loading...
        </View>
      );
    }
  }

  componentDidMount() {
    isGuestLoggedIn().then(_ => {
      this.props.navigation.navigate('App');
    }).catch(_ => {
      this.setState({
        componentDidMount: true
      });
    });
  }
}


const styles = StyleSheet.create({
  textInput: {
    height: 40,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff',
  },
  container: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 180,
    alignSelf: 'stretch',
  },
  webView: {
    marginRight: 0,
    marginLeft: 0,
    marginTop: 0,
    alignSelf: 'stretch',
  }
});

export default LoginScreen;
