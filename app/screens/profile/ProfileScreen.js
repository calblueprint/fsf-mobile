import React from 'react';
import { Button, Text, View, AsyncStorage, Alert} from 'react-native';
import BaseScreen from '../BaseScreen'
import { okAlert } from '../../lib/alerts'
import {
  getStoredId,
} from '../../lib/login';

class ProfileScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = {
      componentDidMount: false,
      loggedIn: false,
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
            <Text>Sign in to view your profile!</Text>
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
        })
      }
    )
  }

  _signOutAsync = async () => {
    okAlert('Logged Out', '')
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
}
export default ProfileScreen;
