import React from 'react';
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'
import { testNotify } from '../../lib/notifications'
import DeviceInfo from 'react-native-device-info';


class DonateScreen extends BaseScreen {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
          <Text>Hi FSF!</Text>
          <Button onPress={() => testNotify("Test Notification")} title="Test Notify"/>
          <Button onPress={() => this.testFetch()} title="Test Fetch"/>
      </View>
    );
  }

  testFetch() {
    var deviceInfo = `TEST FETCH. Device Name: ${DeviceInfo.getDeviceName()}, Device Type: ${DeviceInfo.getModel()}, Device ID: ${DeviceInfo.getUniqueID()}, API Level: ${DeviceInfo.getAPILevel()}`
    let req = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'device_id': deviceInfo
      })
    };
    fetch('http://fsf-notif-test.herokuapp.com/notifications', req).then(function (response) {
      console.log("Background task request Response: ")
      console.log(response)
    });
  }
}
export default DonateScreen;
