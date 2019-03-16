import React from 'react';
import { Button, Text, View} from 'react-native';
import { StackActions, NavigationActions } from "react-navigation";
import BaseScreen from '../BaseScreen'

class DonateSuccessScreen extends BaseScreen {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    headerVisible: false
  };

  _toHome = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'DonateHome' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate("NewsHome");
  };

  render() {
    const { navigation } = this.props;
    const amount = navigation.getParam("amount", "no-amount");
    const name = navigation.getParam("cardholder", "no-name");
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text
          style={{ fontWeight: "bold", fontSize: 20, color: "#64696B" }}
        >
          Thank you {name} for your generous donation of ${amount}!
        </Text>

        <Button
          onPress={this._toHome}
          title="close"
        />
      </View>
    );
  }
}
export default DonateSuccessScreen;
