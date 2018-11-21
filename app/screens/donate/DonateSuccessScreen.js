import React from 'react';
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'

class DonateSuccessScreen extends BaseScreen {
  constructor(props) {
    super(props);
    
    //TODO delete this
    console.log(this.props.navigation.state.params);
  }

  static navigationOptions = {
    headerVisible: false
  };

  render() {
    const { navigation } = this.props;
    let name = "Kevin"; // TODO generalize later
    const amount = navigation.getParam("amount", "no-amount");
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>Thank you {name} for your generous donation of ${amount}! </Text>

        <Button
          onPress={() => this.props.navigation.navigate('NewsHome')}
          title="close"
        />
      </View>
    );
  }
}
export default DonateSuccessScreen;
