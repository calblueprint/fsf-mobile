import React, {Component} from 'react';
import {WebView} from 'react-native';
import BaseScreen from '../BaseScreen'

class RegisterWebScreen extends BaseScreen {
    render() {
        return (
          <WebView
            source={{uri: 'https://my.fsf.org/join'}}
            injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
          />
        );
      }
};

export default RegisterWebScreen;
