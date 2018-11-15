import React from 'react';
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'

class DonatePaymentScreen extends BaseScreen {
  constructor(props) {
    super(props);
  }

  render() {
    const formInfos = [
      {
        id: 1,
        label: "name on card",
      },
      {
        id: 2,
        label: "credit card number",
      },
      {
        id: 3,
        label: "expiration date",
      },
      {
        id: 4,
        label: "security code",
      }
    ];
    
    let formInputs = formInfos.map(formInfo => (
      <View>
        <FormLabel key={formInfo.id}> {formInfo.text} </FormLabel>
        <FormInput onChange={formInfo.function} />
      </View>
    ));
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>TrustCommerce Blurb!</Text>

        <Button
          onPress={() => this._switchTab(this, "DonateSuccess")}
          title="continue"
        />
      </View>
    );
  }
}
export default DonatePaymentScreen;
