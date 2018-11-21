import React from 'react';
import { FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'

class DonatePaymentScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      cardholder: "",
      ccn: 0,
      expiration: "",
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

  //this freezes as long as there's input on this page, wtf
  _onPress = () => {
    //TODO figure out propTypes checking with this
    let mergedNavProps = {
      ...this.state,
      ...this.props.navigation.state.params
    };
    console.log(mergedNavProps);
    this._switchTab(this, "DonateSuccess", mergedNavProps);
  };

  /* todo:
     pass state info on in onPress
     call to TC BE
     save BillingID in CiviCRM
     save last four digits (rip need to save a mapping between that and ccn too) - in CiviCRM?
   */

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
        func: input => this._handleChange("ccn", input)
      },
      {
        id: 3,
        label: "expiration date",
        func: input => this._handleChange("expiration", input)
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
