import React from 'react';
import { Button, Text, View} from 'react-native';
import BaseScreen from '../BaseScreen'


class ActionScreen extends BaseScreen {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flex: .5, justifyContent: 'flex-end'}}>
          <Text>Coming Soon!</Text>
        </View>
      </View>
    );
  }
}
export default ActionScreen;
