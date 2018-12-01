import React from 'react';
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'

class DonateScreen extends BaseScreen {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
          <Text>This is the donate screen! Please give us money :')</Text>
      </View>
    );
  }
}
export default DonateScreen;
