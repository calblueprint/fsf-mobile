import React from 'react';
import { Button, Text, View, AsyncStorage, Alert} from 'react-native';
import BaseScreen from '../BaseScreen'
import { okAlert } from '../../lib/alerts'

class ProfileScreen extends BaseScreen {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
          <Text>Hi FSF! This is a profile</Text>
          <Button
            onPress={() => this._signOutAsync()}
            title='Sign Out'
            />

            <Button
            onPress={() => this._Policy()}
            title='Privacy Policy'
            />

            <Button
            onPress={() => this._Version()}
            title='Version'
            />

      </View>
    );
  }

  _signOutAsync = async () => {
    okAlert('Logged Out', '')
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  _Policy = async () => {
    this.props.navigation.navigate('Privacy');
  }

  _Version = async () => {
    this.props.navigation.navigate('Version');
  }
}

export default ProfileScreen;
