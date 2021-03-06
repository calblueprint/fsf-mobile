import React from 'react';
import {
  Text,
  View,
  AsyncStorage,
  Alert,
  StyleSheet
} from 'react-native';
import {
  Button,
} from 'react-native-paper';

import BaseScreen from '../BaseScreen'
import {
  okAlert
} from '../../lib/alerts'
import {
  getStoredId,
  guestLogOut,
  userLogOut,
  getStoredUserInfo,
} from '../../lib/login';
import colors from '../../styles/colors'
class ProfileScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = {
      componentDidMount: false,
      loggedIn: false,
      result: null,
    };
  }

  render() {
    if (!this.state.componentDidMount) {
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View>
          {this.state.loggedIn ? (
            <View>
              {this.state.userInfo != null ? 
                      <View style={styles.userInfoContainer}>
                      <Text style={styles.textBold}>
                          {this.state.userInfo.first_name.substring(0, 100)}
                        </Text>
                        <Text style={styles.textRegular}>
                          {this.state.userInfo.email.substring(0, 100)}
                        </Text>
                        <Text style={styles.textRegular}>
                          {this.state.userInfo.contact_type.substring(0, 100)}
                        </Text>
                    </View> 
                    : null}
              <View style={styles.pushNotificationContainer}>
              <Text style={styles.pushNotificationText}>Push Notifications</Text>
              </View>
              <View style={styles.buttonContainer}>
                  <Button
                    style={styles.actionButton}
                    mode='outlined'
                    compact={true}
                    onPress={this._Policy}
                    >
                    <Text style={styles.textButton}>Privacy Policy</Text>
                  </Button>
                  <Button
                    style={styles.actionButton}
                    mode='outlined'
                    compact={true}
                    onPress={this._Version}
                    >
                    <Text style={styles.textButton}>Version </Text>
                  </Button>
                  <Button
                    style={styles.actionButton}
                    mode='outlined'
                    compact={true}
                    onPress={this._signOutAsync}
                    >
                    <Text style={styles.textButton}>Sign out</Text>
                  </Button>
              </View>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <Text style={styles.textBold}>Sign In or Sign Up to view your profile!</Text>
              <Button
                    style={styles.actionButton}
                    mode='outlined'
                    compact={true}
                    onPress={this._navigateLogin}
                    >
                    <Text style={styles.textButton}>Sign in</Text>
                  </Button>
                  <Button
                    style={styles.actionButton}
                    mode='outlined'
                    compact={true}
                    onPress={this._handleRegister}
                    >
                    <Text style={styles.textButton}>Join FSF </Text>
                  </Button>
              <Button
                style={styles.actionButton}
                mode='outlined'
                compact={true}
                onPress={this._Policy}
                >
                <Text style={styles.textButton}>Privacy Policy</Text>
              </Button>
                <Button
                  style={styles.actionButton}
                  mode='outlined'
                  compact={true}
                  onPress={this._Version}
                  >
                  <Text style={styles.textButton}>Version </Text>
              </Button>
            </View>
          )}
        </View>
      )
    }
  }

  componentDidMount() {
    this._fetchUserInfo();
    getStoredId().then(_ => {
        this.setState({
          loggedIn: true,
          componentDidMount: true,
        });
      }
    ).catch(_ => {
      this.setState({
        loggedIn: false,
        componentDidMount: true,
      });
    });
  }

  _signOutAsync = async () => {
    okAlert('Logged Out', '');
    try {
      await userLogOut();
    } catch(error) {
      console.log("signOutAsync failed");
      console.log(error);
    }
    this.props.navigation.navigate('Auth');
  };

  _handleRegister = async () => {
    this.props.navigation.navigate('Register');
  };

  _navigateLogin = async() => {
    try {
      await guestLogOut();
    } catch(error) {
      console.log("guest logout failed");
      console.log(error);
    }
    this.props.navigation.navigate('Auth');
    
  };

  _Policy = async () => {
    this.props.navigation.navigate('Privacy');
  };

  _Version = async () => {
    this.props.navigation.navigate('Version');
  };

  _fetchUserInfo = async () => {
    //todo add specific user handling
    console.log("fetching");
    let userInfo;
    try {
      let userInfo = await getStoredUserInfo();
      this.setState({ userInfo: userInfo});
      console.log(userInfo)  
    } catch (error) {
      this.setState({ userInfo: null});
      console.log("error getting user info")  
    }
   
  }

}

const styles = StyleSheet.create({
  textBold: {
    backgroundColor: colors.backgroundWhite,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 36,
    color: colors.textBlack
  }, pushNotificationText: {
    backgroundColor: colors.backgroundWhite,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 36,
    color: colors.textBlack,
    marginLeft: 10
  }, textRegular: {
    backgroundColor: colors.backgroundWhite,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 28,
    color: colors.textBlack
  }, textButton: {
    fontSize: 14,
    color: colors.textGrey
  }
  , userInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginLeft:10,
    marginTop:10,
    height: 150,
    flexDirection: 'column',
  }, pushNotificationContainer: {
    height: 100,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderTopWidth: 1,
    flexDirection: 'column',
    justifyContent : 'center',
    alignSelf: 'stretch'
  }, buttonContainer: {
    height: 300,
    flexDirection: 'column',
    justifyContent : 'space-evenly',
    alignSelf: 'stretch',
    alignItems: 'center'
  }, actionButton: {
    marginLeft:3,
    marginRight: 3,
    width: 150,
  }
});

export default ProfileScreen;
