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
          <Button onPress={() => this.testFetch()} title="Register Device For Background Debugging"/>
      </View>
    );
  }

  testFetch() {
    let version = DeviceInfo.getAPILevel();
    let type = DeviceInfo.getModel();
    let uuid = DeviceInfo.getUniqueID();
    let appVersion = 0.3
    let req = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'uuid': uuid,
        'type': type,
        'version': version,
        'app_version': appVersion
      })
    };
    fetch('http://fsf-notif-test.herokuapp.com/register', req).then(function (response) {
      console.log("Background task request Response: ")
      console.log(response)
    });
  }
}
export default DonateScreen;
