import React from 'react';
import {
  View,
  WebView,
} from 'react-native';

import BaseScreen from '../BaseScreen'


class LoginScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: 'https://my.fsf.org/join' }}
          style={styles.webView}
          startInLoadingState
          scalesPageToFit={true}
        />
      </View>
    );
  }

}

export default RegisterScreen;
