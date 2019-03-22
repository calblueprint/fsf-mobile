import React from 'react';
import { Button, Text, View, Image } from 'react-native';
import { StackActions, NavigationActions } from "react-navigation";
import BaseScreen from '../BaseScreen'
import { ScrollView } from 'react-native-gesture-handler';

class DonateSuccessScreen extends BaseScreen {
  constructor(props) {
    super(props);
  }

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
    const amount = navigation.getParam("amount", "0");
    const name = navigation.getParam("cardholder", "person");
    // Original text color #64696B
    return (
      
      <ScrollView>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ width: '85%', fontWeight: "bold", fontSize: 24, marginTop: 50, marginBottom: 24, textAlign: "center" }} >  
            Thank you {name} for your generous donation of ${amount}!
          </Text>
          <Image source={require('../../assets/campaign.png')} />
          <Text style={{width: '85%', fontSize: 16, marginTop: 24, marginBottom: 8, lineHeight: 20}} >
            Your generous gift will help us continue promoting, protecting, and developing free software. 
          </Text>
          <Text style={{width: '85%', fontSize: 16, marginTop: 8, marginBottom: 8, lineHeight: 20}} >
          Without members like you, we could not effectively protect and enforce the GNU General Public 
          License and actively maintain programs like the GNU Project and the Defective by Design campaign.
          </Text>

          <View style={{width: 145, height: 45, marginTop: 20, borderWidth: 2, borderColor: "#757575", borderRadius: 2}}>
            <Button
              onPress={this._toHome}
              width="145"
              height="45"
              title="CLOSE"
              color="#757575"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default DonateSuccessScreen;
