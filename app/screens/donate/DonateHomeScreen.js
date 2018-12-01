import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import BaseScreen from '../BaseScreen'
import { TextInput } from 'react-native-gesture-handler';
import {
  getSavedBillingID
} from "../../lib/donate";
import StepperComponent from './StepperComponent';
import { okAlert } from "../../lib/alerts";

class DonateHomeScreen extends BaseScreen {
  constructor(props) {
    super(props);
    //loading might not be necessary, it's just slow enough to be annoying lmao
    this.state = { 
      amount: 20,
      savedCC: false,
      loading: true
    };
  }

  static navigationOptions = {
    headerVisible: false
  };

  // Made this async to interact with AsyncStorage
  async componentDidMount() {
    let billingID = await getSavedBillingID();

    console.log(billingID);
    if (billingID != null ) {
      this._setStateAsync({ savedCC: true, loading: false });
    }
    else {
      this._setStateAsync({ loading: false })
    }
  }

  _setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  _changeAmount = textAmount => {
    let newAmount = parseInt(textAmount.slice(1));
    if (isNaN(newAmount)) {
      newAmount = 0;
    }
    this.setState({ amount: newAmount });
  };

  _goToNext = (repeatable) => 
  {
    if (repeatable) {
      console.log(repeatable);
      this._switchTab(this, "DonateRepeatable", this.state);
    } else {
      this._switchTab(this, "DonateBilling", this.state);
    }
  }

  render() {
    let amountOptions1 = [
      '$10',
      '$25',
      '$50'
    ];
  
    let amountOptions2 = [
      '$100',
      '$250',
      '$500'
    ];

    let amountOptButtons1 = amountOptions1.map((amt, i) => 
    < Button key={i} onPress={() => this._changeAmount(amt)} title={amt} />);
    
    let amountOptButtons2 = amountOptions2.map((amt, i) => 
    < Button key={i+3} onPress={() => this._changeAmount(amt)} title={amt} />);

    if (this.state.loading) {
      return (
      <View>
        <Text> Loading, please wait... </Text>
      </View>
      )
    } else {
      return <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}>
          <View>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: "#64696B" }}
            >
              Support the Free Software Foundation
            </Text>
            <Text>
              Your support makes the Free Software Foundation's work
              possible. Will you power up the free software movement with a
              donation today?
            </Text>
          </View>
          
          <View style={{ alignItems: "center" }}>
            <TextInput style={{ fontSize: 45, color: "#64696B" }} onChangeText={amt => this._changeAmount(amt)} value={"$" + this.state.amount.toString()} />
            <View
              style={{ justifyContent: "center", flexDirection: "row" }}
            >
              {amountOptButtons1}
            </View>
            <View
              style={{ justifyContent: "center", flexDirection: "row" }}
            >
              {amountOptButtons2}
            </View>
          </View>

          <View style={{ marginTop: 25 }} />
          {this.state.savedCC ? <View style={{ flex: 1, alignItems: "center" }}>
              <Button onPress={() => this._goToNext(true)} title="use saved credit card info" />
              <Text style={{ fontWeight: "bold", color: "#64696B" }}>
                {" "}
                or{" "}
              </Text>
              <Button onPress={() => this._goToNext(false)} title="enter payment info" />
            </View> : <Button onPress={() => this._goToNext(false)} title="start" />}
        </View>;
    }
    
  }
}
export default DonateHomeScreen;
