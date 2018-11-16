import React from 'react';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'

class DonateBillingScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      country: "",
      stateProvince: "",
      postalCode: 0
    };
  }

  //todo make this part of lib?
  _handleChange = (name, value) => {
    //TODO: add validations here, use switch statement on name
    this.setState({ [name]: value });

    //sanity check
    console.log(this.state.address);
  };

  //todo pass state info on in onPress

  render() {
    const formInfos = [
      {
        id: 1,
        label: "address",
        func: input => this._handleChange("address", input)
      },
      {
        id: 2,
        label: "city",
        func: input => this._handleChange("city", input)
      },
      {
        id: 3,
        label: "country",
        func: input => this._handleChange("country", input)
      },
      {
        id: 4,
        label: "state/province",
        func: input => this._handleChange("stateProvince", input)
      },
      {
        id: 5,
        label: "postal code",
        func: input => this._handleChange("postalCode", input)
      }
    ];

    let formInputs = formInfos.map(formInfo => (
      <View key={formInfo.id}>
        <FormLabel> {formInfo.text} </FormLabel>
        <FormInput onChangeText={formInfo.func} />
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
