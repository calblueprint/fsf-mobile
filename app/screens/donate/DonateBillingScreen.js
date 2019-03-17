import React from 'react';
// TODO
//import { FormLabel, FormInput } from 'react-native-elements'
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen';

class DonateBillingScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      country: "",
      stateProvince: "",
      postalCode: 0,
    };
  }

  static navigationOptions = {
    title: "Billing Info"
  };

  //TODO: make this part of lib?
  _handleChange = (name, value) => {
    //TODO: add validations here, use switch statement on name
    this.setState({ [name]: value });
  };

  _onPress = () => {
    //TODO figure out propTypes checking with this 
    let mergedNavProps = { 
      ...this.state, 
      ...this.props.navigation.state.params };
    console.log(mergedNavProps);
    this._switchTab(this, "DonatePayment", mergedNavProps)
  }

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
        <Text>Coming Soon</Text>
        //<FormLabel> {formInfo.label} </FormLabel>
        //<FormInput onChangeText={formInfo.func} />
      </View>
    ));

    return <View style={{ flex: 1, alignItems: "center" }}>
        {formInputs}
        <Button onPress={this._onPress} title="continue" />
      </View>;
  }
}
export default DonateBillingScreen;
