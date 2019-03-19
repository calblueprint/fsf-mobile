import React from 'react';
import { Button, Text, View} from 'react-native';

import BaseScreen from '../BaseScreen';

class DonatePaymentScreen extends BaseScreen {
  constructor(props) {
    super(props);
  }

  onChange(form) {
    console.log(form)
  }

  render() {
    return (
      <View>
        <LiteCreditCardInput onChange={this._onChange} />
      </View>
    )
  }
}
export default DonatePaymentScreen;
