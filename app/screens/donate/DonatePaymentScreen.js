import React from 'react';
import { FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import { Button, Text, View} from 'react-native';
import {
  getStoredApiKey,
  getStoredId
} from "../../lib/login";
import {
  TCGetBillingID, 
  CiviStoreBillingID, 
  CiviStoreLastFour, 
  CiviCreateContribution
 } from "../../lib/donate";
import BaseScreen from '../BaseScreen'

class DonatePaymentScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      cardholder: "",
      cc: 0,
      exp: "",
      securityCode: ""
    };
  }

  static navigationOptions = {
    title: "Payment Info"
  };

  _handleChange = (name, value) => {
    //TODO: add validations here, use switch statement on name
    this.setState({ [name]: value });

    //sanity check
    // console.log(this.state);
  };

  _onPress = () => {
    //TODO figure out propTypes checking with this
    let mergedNavProps = {
      ...this.state,
      ...this.props.navigation.state.params
    };
    
    /*
    call to TC BE
    - requires a POST request with json payload with the following format (adjust this.state)
    *
    * {
        "name": "John Smith",
        "cc": "4111111111111111",
        "exp": "0404",
        "zip": "90000"
    }
    - change 'cardholder' to 'name' and give 'zip' instead of 'security code'
    
     save BillingID in CiviCRM
     save last four digits (rip - future: need to save a mapping between BillingID and ccn too) - in CiviCRM
    */
    this._switchTab(this, "DonateSuccess", mergedNavProps);
  };


  render() {
    const formInfos = [
      {
        id: 1,
        label: "cardholder name",
        func: input => this._handleChange("cardholder", input)
      },
      {
        id: 2,
        label: "credit card number",
        func: input => this._handleChange("cc", input)
      },
      {
        id: 3,
        label: "expiration date",
        func: input => this._handleChange("exp", input)
      },
      {
        id: 4,
        label: "security code",
        func: input => this._handleChange("securityCode", input)
      }
    ];

    let formInputs = formInfos.map(formInfo => (
      <View key={formInfo.id}>
        <FormLabel> {formInfo.label} </FormLabel>
        <FormInput onChangeText={formInfo.func} />
      </View>
    ));
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        {formInputs}
        <Button
          onPress={this._onPress}
          title="donate"
        />
      </View>
    );
  }
}
export default DonatePaymentScreen;
