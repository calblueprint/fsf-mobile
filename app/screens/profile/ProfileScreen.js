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
import { testNotify, testDeepLink, notify, testNotifyFromDb } from '../../lib/notifications'
import {getRequest} from '../../lib/requests'
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
      debuggingErrors: "default"
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
                    // onPress={() => testNotify("Test Notification")}
                    onPress={() => this.testNotification()}
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
                    onPress={() => this.testNotification()}
                    >
                    <Text style={styles.textButton}>Test Notification</Text>
                  </Button>
                  <Button
                      style={styles.actionButton}
                      mode='outlined'
                      compact={true}
                      onPress={() => testDeepLink("Test Deep Link")}
                      >
                      <Text style={styles.textButton}>Test Deep Link</Text>
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
                  <Text>{this.state.debuggingErrors}</Text>
                  
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
      status = true
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

  // _fetchMessage = async () => {
  //   console.log("fetching message");
  //   let message;
  //   try {
  //     await getRequest(
  //       '/api/v1/messages',
  //       res => {
  //         const actionList = res.data.map(message => ({
  //           key: message.id.toString(),
  //           value: message
  //         }));
  //       },
  //       error => console.log(error)
  //     );


  //     // let message = await getStoredUserInfo();
  //   } catch (error) {
  //     console.log("error getting user info")  
  //   }
   
  // }

  testNotification = async () => {
    await this._fetchMessage();
    
    // testNotify("Test Notification")
    // okAlert("debug", message)
    // notify(message.title, "tony", "fsf://fsf/profile", 34)
  }

  // expects 1 message for now
  async _fetchMessage() {
    this.setState({debuggingErrors: "im calling"})
    // let host = networkSettings.URL;
    // this.setState({debuggingErrors: "Sending " + type + " request to host: " + host + " at route: " + route})
    // console.log(
    //   "Sending " + type + " request to host: " + host + " at route: " + route
    // );

    
    // fetch("https://api.kanye.rest", {
      fetch("http://localhost:3000", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
    }).then((response) => { 
      if (response.ok) {
        return response.json().then(function(object) {
          // successful request etc
          this.setState({debuggingErrors: "success" + JSON.stringify(object)})
        });
      } else {
        return response.json().then(function(error) {
          // successful request but error response
          this.setState({debuggingErrors: "error response" + JSON.stringify(error)})
        });
      }
    }).catch((error) => { 
        // failed request. 
        this.setState({debuggingErrors: "error in request" + JSON.stringify(error)})
    }); 

    // return fetch(`${host}${route}`, requestData).then(function(response) {
    //   if (response.ok) {
    //     return response.json().then(function(object) {
    //       return successFunc(object);
    //     });
    //   } else {
    //     return response.json().then(function(error) {
    //       return errorFunc(error);
    //     });
    //   }
    // });


    // await getRequest(
    //   // '/api/v1/latestMessage',
    //   '/',
    //   res => {
    //     console.log(res.data)
    //     this.setState({debuggingErrors: "works:" + JSON.stringify(res)})
    //     // const message = res.data.map(action => ({
    //     //   key: action.id.toString(),
    //     //   value: action
    //     // }));
    //     // notify("hello", "tony", "fsf://fsf/profile", 34)
    //     // this.setState({ actions: actionList, refreshing: false });
    //   },
    //   error => {
    //     this.setState({debuggingErrors: "error" + JSON.stringify(error) }); 
    //     console.log(error);
    //   });
  }

  // async _fetchArticles(refresh = false) {
  //   await getRequest(
  //     '/api/v1/petitions',
  //     res => {
  //       const actionList = res.data.map(action => ({
  //         key: action.id.toString(),
  //         value: action
  //       }));
  //       this.setState({ actions: actionList, refreshing: false });
  //     },
  //     error => console.log(error)
  //   );
  // }
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
