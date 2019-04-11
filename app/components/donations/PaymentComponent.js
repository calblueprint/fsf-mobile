import React from 'react';
import { Text, View} from 'react-native';
import { Button, Switch } from 'react-native-paper';

import { CardView, CreditCardInput } from 'react-native-credit-card-input';

import {
  getSavedLastFour,
  getCardholder,
} from '../../lib/donate';

class PaymentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSavedCard: false,
      lastFour: '',
      cardholder: '',
    }
  }

  formatNumber() {
    return "**** **** ****" + this.state.lastFour
  }

  deleteSavedCreditCard() {
    // Add remove from Active Storage
    this.setState({
      hasSavedCard: false,
      lastFour: '',
      cardholder: ''
    })
  }

  editSavedCreditCard() {

  }

  renderDonateButton(repeat) {
    return (
      <Button
        style={this.props.disabledButton ? this.props.styles.donationButton : this.props.styles.disabledDonationButton}
        contentStyle={this.props.styles.donationButtonContent}
        onPress={_ => this.props.donate(repeat)}
        disabled={!this.props.disabledButton}
      >
        <Text style={this.props.styles.donationButtonText}>
          Donate ${this.props.amount}
        </Text>
      </Button>
    )
  }

  render() {
    if (this.state.hasSavedCard) {
      return (
        <View style={ this.props.styles.container } >
          <View style={{ flexDirection: 'row', justifyContent:'center' }}>
            <CardView
              number={this.formatNumber()}
              name={this.state.cardholder}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, marginLeft: 10, marginRight: 10 }} >
            <View style={{ flex: 1 }}>
              <Button
                mode='outlined'
                compact={true}
                style={{marginLeft: 10, marginRight: 10}}
                onPress={this.editSavedCreditCard}
              >
                <Text>Edit</Text>
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                mode='outlined'
                compact={true}
                style={{marginLeft: 10, marginRight: 10}}
                onPress={this.deleteSavedCreditCard}
              >
                <Text>Delete</Text>
              </Button>
            </View>
          </View>
          {this.renderDonateButton(true)}
        </View>
      )
    } else {
      return (
        <View style={ this.props.styles.container } >
          <CreditCardInput
            onChange={this.props.handleChange}
            requiresName={true}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 30}}>
            <Switch
              value={this.props.remember_card}
              onValueChange={_=> this.props.handleCheck('remember_card', !this.props.remember_card)}
            />
            <Text style={{marginTop: 6, marginLeft: 8}}>
              Remember My Card
            </Text>
          </View>
          {this.renderDonateButton(false)}
        </View>
      )
    }
  }

  componentDidMount() {
    Promise.all([
      getSavedLastFour(),
      getCardholder()
    ]).then((values) => {
      console.log(values)
      if (values.every((v) => v !== null)) {
        this.setState({
          hasSavedCard: true,
          lastFour: values[0],
          cardholder: values[1],
        });
      }
    });
    console.log("here")
  }
}
export default PaymentComponent;
