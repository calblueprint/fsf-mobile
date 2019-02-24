import React from 'react';
import { Button, Text, View, AsyncStorage, Alert} from 'react-native';
import BaseScreen from '../BaseScreen'
import { okAlert } from '../../lib/alerts'
import UserInfoCard from '../../components/UserInfoCard';
import {getStoredUserInfo} from '../../lib/login';

class ProfileScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._fetchUserInfo();
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
          <Text>Hi FSF! This is a profile</Text>
          {this.state.userInfo != null ? <UserInfoCard userInfo={this.state.userInfo}></UserInfoCard> : null}
          <Button
            onPress={() => this._signOutAsync()}
            title='Sign Out'
            />
      </View>
    );
  }

  _signOutAsync = async () => {
    okAlert('Logged Out', '')
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  _fetchUserInfo = async () => {
    //todo add specific user handling
    console.log("fetching");
    let userInfo = await getStoredUserInfo();
    this.setState({ userInfo: userInfo});
    console.log(userInfo)
  }

}
export default ProfileScreen;
