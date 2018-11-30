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
    let name = "Kevin"; // TODO generalize later
    const amount = navigation.getParam("amount", "no-amount");
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>Thank you {name} for your generous donation of ${amount}! </Text>

        <Button
          onPress={this._toHome}
          title="close"
        />
      </View>
    );
  }
}
export default DonateSuccessScreen;
