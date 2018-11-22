import React from 'react';
import { FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import { Button, Text, View} from 'react-native';
import {
  getStoredApiKey,
  getStoredId
} from "../../lib/login";
import {
  TCGetBillingID, CiviStoreBillingID, CiviStoreLastFour, CiviCreateContribution
 } from '../../lib/donate';
import BaseScreen from '../BaseScreen'
import { okAlert } from '../../lib/alerts'

class DonatePaymentScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      cardholder: '',
      cc: 0,
      exp: '',
      securityCode: '',
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

  _donate = async () => {
    try {
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
      

      save BillingID in CiviCRM
      save last four digits (rip - future: need to save a mapping between BillingID and ccn too) - in CiviCRM
      */

      // change 'cardholder' to 'name', add 'zip' prop, del 'security code'
      let tcInfo = JSON.parse(JSON.stringify(this.state));
      tcInfo['zip'] = mergedNavProps['postalCode'];
      tcInfo['name'] = tcInfo['cardholder'];
      ({ cardholder, securityCode, ...tcInfo } = tcInfo);

      //sanity check
      console.log(tcInfo);

      // DEV only
      tcInfo = {
        "name": "John Smith",
        "cc": "4111111111111111",
        "exp": "0404",
        "zip": "90000"
      };

      // remove after dev
      const resp = await TCGetBillingID(tcInfo);
      CiviStoreBillingID(null, resp.billingid);

      this._switchTab(this, "DonateSuccess", mergedNavProps);
    } catch(error) {
      console.log(error);
      okAlert('Donate failed', 'Try again');
    }
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
          onPress={() => this._donate()}
          title="donate"
        />
      </View>
    );
  }
}
export default DonatePaymentScreen;
