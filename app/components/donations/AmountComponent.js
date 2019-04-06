import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {
  Button,
  TextInput
} from 'react-native-paper';
import {
  TextField
} from 'react-native-material-textfield';


// import {
//   getSavedBillingID
// } from '../../lib/donate';
// import { okAlert } from '../../lib/alerts';

import strings from '../../res/strings';
import colors from '../../styles/colors';

class AmountComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText: '',
    }
  }

  // async componentDidMount() {
  //   let billingID = await getSavedBillingID();
  //   if (billingID != null ) {
  //     this._setStateAsync({ savedCC: true, loading: false });
  //   }
  //   else {
  //     this._setStateAsync({ loading: false })
  //   }
  // }

  // _setStateAsync = (state) => {
  //   return new Promise((resolve) => {
  //     this.setState(state, resolve)
  //   });
  // }

  renderMoneyButton(val) {
    const renderVal = '$' + val;
    return (
      <View style={{ flex: 1}}>
        <Button
          style={styles.moneyButton}
          mode='outlined'
          compact={true}
          onPress={_ => this.props.handleChange('amount', val)}
        >
          <Text>{renderVal}</Text>
        </Button>
      </View>
    )
  }

  // invariant that this.props.amount is always a numeric value
  renderMoneyValue() {
    if (this.props.amount == '') {
      return;
    } else {
      return '$' + this.props.amount;
    }
  }

  renderErrorText = (val) => {
    if (!val.match(/^\$?\d+(\.\d{0,2})?$/)) {
      if (this.state.errorText == '') {
        this.setState({
          errorText: 'Invalid amount. Please use only numbers, $ and at most one "."'
        });
      }
      console.log("here")
    } else {
      if (this.state.errorText != '') {
        this.setState({
          errorText: ''
        });
      }
      console.log("there")
    }
  }

  render() {
    return (
      <View style={ this.props.styles.container }>
        <Text
          style={{ fontWeight: 'bold', fontSize: 20, color: colors.textHeader }}
        >
          {strings.donations.donationHeader}
        </Text>
        <Text>{strings.donations.donationBody}</Text>
        <TextField
          label='Amount'
          value={this.renderMoneyValue()}
          error={this.state.errorText}
          keyboardType='numeric'
          returnKeyType='done'
          onChangeText={(val) => {
            console.log(val)
            if (val[0] == '$') {
              this.props.handleChange('amount', val.substr(1))
            } else {
              this.props.handleChange('amount', val)
            }
            this.renderErrorText(val)
          }}
        />
        <View style={styles.buttonRow}>
          {this.renderMoneyButton(10)}
          {this.renderMoneyButton(100)}
          {this.renderMoneyButton(250)}
        </View>
        <View style={styles.buttonRow}>
          {this.renderMoneyButton(500)}
          {this.renderMoneyButton(1000)}
          {this.renderMoneyButton(2500)}
        </View>
        <Button
          style={this.props.amount == '' ? this.props.styles.disabledDonationButton : this.props.styles.donationButton}
          contentStyle={this.props.styles.donationButtonContent}
          onPress={_ => this.props.changePage(1)}
          disabled={this.props.amount == ''}
        >
          <Text style={this.props.styles.donationButtonText}>
            Continue
          </Text>
        </Button>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20
  },
  moneyButton: {
    marginLeft: 3,
    marginRight: 3,
  }
});
export default AmountComponent;
