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
import { getRequest } from '../../lib/requests';

// Make sure to add your new screen to /config/navigation.js
class NewsDetailScreen extends BaseScreen {
  constructor(props) {
    super(props);
    const errorOutput = {
      "title": "Loading",
      "content": "Please wait while we fetch your article",
      "pub_date": ""
    };
    const { params } = this.props.navigation.state;
    this.state = {
      refreshing: params.articleParams === undefined,
      articleParams: params.articleParams ? params.articleParams : errorOutput
    };
    if (this.state.refreshing) {
      global.disableSplash = true;
    };
    this._fetchArticle = this._fetchArticle.bind(this);
  }
  
  componentDidMount() {
    if (this.state.refreshing) {
      const { params } = this.props.navigation.state;
      this._fetchArticle(params.id);
    }
  }

  render() {
    // Originally .substring(0, 10) for date, removed because of error
    articleParamsOb = this.state.articleParams;
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
              {articleParamsOb.pub_date} 
            </Text>
            <HTML html={articleParamsOb.content} {...additionalProps} />
          </View>
        </ScrollView>
      </View>
    );
  }

  async _fetchArticle(id) {
    const URL = '/api/v1/articles/' + id;
    await getRequest(
      URL,
      res => {
        this.setState({ articleParams: res.data})
      },
      error => console.log(error)
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
