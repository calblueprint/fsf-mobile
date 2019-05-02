import React from 'react';
import {
  Text,
  View,
  AsyncStorage,
  ToastAndroid,
  StyleSheet
} from 'react-native';
import {
  Button,
} from 'react-native-paper';

import BaseScreen from '../BaseScreen'
import {
  okAlert
} from '../../lib/alerts'
import { testNotify, notify } from '../../lib/notifications'
import { getRequest } from '../../lib/requests'
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
      debug: "DEFAULT"
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
              <View style={styles.buttonContainer}>
                <View>
                  <Button
                    style={styles.actionButton}
                    mode='outlined'
                    compact={true}
                    onPress={() => this._toggleNotifications()}
                    >
                    <Text style={styles.textButton}>Toggle Notifications</Text>
                    </Button>
                  <Button
                    style={styles.actionButton}
                    mode='outlined'
                    compact={true}
                    onPress={() => testNotify("Test Notification")}
                    >
                    <Text style={styles.textButton}>Test Notification</Text>
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
          </View>
          ) : (
            <View style={styles.buttonContainer}>
              <Text style={styles.textBold}>Sign In or Sign Up to view your profile!</Text>
                  <Button
                    style={styles.actionButton}
                    mode='outlined'
                    compact={true}
                    onPress={() => this._toggleNotifications()}
                    >
                    <Text style={styles.textButton}>Toggle Notifications</Text>
                  </Button>
                  <Button
                    style={styles.actionButton}
                    mode='outlined'
                    compact={true}
                    // onPress={() => testNotify("Test Notification")}
                    onPress={() => this._getLatestMessage()}
                    >
                    <Text style={styles.textButton}>Test Notification</Text>
                  </Button>
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
                  <Text>Status: {this.state.debug}</Text>
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
    }
    );
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

  _toggleNotifications = async () => {
    let status = await AsyncStorage.getItem('notificationsOn')
    if (status == null) {
      status = "true"
    }
    status = !JSON.parse(status) // Flip the value of status
    if(status) {
      ToastAndroid.show("Turned Notifications On", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Turned Notifications Off", ToastAndroid.SHORT);
    }
    await AsyncStorage.setItem('notificationsOn', JSON.stringify(status))
  }

  _Policy = async () => {
    this.props.navigation.navigate('Privacy');
  };

  _Version = async () => {
    this.props.navigation.navigate('Version');
  };

  _fetchUserInfo = async () => {
    // TODO: add specific user handling
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

  // ALL CODE BELOW FOR TESTING NOTIFICATIONS ONLY
  _getLatestMessage = async () => {
    var latestMessageTime = await AsyncStorage.getItem('latestMessageTime')
    latestMessageTime = JSON.stringify(new Date("2018-04-23T19:30:51.010Z")); // TODO: change hardcoded values
    await this.backgroundTask(latestMessageTime); // TODO: take note!!!! this.<something>
  }

  // expect: time input AS STRING
  async backgroundTask(latestMessageTime) {
    let shouldNotify = await AsyncStorage.getItem('notificationsOn');
    // if this has never been set before...
    if (shouldNotify == null) {
      // ...set it to be on by default
      this.setState({ debug: "shouldNotify was null" });  // TODO: ALL THE SET STATE STUFF
      shouldNotify = "true";
      await AsyncStorage.setItem('notificationsOn', true);
    }  
    
    if (JSON.parse(shouldNotify)) {
      this.setState({ debug: "shouldNotify was true" });  // TODO: ALL THE SET STATE STUFF
      const route = '/api/v1/latestMessages?last_sent=' + latestMessageTime;
      // await getLatestMessage(latestMessageTime);
      await getRequest(
        route,
        async res => {
          await this.processMessages(res.data); // TODO: take note!!!! this.<something>
          await AsyncStorage.setItem('latestMessageTime', JSON.stringify(new Date()));
        },
        error => {
          console.log('Request for messages failed');
          console.log(error);
          // BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED);   // TODO: UNCOMMENT
        });
      }
      else {
        this.setState({ debug: "shouldNotify was FALSE" });  // TODO: ALL THE SET STATE STUFF
      }
  }

  // expect: input as res.data
  async processMessages(data) {
    try {
      data.forEach(message => {
        notify(message.title, message.content, message.link, message.id);
      });
      // BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA); // TODO: UNCOMMENT
    } catch (error) {
      console.log('Error saving Message Data.\nData:');
      console.log(newMessages);
      console.log('\n\nError:');
      console.log(error);
      // BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED); // TODO: UNCOMMENT
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
