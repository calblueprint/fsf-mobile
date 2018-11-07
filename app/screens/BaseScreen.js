import React from 'react';
import { Button, Text, View} from 'react-native';

class BaseScreen extends React.Component {

  // Navigation Helpers
  _switchTab(screen, route) {
    screen.props.navigation.navigate(route)
  }
}
export default BaseScreen;
