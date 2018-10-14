import React from 'react';
import { Button, Text, View, TextInput, StyleSheet, Alert } from 'react-native';


class LoginScreen extends React.Component {

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
    if (this.state.email.includes("fsf.org") && this.state.password == "password") {
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
    }
  }
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
