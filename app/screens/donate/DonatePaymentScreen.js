import React from 'react';
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'

class DonatePaymentScreen extends BaseScreen {
  constructor(props) {
    super(props);
  }

  static formInfos = [
    {
      id: 1,
      label: "name on card",
      function: "placeholder"
    },
    {
      id: 2,
      label: "credit card number",
      function: "placeholder"
    },
    {
      id: 3,
      label: "expiration date",
      function: "placeholder"
    },
    {
      id: 4,
      label: "security code",
      function: "placeholder"
    }
  ];

  static formInputs = DonatePaymentScreen.formInfos.map( formInfo => (
    <View>
      <FormLabel key={formInfo.id}> {formInfo.text} </FormLabel>
      <FormInput onChangeText={formInfo.function} />
    </View>
  ));

  render() {
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
