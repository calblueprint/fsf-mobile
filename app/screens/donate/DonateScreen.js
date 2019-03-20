import React from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
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
    }
  }

  donate = async () => {
    try {
      const amount = 0;
      if (this.state.amount.indexOf('.') == -1) {
        amount = amount + '00';
      } else {
        amount = amount;
      }
      const email = await getStoredEmail();
      const apiKey = await getStoredApiKey();
      tcInfo = {
        'name': this.state.cardholder,
        'cc': this.state.cc,
        'exp': this.state.exp,
        'amount': amount,
        'email': email,
        'apikey': apiKey,
      };
      const transResp = await TCSinglePayment(tcInfo);

      if (transResp.status != 'approved') {
        okAlert('Error: Transaction not approved', 'Try again');
      } else {
        const resp = await TCGetBillingID(tcInfo);
        storeBillingID(resp.billingid);
        storeLastFour(tcInfo['cc'].slice(8, 12));
        storeCardholder(this.state.cardholder)
        okAlert('Success! Transaction ID: ' + transResp.transid);
        this.props.navigation.navigate('DonateSuccess');
      }
    } catch(error) {
      okAlert('Donate failed', 'Try again');
    }
  };

  handleChange = (target, text) => {
    this.setState({ [target]: text });
  };

  handleCreditCardChange = (form) => {
    this.setState({
      'cc': form.values.number,
      'exp': form.values.expiry,
      'securityCode': form.values.cvc,
      'name': form.values.name,
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
          props={this.state}
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
          donate={this.donate}
        />
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        <StepIndicator
          currentPosition={this.state.currentPosition}
          labels={labels}
          stepCount={3}
          onPress={this.onPageChange}
        />
        {this.renderStepComponent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  donationButton: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    backgroundColor: colors.buttonGrey,
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
