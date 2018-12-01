import React from 'react';
import { Button, Text, View, AsyncStorage, Alert, ToastAndroid} from 'react-native';
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
              onPress={() => this._toggleNotifications()}
              title='Toggle Notifications'
              />
      </View>
    );
  }

  _signOutAsync = async () => {
    okAlert('Logged Out', '')
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  _toggleNotifications = async () => {
    status = await AsyncStorage.getItem('notificationsOn')
    status = JSON.parse(status)
    status = JSON.stringify(!status)
    ToastAndroid.show('Notifications On: ' + status, ToastAndroid.SHORT);
    await AsyncStorage.setItem('notificationsOn', status)
  }
}
export default ProfileScreen;
