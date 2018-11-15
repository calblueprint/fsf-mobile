import React from 'react';
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'

class DonateBillingScreen extends BaseScreen {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text>TrustCommerce Blurb!</Text>
          
        <Button
          onPress={() => this._switchTab(this, 'DonatePayment')}
          title='start'
        />

      </View>
    );
  }
}
export default DonateBillingScreen;
