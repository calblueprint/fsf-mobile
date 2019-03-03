import React from 'react';
import { Button, Text, View, AsyncStorage, Alert} from 'react-native';
import BaseScreen from '../BaseScreen'
import { okAlert } from '../../lib/alerts'

class VersionScreen extends ProfileScreen {

 render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
          <Text>  Version 0.4.0  </Text>  

          <Button
            onPress={() => this.props.navigation.navigate('Profile')}
            title='Back to Profile'/>        
      </View>
    );
  }

}