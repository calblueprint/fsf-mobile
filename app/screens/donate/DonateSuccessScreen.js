import React from 'react';
import { Button, Text, View, Image, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from "react-navigation";
import BaseScreen from '../BaseScreen'
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../styles/colors'

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

  // render() {
  //   const { navigation } = this.props;
  //   const amount = navigation.getParam("amount", "no-amount");
  //   const name = navigation.getParam("cardholder", "no-name");
  //   return (
  //     // Try setting `flexDirection` to `column`.
  //     <View style={{flex: 1, alignItems: "center"}}>
  //       <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
  //       <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
  //       <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
  //     </View>
  //   );
  // }

  render() {
    const { navigation } = this.props;
    const amount = navigation.getParam("amount", "0");
    const name = navigation.getParam("cardholder", "person");
    // Original text color #64696B
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ width: '85%', fontWeight: "bold", fontSize: 24, marginTop: 15, marginBottom: 24, textAlign: "center" }} >  
            Thank you {name} for your generous donation of ${amount}!
          </Text>
          <Image source={require('../../assets/campaign.png')} />
          <Text style={{width: '85%', fontSize: 16, marginTop: 24, marginBottom: 8, lineHeight: 20}} >
            Your generous gift will help us continue promoting, protecting, and developing free software. 
          </Text>
          <Text style={{width: '85%', fontSize: 16, marginTop: 8, marginBottom: 4, lineHeight: 20}} >
          Without members like you, we could not effectively protect and enforce the GNU General Public 
          License and actively maintain programs like the GNU Project and the Defective by Design campaign.
          </Text>
          <Button type="outline"
            style={{marginTop: 30, backgroundColor: colors.buttonGrey}}
            contentStyle={styles.loginContent}
            mode='outlined'
            onPress={this._toHome}
            title="CLOSE"
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.backgroundWhite,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logoContainer: {
    height: 277,
    backgroundColor: colors.logoGrey,
    alignItems: 'center'
  },
  loginContainer: {
    marginTop: 40,
    marginRight: 40,
    marginLeft: 40,
  },
  loginButton: {
    marginTop: 30,
    backgroundColor: colors.buttonGrey,
  },
  loginContent: {
    height: 50,
  }
});
export default DonateSuccessScreen;
