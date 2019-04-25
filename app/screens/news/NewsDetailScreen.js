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
class NewsDetailScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const { params } = this.props.navigation.state;
    const errorOutput = JSON.stringify({
      "title": "Error!",
      "content": "There was an error loading your request",
      "pub_date": "----------"
    });
    // params = {
    //   "articleParams": JSON.stringify(errorOutput)
    // }
    
    // TODO: error params always returns true, errorOutput is never called
    const articleParams = params ? params.articleParams : errorOutput;
    const articleParamsOb = JSON.parse(articleParams);
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
            <Text style={styles.title}>{articleParamsOb.title}</Text>
            <Text style={styles.date}>
              {articleParamsOb.pub_date.substring(0, 10)}
            </Text>
            <HTML html={articleParamsOb.content} {...additionalProps} />
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
export default NewsDetailScreen;
