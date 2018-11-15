import React from 'react';
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'

class DonateSuccessScreen extends BaseScreen {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text>TrustCommerce Blurb!</Text>
          
        <Button
          onPress={() => this._switchTab(this, 'PaymentInfo')}
          title='start'
        />

      </View>
    );
  }
}
export default DonateSuccessScreen;
