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
  getSavedBillingID
} from '../../lib/donate';
import { okAlert } from '../../lib/alerts';
import strings from '../../res/strings';
import colors from '../../styles/colors';

class AmountComponent extends React.Component {
  constructor(props) {
    super(props);
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

  // _changeAmount = textAmount => {
  //   let newAmount = parseInt(textAmount.slice(1));
  //   if (isNaN(newAmount)) {
  //     newAmount = 0;
  //   }
  //   this.setState({ amount: newAmount });
  // };

  // _goToNext = (repeatable) =>
  // {
  //   if (repeatable) {
  //     console.log(repeatable);
  //     this._switchTab(this, 'DonateRepeatable', this.state);
  //   } else {
  //     this._switchTab(this, 'DonateBilling', this.state);
  //   }
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
  renderMoneyValue() {
    if (this.props.props.amount == '') {
      return;
    } else {
      return '$' + this.props.props.amount;
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
        <TextInput
          style={{backgroundColor: colors.backgroundWhite}}
          label='Amount'
          value={this.renderMoneyValue()}
          keyboardType='numeric'
          returnKeyType='done'
          onChangeText={(val) => {
            if (val[0] == '$') {
              this.props.handleChange('amount', val.substr(1))
            } else {
              this.props.handleChange('amount', val)
            }
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
          style={this.props.styles.donationButton}
          contentStyle={this.props.styles.donationButtonContent}
          onPress={_ => this.props.changePage(1)}
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
