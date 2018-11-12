import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import BaseScreen from '../BaseScreen'

// Make sure to add your new screen to /config/navigation.js
class TemplateScreen extends BaseScreen {

  render() {
    return (
      <View style={styles.container}>
          <Text>Woo! Yay for new screens!</Text>
          <Button
            onPress={() => this._myFunction("Hello!")}
            title='Press Me!'
            />
      </View>
    );
  }

  _myFunction(a) {
    console.log(a)
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 180,
    alignSelf: 'stretch'
  }
});

export default TemplateScreen;
