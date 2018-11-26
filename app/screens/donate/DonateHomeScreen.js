import React from 'react';
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'
import { TextInput } from 'react-native-gesture-handler';
import {
  getSavedBillingID
} from "../../lib/donate";
import { okAlert } from "../../lib/alerts";
import { AsyncStorage } from "react-native";

class DonateHomeScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = { 
      amount: 20,
      loading: true,
      savedCC: false
    };
  }

  static navigationOptions = {
    headerVisible: false
  };

  // Made this async to interact with AsyncStorage
  componentDidMount() {
    AsyncStorage.getItem('billingID').then(token => {
      this.setState({ savedCC: false, loading: false });
    });
  }

  // _setStateAsync = (state) => {
  //   return new Promise((resolve) => {
  //     this.setState(state, resolve)
  //   });
  // }

  _changeAmount = textAmount => {
    let newAmount = parseInt(textAmount.slice(1));
    this.setState({ amount: newAmount });
  };

  _goToNext = (repeatable) => 
  {
    if (repeatable) {
      this._switchTab(this, "DonateRepeatable", this.state);
    } else {
      this._switchTab(this, "DonateBilling", this.state);
    }
  }

  render() {
    let amountOptions = [
      '$10',
      '$100',
      '$250',
      '$500',
      '$1000',
      '$2500'
    ]
  
    let amountOptButtons = amountOptions.map((amt, i) => 
    <View key={i}>
      <Button onPress={() => this._changeAmount(amt)} title={amt} />
    </View>);

    if (this.state.loading) {
      return (
      <View>
        <Text> Loading, please wait... </Text>
      </View>
      )
    }
    return (
    <View style={{ flex: 1, alignItems: "center" }}>
        <Text>Support the Free Software Foundation</Text>
        <Text>Your support makes the Free Software Foundation's work possible. Will you power up the free software movement with a donation today?</Text>
        <TextInput style={{ fontSize: 20 }} onChangeText={amount => this.setState(
              { amount: parseInt(amount.slice(1)) }
            )} value={"$" + this.state.amount.toString()} />
        {amountOptions}
      { this.state.savedCC ? 
      <View> 
        <Button onPress={() => this._goToNext(true)} title="use saved credit card info" /> 
        <Button onPress={() => this._goToNext(false)} title="enter payment info" />
      </View>
      :
      <Button onPress={() => this._goToNext(false)} title="start" />}
    </View>
    )
  }
}
export default DonateHomeScreen;
