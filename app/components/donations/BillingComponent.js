import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Button,
  TextInput
} from 'react-native-paper';

import colors from '../../styles/colors';


class BillingComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ this.props.styles.container } >
        <TextInput
          style={styles.textInput}
          label='Address'
          value={this.props.props.address}
          onChangeText={text => this.props.handleChange('address', text)}
        />
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.shortText}>
            <TextInput
              style={styles.textInput}
              label='City'
              value={this.props.props.city}
              onChangeText={text => this.props.handleChange('city', text)}
            />
          </View>
          <View style={styles.shortText}>
            <TextInput
              style={styles.textInput}
              label='Country'
              value={this.props.props.country}
              onChangeText={text => this.props.handleChange('country', text)}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.shortText}>
            <TextInput
              style={styles.textInput}
              label='State/Provenance'
              value={this.props.props.stateProv}
              onChangeText={text => this.props.handleChange('stateProv', text)}
            />
          </View>
          <View style={styles.shortText}>
            <TextInput
              style={styles.textInput}
              label='Postal Code'
              value={this.props.props.postalCode}
              onChangeText={text => this.props.handleChange('postalCode', text)}
            />
          </View>
        </View>
        <Button
          style={this.props.styles.donationButton}
          contentStyle={this.props.styles.donationButtonContent}
          onPress={_ => this.props.changePage(2)}
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
  textInput: {
    backgroundColor: colors.backgroundWhite,
    marginLeft: 5,
    marginRight: 5,
  },
  shortText: {
    flex: .5,
  },
});

export default BillingComponent;
