import React from 'react';
import { Button, Text, View, AsyncStorage, Alert} from 'react-native';
import BaseScreen from '../BaseScreen'

class ProfileScreen extends BaseScreen {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
          <Text>Hi FSF! This is a profile</Text>
          <Button
            onPress={() => this._signOutAsync()}
            title='Sign Out'
            />
      </View>
    );
  }

  _signOutAsync = async () => {
    Alert.alert(
      'Logged Out',
      '',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
}
export default ProfileScreen;
