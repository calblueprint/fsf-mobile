import React from 'react';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'

class DonateBillingScreen extends BaseScreen {
  constructor(props) {
    super(props);
  }

  static formInfos = [
    {
      id: 1,
      label: "address",
      function: "placeholder"
    },
    {
      id: 2,
      label: "city",
      function: "placeholder"
    },
    {
      id: 3,
      label: "country",
      function: "placeholder"
    },
    {
      id: 4,
      label: "state/province",
      function: "placeholder"
    },
    {
      id: 5,
      label: "postal code",
      function: "placeholder"
    },
  ];

  static formInputs = DonateBillingScreen.formInfos.map( formInfo => (
    <View>
      <FormLabel key={formInfo.id}> {formInfo.text} </FormLabel>
      <FormInput onChangeText={formInfo.function} />
    </View>
  ));

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>Billing Info</Text>
        {formInputs}
        <Button
          onPress={() => this._switchTab(this, "DonatePayment")}
          title="start"
        />
      </View>
    );
  }
}
export default DonateBillingScreen;
