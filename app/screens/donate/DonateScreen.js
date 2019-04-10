import React from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';

import AmountComponent from '../../components/donations/AmountComponent';
import BillingComponent from '../../components/donations/BillingComponent';
import PaymentComponent from '../../components/donations/PaymentComponent';
import BaseScreen from '../BaseScreen';
import colors from '../../styles/colors';
import {
  okAlert
} from '../../lib/alerts';
import {
  TCGetBillingID,
  TCSinglePayment,
  storeBillingID,
  storeLastFour,
  storeCardholder
} from '../../lib/donate';
import {
  getStoredApiKey,
  getStoredEmail
} from '../../lib/login';


const labels = ['Amount', 'Billing Information', 'Payment Information']
class DonateScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      savedCC: false,
      loadingCC: true,
      currentPosition: 0,
      address: '',
      city: '',
      country: '',
      stateProvince: '',
      postalCode: '',
      cardholder: '',
      cc: '',
      exp: '',
      securityCode: '',
      valid_cc: false,
    }
  }

  donate = async () => {
    try {
      var amount = this.state.amount.toString();

      // Represent amount in the number of cents
      // e.g. $10.34 = 1034
      // TODO: validation of the correctness of amount
      const dotIndex = amount.indexOf('.');
      if (dotIndex == -1) {
        amount = amount + '00';
      } else {
        amount = amount.substring(0, dotIndex) +
                 amount.substring(dotIndex + 1, dotIndex + 3);
      }

      const email = await getStoredEmail();
      const apiKey = await getStoredApiKey();

      var exp = this.state.exp;
      exp = exp.substring(0, 2) + exp.substring(3);

      var cc = this.state.cc;
      cc = cc.replace(/\s+/g, '');

      tcInfo = {
        'name': this.state.cardholder,
        'cc': cc,
        'exp': exp,
        'amount': amount,
        'email': email,
        'apikey': apiKey,
      };
      const transResp = await TCSinglePayment(tcInfo);

      if (transResp.status != 'approved') {
        okAlert('Error: Transaction not approved', 'Try again');
      } else {
        const resp = await TCGetBillingID(tcInfo);
        await storeBillingID(resp.billingid);
        await storeLastFour(tcInfo['cc'].slice(8, 12));
        await storeCardholder(this.state.cardholder)
        okAlert('Success! Transaction ID: ' + transResp.transid);
        this.props.navigation.navigate('DonateSuccess', {
          amount: this.state.amount.toString(),
          cardholder: this.state.cardholder,
        });
      }
    } catch(error) {
      okAlert('Donate failed', 'Try again');
      // Can considering uncommenting this line just to show them what the complete flow will look like
      // this.props.navigation.navigate('DonateSuccess');
    }
  };

  handleChange = (target, text) => {
    this.setState({ [target]: text });
  };

  handleCreditCardChange = (form) => {
    console.log(form)
    this.setState({
      'cc': form.values.number,
      'exp': form.values.expiry,
      'securityCode': form.values.cvc,
      'cardholder': form.values.name,
      'valid_cc': form.valid,
    });
  };

  onPageChange = (position) => {
    this.setState({ currentPosition: position })
  };

  renderStepComponent() {
    if (this.state.currentPosition == 0) {
      return (
        <AmountComponent
          handleChange={this.handleChange}
          changePage={this.onPageChange}
          styles={styles}
          amount={this.state.amount}
        />
      )
    } else if (this.state.currentPosition == 1) {
      return (
        <BillingComponent
          handleChange={this.handleChange}
          changePage={this.onPageChange}
          styles={styles}
          props={this.state}
        />
      )
    } else if (this.state.currentPosition == 2) {
      return (
        <PaymentComponent
          handleChange={this.handleCreditCardChange}
          changePage={this.onPageChange}
          styles={styles}
          amount={this.state.amount}
          disabledButton={this.state.valid_cc}
          donate={this.donate}
        />
      )
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1}}>
          <KeyboardAvoidingView
            style={{ flex: 1, marginTop: 10 }}
          >
            <StepIndicator
              currentPosition={this.state.currentPosition}
              labels={labels}
              stepCount={3}
              onPress={this.onPageChange}
            />
              {this.renderStepComponent()}
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>

    );
  }
}

const styles = StyleSheet.create({
  donationButton: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    backgroundColor: '#27ae60',
  },
  disabledDonationButton: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    backgroundColor: '#27ae60',
    opacity: .25
  },
  donationButtonContent: {
    height: 50
  },
  donationButtonText: {
    color: colors.textLight,
    fontSize: 18
  },
  container: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 15
  }
});

export default DonateScreen;
