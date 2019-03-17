import React from 'react';

class BaseScreen extends React.Component {

  // Navigation Helpers
  _switchTab(screen, route, params) {
    if (params) {
      screen.props.navigation.navigate(route, params)
    } else {
      screen.props.navigation.navigate(route)
    }
  }
  // Any code useful across all screens should live here!

}
export default BaseScreen;
