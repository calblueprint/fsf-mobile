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
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.article}>
            <Text style={styles.title}>{articleParamsOb.titie}</Text>
            <Text style={styles.date}>{articleParamsOb.pub_date}</Text>

            <HTML html={articleParamsOb.content} {...additionalProps} />
          </View>
          <Text style={styles.title}>{articleParamsOb.titie}</Text>
          <Text>{articleParamsOb.pub_date}</Text>

          <HTML html={articleParamsOb.content} {...additionalProps} />
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
