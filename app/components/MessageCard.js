import React from 'react';
import { Button, Text, TouchableHighlight, View } from 'react-native';
import { APIRoutes } from './../lib/routes';
import { textStyles } from '../styles/textStyles';

/**
 * @prop message
 * @prop onSelectMessage - callback function
 */
class MessageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onSelectMessage(this.props.message.id)}
      underlayColor='transparent'>
        <View style={globalStyles.outerContainer}>
          <View style={globalStyles.topContainer}>
            <Text style={[globalStyles.title, textStyles.bodySmall]}>{this.props.message.content}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default MessageCard;
