import React from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Dimensions,
  Linking
} from 'react-native';
import HTML from 'react-native-render-html';
import BaseScreen from '../BaseScreen';

// Make sure to add your new screen to /config/navigation.js
class NewsDetailScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { params } = this.props.navigation.state;
    const articleParams = params ? params.articleParams : null;
    const articleParamsOb = JSON.parse(articleParams);
    const additionalProps = {
      onLinkPress: (evt, href) => {
        Linking.openURL(href);
      },
      baseFontStyle: {
        fontSize: 18
      },
      imagesInitialDimensions: { width: 300, height: 200 }
    };
    return (
      <ScrollView style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
        <Text style={styles.title}>{articleParamsOb.titie}</Text>
        <Text>{articleParamsOb.pub_date}</Text>

        <HTML html={articleParamsOb.content} {...additionalProps} />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginRight: 40,
    marginLeft: 40,
    alignSelf: 'center',
    borderRadius: 10
  },
  listContainer: {
    width: '100%'
  },
  title: {
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
export default NewsDetailScreen;
