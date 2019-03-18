import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';

import AmountComponent from '../../components/donations/AmountComponent';
import BillingComponent from '../../components/donations/BillingComponent';
import BaseScreen from '../BaseScreen';
import colors from '../../styles/colors';


const labels = ["Amount", "Billing Information", "Payment Information"]
class DonateScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      savedCC: false,
      loadingCC: true,
      currentPosition: 0,
      address: "",
      city: "",
      country: "",
      stateProvince: "",
      postalCode: 0,
    }
  }

  handleChange = (target, text) => {
    this.setState({ [target]: text });
  };

  onPageChange = (position) => {
    console.log(position)
    console.log(this.state)
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
        <BillingComponent
          handleChange={this.handleChange}
          changePage={this.onPageChange}
          styles={styles}
        />
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1, maginTop: 10 }}>
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
