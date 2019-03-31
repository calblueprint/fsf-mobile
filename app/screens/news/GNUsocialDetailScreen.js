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
class GNUsocialDetailScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { params } = this.props.navigation.state;
    const noticeParams = params ? params.noticeParams : null;
    const noticeParamsOb = JSON.parse(noticeParams);
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
          <View style={styles.article}>
            <Text style={styles.title}>{noticeParamsOb.gs_user_name}</Text>
            <Text style={styles.date}>
              {noticeParamsOb.published.substring(0, 10)}
            </Text>
            <HTML html={noticeParamsOb.content_html} {...additionalProps} />
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
  article: {
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
  lead: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 10,
    marginBottom: 25
  },
  date: {
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 10,
    marginBottom: 10
  }
});
export default GNUsocialDetailScreen;
