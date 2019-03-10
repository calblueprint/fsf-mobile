import React from 'react';
import { FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import { Button, Text, View} from 'react-native';
import {
  TCGetBillingID,
  TCSinglePayment,
  storeBillingID,
  storeLastFour,
  storeCardholder
} from "../../lib/donate";
import BaseScreen from '../BaseScreen';
import { okAlert } from '../../lib/alerts';
import { getStoredEmail, getStoredApiKey } from '../../lib/login';

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
  };

  _donate = async () => {
    try {
          //TODO figure out propTypes checking with this
          let mergedNavProps = { ...this.state, ...this.props.navigation.state.params };

          let tcInfo = JSON.parse(JSON.stringify(this.state));
          tcInfo["zip"] = mergedNavProps["postalCode"];
          tcInfo["amount"] = mergedNavProps["amount"].toString() + "00";
          // tcInfo['name'] = tcInfo['cardholder'];
          tcInfo['name'] = "John Smith"; //DEMO PURPOSES ONLY, uncomment above for prod
          tcInfo['email'] = getStoredEmail
          tcInfo['apikey'] = getStoredApiKey
          ({ cardholder, securityCode, ...tcInfo } = tcInfo);

          // DEV only
          // tcInfo = {
          //   "name": "John Smith",
          //   "cc": "4111111111111111",
          //   "exp": "0404",
          //   "zip": "90000"
          //   "email": 
          //   "apikey":
          // };
          // remove after dev

          console.log(tcInfo);

          const transResp = await TCSinglePayment(tcInfo);
          /*
            type TCSaleResp struct {
              TransID  string `json:"transid"`
              Status   string `json:"status"`
              AuthCode string `json:"authcode"`
            }
          */
          console.log(transResp);

          if (transResp.status != "approved") {
            okAlert("Error: Transaction not approved", "Try again");
          } else {
            const resp = await TCGetBillingID(tcInfo);
            storeBillingID(resp.billingid);
            let lastFour = tcInfo["cc"].toString().slice(8, 12);
            storeLastFour(lastFour);
            storeCardholder(this.state.cardholder)

            okAlert("Success! Transaction ID: " + transResp.transid);
            this._switchTab(this, "DonateSuccess", mergedNavProps);
          }
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
    return <View style={{ flex: 1, alignItems: "center" }}>
        {formInputs}
        <Button onPress={() => this._donate()} title="donate" />
      </View>;
  }
}
export default DonatePaymentScreen;
