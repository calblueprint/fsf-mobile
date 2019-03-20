import React from 'react';
import {
  Button,
  Text,
  View,
  AsyncStorage,
  ToastAndroid,
  Alert
} from 'react-native';

import BaseScreen from '../BaseScreen'
import {
  okAlert
} from '../../lib/alerts'
import { testNotify } from '../../lib/notifications'
import {
  getStoredId,
  guestLogOut,
  userLogOut,
  getStoredUserInfo,
} from '../../lib/login';
import UserInfoCard from '../../components/UserInfoCard';

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
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          {this.state.loggedIn ? (
            <View>
              <Text>Hi FSF! This is a profile</Text>
             {this.state.userInfo != null ? <UserInfoCard userInfo={this.state.userInfo}></UserInfoCard> : null}
              <Button onPress={this._signOutAsync} title='Sign Out' />
            </View>
          ) : (
            <View>
              <Text>Sign In or Sign Up to view your profile!</Text>
              <Button onPress={this._navigateLogin} title="Sign In" />
              <Button onPress={this._handleRegister} title= "Join FSF" />
            </View>
          )}
          <Button onPress={this._Policy} title='Privacy Policy' />
          <Button onPress={this._Version} title='Version' />
          <Button
              onPress={() => this._toggleNotifications()}
              title='Toggle Notifications'
              />
          <Button onPress={() => testNotify("Test Notification")} title="Test Notification"/>
        </View>
      )
    }
   }

  componentDidMount() {
    this._fetchUserInfo();
    getStoredId().then(_ => {
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
    await userLogOut();
    this.props.navigation.navigate('Auth');
  };

  _handleRegister = async () => {
    this.props.navigation.navigate('Register');
  };

  _navigateLogin = async() => {
    await guestLogOut();
    this.props.navigation.navigate('Auth');
  };

  _toggleNotifications = async () => {
    let status = await AsyncStorage.getItem('notificationsOn')
    if (status == null) {
      status = true
    }
    status = !JSON.parse(status) // Flip the value of status
    if(status) {
      ToastAndroid.show("Turned Notifications On", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Turned Notifications Off", ToastAndroid.SHORT);
    }
    await AsyncStorage.setItem('notificationsOn', JSON.stringify(status))
  }

  _Policy = async () => {
    this.props.navigation.navigate('Privacy');
  };

  _Version = async () => {
    this.props.navigation.navigate('Version');
  };

  _fetchUserInfo = async () => {
    // TODO: add specific user handling
    console.log("fetching");
    let userInfo = await getStoredUserInfo();
    this.setState({ userInfo: userInfo});
    console.log(userInfo)
  }

}

export default ProfileScreen;
