import React from 'react';
import { Button, Text, View, TextInput, StyleSheet, Alert, AsyncStorage } from 'react-native';
import BaseScreen from '../BaseScreen'

class LoginScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#ff7878'}}>
          <View style={styles.container}>
            <Text>Email</Text>
            <TextInput style={styles.textInput}
              autoCapitalize='none'
              onChangeText={(text) => this.setState({email: text})}/>
            <Text>Password</Text>
            <TextInput style={styles.textInput}
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry/>
          </View>
          <Button
            onPress={() => this._attemptLogin()}
            title='Login'/>
      </View>
    );
  }

  _attemptLogin() {
    // DEV ONLY
    this.state.email = "fsf.org"; this.state.password = "password";
    // REMOVE AFTER DEV ^^^

    if (this.state.email.includes("fsf.org") && this.state.password == "password") {
      Alert.alert(
        'Successfully Logged In!', '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      this._login()
    }else {
      Alert.alert(
        'Invalid Email or Password',
        'Try again',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }

  _login = async() => {
    console.log("Logging in");
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff'

  },
  container: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 180,
    alignSelf: 'stretch'
  }
});

export default LoginScreen;
