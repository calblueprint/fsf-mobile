import React from 'react';
import { Button, Text, TouchableHighlight, View } from 'react-native';
import { APIRoutes } from './../lib/routes';
import { cardStyles } from './styles';
import { textStyles } from '../styles/textStyles';
// import colors from '../../styles/colors';

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
        <View style={cardStyles.outerContainer}>
          <View style={cardStyles.topContainer}>
            <Text style={[cardStyles.title, textStyles.bodySmall]}>{this.props.message.content}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default MessageCard;
