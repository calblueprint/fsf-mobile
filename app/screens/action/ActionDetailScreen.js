import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Linking
} from 'react-native';
import BaseScreen from '../BaseScreen';
import HTML from 'react-native-render-html';

// Make sure to add your new screen to /config/navigation.js
class ActionDetailScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { params } = this.props.navigation.state;
    const actionParams = params ? params.actionParams : null;
    const actionParamsOb = JSON.parse(actionParams);
    const additionalProps = {
      onLinkPress: (evt, href) => {
        Linking.openURL(href);
      },
      baseFontStyle: {
        fontSize: 18
      },
      imagesInitialDimensions: {
        width: Dimensions.get('window').width - 50,
        height: 200
      }
    };
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.action}>
            <Text style={styles.title}>{actionParamsOb.title}</Text>
            <Text style={styles.description}>{actionParamsOb.description}</Text>
            <HTML html={actionParamsOb.link} {...additionalProps} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  action: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    marginTop: 10,
    textAlign: 'left',
    fontSize: 24,
    fontWeight: 'bold'
  },
  description: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 10,
    marginBottom: 25
  }
});
export default ActionDetailScreen;
