import React from 'react';
import {
  Button, Text, View, TextInput, StyleSheet, Alert, AsyncStorage,
} from 'react-native';

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
        const { state } = this.state;
        const getLoginTicket = async () => {
          const resp = await fetch(
            'https://cas.fsf.org/login?service=https%3A%2F%2Fcrmserver3d.fsf.org%2Fassociate%2Faccount',
          );
          if (!resp.ok) {
            throw new Error('Server error when getting login token');
          }

          const ticketRegex = /\"LT-[^\"]*\"/g;
          const match = ticketRegex.exec(await resp.text());

          if (match == null) {
            console.log(await resp.text());
            throw new Error('Did not find a LT- match in CAS login page. Already logged in?');
          } else {
            return match[0].replace(/\"/g, '');
          }
        };

        const loginTicket = await getLoginTicket();

        const login = async (email, password, loginTicket) => {
          const formData = new FormData();
          formData.append('username', email);
          formData.append('password', password);
          formData.append('lt', loginTicket);
          formData.append('service', 'https://crmserver3d.fsf.org/associate/account');
          const resp = await fetch('https://cas.fsf.org/login', {
            method: 'POST',
            redirect: 'error',
            credentials: 'include',
            body: formData,
          });

          if (resp.status >= 400) {
            console.log(resp.status);
            console.log(loginTicket);
            console.log(formData);
            throw new Error('Login failed or server error');
          }

          const ticketRegex = /ST-[^&]*&/g;
          const body = (await resp.text()).replace(/&amp;/g, '&');
          const match = ticketRegex.exec(body);

          if (match != null) {
            return match[0].substring(0, match[0].length - 1);
          }

          // look at Location header in HTTP 303 case
          const { headers } = resp.headers;
          if (headers.has('Location')) {
            const url = headers.get('Location');
            const ticketRegex = /ST-[^&]*/g;
            const match = ticketRegex.exec(url);
            if (match != null) {
              return match[0];
            }
          }

          console.log(headers);
          console.log(body);
          throw new Error('Did not find Service Token in response');
        };

        const serviceTicket = await login(state.email, state.password, loginTicket);

        const getCiviCRMApiKey = async (serviceTicket) => {
          const resp = await fetch('http://fsfmobile0p.fsf.org:8080/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              st: serviceTicket,
            }),
          });

          if (resp.status >= 400) {
            throw new Error('Failed to get CiviCRM api key');
          }

          return resp.json();
        };

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
      } catch (error) {
        console.error(error);
        Alert.alert(
          'Login failed',
          'Try again',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
      }
    };
    request();

    /* if (this.state.email.includes("fsf.org") && this.state.password == "password") {
      this.props.navigation.goBack(); // Assumes that LoginScreen was displayed as modal.
    }else {
      Alert.alert(
        'Invalid Email or Password',
        'Try again',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    } */
  }

  _getLoginTicket() {}

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
