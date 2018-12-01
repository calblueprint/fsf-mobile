import React from 'react';
import { Button, Text, View, AsyncStorage, Alert, ToastAndroid} from 'react-native';
import BaseScreen from '../BaseScreen'
import { testNotify } from '../../lib/notifications'
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
              <Button onPress={() => testNotify("Test Notification")} title="Test Notification"/>

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
}
export default ProfileScreen;
