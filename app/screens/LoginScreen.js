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
    const request = async () => {
      try {
        const getLoginTicket = async() => {
          const resp = await fetch("https://cas.fsf.org/login?service=https%3A%2F%2Fcrmserver3d.fsf.org%2Fassociate%2Faccount");
          if (!resp.ok) {
            throw new Error("Server error when getting login token");
          }

          const ticketRegex = /\"LT-[^\"]*\"/g;
          const match = ticketRegex.exec(await resp.text());

          if (match == null) {
            console.log(await resp.text());
            throw new Error("Did not find a LT- match in CAS login page. Already logged in?");
          } else {
            return match[0].replace(/\"/g, "");
          }
        }

        const loginTicket = await getLoginTicket();

        const login = async(email, password, loginTicket) => {
          let formData = new FormData();
          formData.append("username", email);
          formData.append("password", password);
          formData.append("lt", loginTicket);
          formData.append("service", "https://crmserver3d.fsf.org/associate/account");
          const resp = await fetch("https://cas.fsf.org/login?",
            {
              method: 'POST',
              body: formData,
            });

          if (resp.status >= 400) {
            console.log(resp.status);
            console.log(loginTicket);
            console.log(formData);
            throw new Error("Login failed or server error");
          }

          const ticketRegex = /ST-[^&]*&/g;
          const body = (await resp.text()).replace(/&amp;/g, "&");
          const match = ticketRegex.exec(body);

          if (match != null) {
            return match[0].substring(0, match[0].length - 1);
          }

          // look at Location header in HTTP 303 case
          const headers = resp.headers;
          if (headers.has("Location")) {
            const url = headers.get("Location");
            const ticketRegex = /ST-[^&]*/g;
            const match = ticketRegex.exec(url);
            if (match != null) {
              return match[0];
            }
          }

          console.log(headers);
          console.log(body);
          throw new Error("Did not find Service Token in response");
        }

        const serviceTicket = await login(this.state.email, this.state.password, loginTicket);

        Alert.alert(
          "Login succeeded",
          serviceTicket,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        );
      }
      catch (error) {
        console.error(error);
        Alert.alert(
          "Login failed",
          "Try again",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        );
      }
    }
    request();


    /*if (this.state.email.includes("fsf.org") && this.state.password == "password") {
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
    }*/
  }

  _getLoginTicket() {


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
