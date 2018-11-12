import React from 'react';
import {
  Button, Text, View, TextInput, StyleSheet, Alert, AsyncStorage,
} from 'react-native';
import {
  getLoginTicket, casLogin, getCiviCRMApiKey
} from '../lib/login.js';

class LoginScreen extends React.Component {
  static _showApiKey() {
    const alertError = () => {
      Alert.alert(
        'API Key not found',
        'You may need to login first!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    };

    const request = async () => {
      try {
        const key = await AsyncStorage.getItem('apikey');
        const id = await AsyncStorage.getItem('id');
        if (key != null) {
          Alert.alert(
            'Found API Key',
            `${key} ${id}`,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false },
          );
        } else {
          alertError();
        }
      } catch (error) {
        alertError();
      }
    };

    request();
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  _attemptLogin() {
    const request = async () => {
      try {
        const loginTicket = await getLoginTicket();

        const serviceTicket = await casLogin(this.state.email, this.state.password, loginTicket);

        const apiKey = await getCiviCRMApiKey(serviceTicket);

        const saveKey = async (apiKey) => {
          try {
            await AsyncStorage.setItem('apikey', apiKey.key);
            await AsyncStorage.setItem('id', apiKey.id);
          } catch (error) {
            console.log('fail to save API KEY!!!');
            console.log(error);
          }
        };

        saveKey(apiKey);

        Alert.alert(
          'Login succeeded',
          `${apiKey.id} ${apiKey.key}`,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
        this.props.navigation.goBack(); // Assumes that LoginScreen was displayed as modal.
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Login failed',
          'Try again',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
      }
    };
    request();
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#ff7878' }}>
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
        <Button onPress={() => this._attemptLogin()} title="Login" />
        <Button onPress={() => this._showApiKey()} title="Show API Key" />
      </View>
    );
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
});

export default LoginScreen;
