import React from 'react';
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'
import { TextInput } from 'react-native-gesture-handler';
import {
  getSavedBillingID,
  getSavedLastFour
} from "../../lib/donate";

class DonateHomeScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      billingID: "",
      lastFour: ""
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

    if (billingID) {
      this._setStateAsync({
        billingID: billingID,
        lastFour: lastFour
      });
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
      let amount = this.props.navigation.getParam("amount", "no-amount");
      let navProps = {
        amount: amount
      };

      // pass billingID to TC repeatable donations endpoint
      this._switchTab(this, "DonateSuccess", navProps);
    } catch (error) {
      console.log(error);
      okAlert("Donate with saved payment info failed", "Try again");
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>Your saved payment information</Text>
        <Text>Card info: XXXX XXXX XXXX {this.state.lastFour}</Text>
        <Button onPress={() => this._donate()} title="donate" />
      </View>
    );
  }
}
export default DonateHomeScreen;
