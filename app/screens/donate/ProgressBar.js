import React from 'react';
import { Button, Text, View } from 'react-native';

class ProgressBar extends React.Component {
    render() {
        let amount = this.props.amount;
        let billing = this.props.billing;
        let payment = this.props.payment;

        return (
            <View style={{ flexDirection: 'row' }}> 
                <Text> {amount} Amount </Text>
                <Text> {billing} Billing </Text>
                <Text> {payment} Payment </Text>
            </View>
        )
    }
}
export default ProgressBar;
