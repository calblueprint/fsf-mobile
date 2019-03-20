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
    });
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

  _Policy = async () => {
    this.props.navigation.navigate('Privacy');
  };

  _Version = async () => {
    this.props.navigation.navigate('Version');
  };

  _fetchUserInfo = async () => {
    //todo add specific user handling
    console.log("fetching");
    let userInfo = await getStoredUserInfo();
    this.setState({ userInfo: userInfo});
    console.log(userInfo)
  }

}

export default ProfileScreen;
