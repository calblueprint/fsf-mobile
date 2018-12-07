import React from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  FlatList
} from 'react-native';
import { getRequest } from '../../lib/requests';
import BaseScreen from '../BaseScreen';
import NewsCard from '../../components/newsfeed/NewsCard';

// Make sure to add your new screen to /config/navigation.js
class NewsScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      refreshing: true
    };
    this._fetchArticles = this._fetchArticles.bind(this);
  }

  componentDidMount() {
    this._fetchArticles(true);
  }

  render() {
    const refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this._fetchArticles(true)}
      />
    );

    return (
      <View style={styles.container}>
        <FlatList
          refreshControl={refreshControl}
          style={styles.listContainer}
          data={this.state.articles}
          renderItem={info => (
            <NewsCard>
              <Text style={styles.title}>{info.item.value.title}</Text>
              <Text style={styles.lead}>
                {info.item.value.content.substring(20, 50)}
              </Text>
              <Text style={styles.date}>
                {Date(info.item.value.pub_date).substring(4, 10)}
              </Text>
              <Button
                title="READ MORE"
                onPress={() =>
                  this.props.navigation.navigate('NewsDetail', {
                    articleParams: JSON.stringify(info.item.value)
                  })
                }
              />
            </NewsCard>
          )}
        />
      </View>
    );
  }

  async _fetchArticles(refresh = false) {
    this.setState({ refreshing: refresh });
    await getRequest(
      '/api/v1/articles',
      res => {
        const articleList = res.data.map((article, i) => ({
          key: article.id.toString(),
          value: article
        }));
        this.setState({ articles: articleList, refreshing: false });
      },
      error => console.log(error)
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20
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

export default NewsScreen;
