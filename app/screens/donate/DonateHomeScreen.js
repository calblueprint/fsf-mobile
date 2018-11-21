import React from 'react';
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'
import { TextInput } from 'react-native-gesture-handler';

class DonateHomeScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = { amount: 20 };
  }

  static navigationOptions = {
    headerVisible: false,
  };

  _changeAmount = textAmount => {
    let newAmount = parseInt(textAmount.slice(1));
    this.setState({ amount: newAmount });
  };

  render() {

    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>Support the Free Software Foundation</Text>
        <Text>Copy 1</Text>
        <Text>Copy 2</Text>
        <TextInput
          style={{ fontSize: 20 }}
          onChangeText={amount =>
            this.setState({ amount: parseInt(amount.slice(1)) })
          }
          value={"$" + this.state.amount.toString()}
        />

        <Button
          onPress={() => this._switchTab(this, "DonateBilling", this.state)}
          title="start"
        />
      </View>
    );
  }
}
export default DonateHomeScreen;
