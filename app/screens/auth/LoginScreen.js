import React from 'react';
import {
  Alert,
  Image,
  Linking,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Button,
  TextInput
} from 'react-native-paper';

import {
  getStoredApiKey,
  getStoredId,
  guestLogin,
  isGuestLoggedIn,
  login,
  getUserInfo,
  storeUserInfo,
} from '../../lib/login';
import {
  okAlert
} from '../../lib/alerts';
import colors from '../../styles/colors'
import BaseScreen from '../BaseScreen'

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
      const apiKey = await login(this.state.email, this.state.password)
      // const userInfo = await getUserInfo(apiKey);

      okAlert('Login succeeded', `${apiKey.id} ${apiKey.key}`);
      this.props.navigation.navigate('App');
    } catch (error) {
      console.log(error);
      okAlert('Login failed', 'Try again');
    }
  };

  _guestLogin = async () => {
    await guestLogin();
    this.props.navigation.navigate('App');
  };

  _handleRegister = async () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    if (this.state.componentDidMount) {
      return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == 'ios' ? 'padding' : null}
        >
          <View style={styles.logoContainer}>
            <Image
              style={{ marginTop: 80 }}
              source={require('../../assets/fsf_transparent.png')}
            />
          </View>
          <View style={styles.loginContainer} >
            <TextInput
              style={styles.textInput}
              label='username'
              autoCapitalize='none'
              blurOnSubmit={true}
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
            <TextInput
              style={styles.textInput}
              label='password'
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
              secureTextEntry
            />
            <Button
              style={{marginTop: 30, backgroundColor: colors.buttonGrey}}
              contentStyle={styles.loginContent}
              mode='outlined'
              onPress={this._attemptLogin}
            >
              <Text style={{color: colors.textLight, fontSize: 18}}>
                Log In
              </Text>
            </Button>
            <Button
              style={{marginTop: 10}}
              onPress={this._handleRegister}
            >
              <Text style={{color: colors.textGrey, fontSize: 14}}>
                Don't have an FSF account?
              </Text>
            </Button>
            <Button onPress={this._guestLogin}>
              <Text style={{color: colors.textGrey, fontSize: 14}}>
                Continue as guest
              </Text>
            </Button>
          </View>
          <View style = {{flex: 1}} />
        </KeyboardAvoidingView>
      );
    } else {
      return (
        <View>
          <Text>Loading...</Text>
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
    backgroundColor: colors.backgroundWhite,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logoContainer: {
    height: 277,
    backgroundColor: colors.logoGrey,
    alignItems: 'center'
  },
  loginContainer: {
    marginTop: 40,
    marginRight: 40,
    marginLeft: 40,
  },
  loginButton: {
    marginTop: 30,
    backgroundColor: colors.buttonGrey,
  },
  loginContent: {
    height: 50,
  }
});

export default LoginScreen;
