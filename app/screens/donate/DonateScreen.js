import React from 'react';
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'
import { testNotify } from '../../lib/notifications'


class DonateScreen extends BaseScreen {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
          <Text>Hi FSF!</Text>
          <Button onPress={() => testNotify("Test Notification")} title="Test Notify"/>
      </View>
    );
  }
}
export default DonateScreen;
