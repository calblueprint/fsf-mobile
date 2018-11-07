import React from 'react';
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'


class DonateScreen extends BaseScreen {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
          <Text>Hi FSF!</Text>
          <Button
            onPress={() => this._switchTab(this, 'Login')}
            title='Login!'
            />
          <Button
            onPress={() => this._switchTab(this, 'Messages')}
            title='Messages'
            />

      </View>
    );
  }
}
export default DonateScreen;
