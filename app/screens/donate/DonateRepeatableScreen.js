import React from 'react';
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'
import { okAlert } from "../../lib/alerts";
import {
  TCRepeatablePayment,
  getSavedBillingID,
  getSavedLastFour
} from "../../lib/donate";


class DonateRepeatableScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      billingID: "",
      lastFour: "",
      loading: true,
      asyncError: false
    };
  }

  static navigationOptions = {
    title: "Confirmation"
  };

  // Made this async to interact with AsyncStorage
  async componentDidMount() {
    let billingID = await getSavedBillingID();
    let lastFour = await getSavedLastFour();
    console.log(billingID);
    console.log(lastFour);

    if (billingID != null) {
      this._setStateAsync({
        billingID: billingID,
        lastFour: lastFour,
        loading: false
      });
    } else {
      this._setStateAsync({
        loading: false,
        asyncError: true
      })
    }
  }

  _setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  _donate = async () => {
    try {
      //TODO figure out propTypes checking with this
      console.log(this.props.navigation.state.params)
      let amount = this.props.navigation.getParam("amount", "no-amount");
      let tcInfo = {
        billingid: this.state.billingID,
        amount: amount.toString() + "00"
      };

      console.log(tcInfo);
      const resp = await TCRepeatablePayment(tcInfo);
      console.log(resp);

      if (resp.status != "approved") {
        okAlert('Error: Repeatable transaction not approved', 'Try again');
      }
      else {
        okAlert("Success! Transaction ID: " + resp.transid)
        this._switchTab(this, "DonateSuccess", tcInfo);
      }
    } catch (error) {
      console.log(error);
      okAlert("Donate with saved payment info failed", "Try again");
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View>
          <Text> Loading, please wait... </Text>
        </View>
      );
    } else if (this.state.asyncError) {
      return (
      <View>
          <Text style={{color: 'red', fontSize: 45 }}> asyncError! </Text>
          <Text> You should never reach this page, so if you do... rip </Text>
      </View>
      );
    } else { 
      return <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{ fontWeight: "bold", fontSize: 20, color: "#64696B" }}
          >
            your saved payment information
          </Text>
          <Text style={{ fontSize: 16, color: "darkgray" }}>
            card info: XXXX XXXX XXXX {this.state.lastFour}
          </Text>
          <Button onPress={() => this._donate()} title="donate" />
        </View>;
    }
    
  }
}
export default DonateRepeatableScreen;
