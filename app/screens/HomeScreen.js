import React from 'react';
import { Button, Text, View} from 'react-native';


class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
          <Text>Hi FSF!</Text>
          <Button
            onPress={() => this.props.navigation.push('Login')}
            title='Login!'
            />
            <Button
              onPress={() => this.props.navigation.push('Messages')}
              title='Messages'
              />

      </View>
    );
  }
}
export default HomeScreen;
