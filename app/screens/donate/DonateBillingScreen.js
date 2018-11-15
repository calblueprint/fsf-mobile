import React from 'react';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'

class DonateBillingScreen extends BaseScreen {
  constructor(props) {
    super(props);
  }

  // static handleChange = () => {

  // }

  render() {
    const formInfos = [
      {
        id: 1,
        label: "address",
      },
      {
        id: 2,
        label: "city",
      },
      {
        id: 3,
        label: "country",
      },
      {
        id: 4,
        label: "state/province",
      },
      {
        id: 5,
        label: "postal code",
      },
    ];

    let formInputs = formInfos.map(formInfo => (
      <View>
        <FormLabel key={formInfo.id}> {formInfo.text} </FormLabel>
        <FormInput onChange={formInfo.function} />
      </View>
    ));

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
