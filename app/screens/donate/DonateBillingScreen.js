import colors from '../../styles/colors'

import React from 'react';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import {
  StyleSheet,
  Text,
  View} from 'react-native';
import {
  Button,
  TextInput
} from 'react-native-paper';
import BaseScreen from '../BaseScreen';

class DonateBillingScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      country: "",
      stateProvince: "",
      postalCode: 0,
    };
  }

  static navigationOptions = {
    title: "Billing Info"
  };

  //TODO: make this part of lib?
  _handleChange = (name, value) => {
    //TODO: add validations here, use switch statement on name
    this.setState({ [name]: value });
  };

  _onPress = () => {
    //TODO figure out propTypes checking with this
    let mergedNavProps = {
      ...this.state,
      ...this.props.navigation.state.params };
    console.log(mergedNavProps);
    this._switchTab(this, "DonatePayment", mergedNavProps)
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
        <View id="progress_bar" />
        <View style={styles.addressContainer}>
          <TextInput
            style={styles.textInput}
            label='Address'
            onChangeText={text => this.setState({ address: text })}
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.shortText}>
              <TextInput
                style={styles.textInput}
                label='City'
                onChangeText={text => this.setState({ city: text })}
              />
            </View>
            <View style={styles.shortText}>
              <TextInput
                style={styles.textInput}
                label='Country'
                onChangeText={text => this.setState({ country: text })}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.shortText}>
              <TextInput
                style={styles.textInput}
                label='State/Provenance'
                onChangeText={text => this.setState({ stateProvince: text })}
              />
            </View>
            <View style={styles.shortText}>
              <TextInput
                style={styles.textInput}
                label='Postal Code'
                onChangeText={text => this.setState({ postalCode: text })}
              />
            </View>
          </View>

          <Button
            style={styles.continueButton}
            contentStyle={{ height: 50 }}
            onPress={this._onPress}
          >
            <Text style={styles.buttonText}>
              Continue
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.backgroundWhite,
    marginLeft: 5,
    marginRight: 5,
  },
  addressContainer: {
    flex: 1
  },
  shortText: {
    flex: .5,
  },
  continueButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.buttonGrey,
  },
  buttonText: {
    color: colors.textLight,
    fontSize: 18
  }
});

export default DonateBillingScreen;
