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
    // if (!props.navigation.state.params.articleParams) {

    // }

    const errorOutput = JSON.stringify({
      "title": "Loading",
      "content": "Please wait while we fetch your article",
      "pub_date": ""
    });
    const { params } = this.props.navigation.state;
    this.state = {
      refreshing: params.articleParams === undefined,
      articleParams: params.articleParams ? params.articleParams : errorOutput
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
    
    // const articleParams = params ? params.articleParams : errorOutput;
    // const articleParamsOb = JSON.parse(this.state.articleParams);
    // .substring(0, 10) for date
    articleParamsOb = this.state.articleParams
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
    await getRequest(
      '/api/v1/articles',
      res => {
        const articleList = res.data.map(article => ({
          key: article.id.toString(),
          value: article
        }));
        // NOT SAFE - fix later
        this.setState({ articleParams: articleList.filter(function(article) { return article.key == id })[0].value, refreshing: false });
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
