import React from 'react';
import { Text, TouchableWithoutFeedback, Keyboard, View} from 'react-native';
import { Button } from 'react-native-paper';

import { CreditCardInput } from 'react-native-credit-card-input';

class PaymentComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={ this.props.styles.container } >
          <CreditCardInput
            onChange={this.props.handleChange}
            requiresName={true}
          />
          <Button
            style={this.props.styles.donationButton}
            contentStyle={this.props.styles.donationButtonContent}
            onPress={this.props.donate}
          >
            <Text style={this.props.styles.donationButtonText}>
              Donate ${this.props.amount}
            </Text>
          </Button>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
export default PaymentComponent;
