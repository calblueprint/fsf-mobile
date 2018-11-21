import React from 'react';
import { Button, Text, View} from 'react-native';

class BaseScreen extends React.Component {

  // Navigation Helpers
  _switchTab(screen, route, params) {
    if (params) {
      screen.props.navigation.navigate(route, params)
    } else {
      screen.props.navigation.navigate(route)
    }
  }
}
export default BaseScreen;
