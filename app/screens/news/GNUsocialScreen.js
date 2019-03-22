import React from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
  SectionList
} from 'react-native';
import { getRequest } from '../../lib/requests';
import BaseScreen from '../BaseScreen';
import NewsCard from '../../components/newsfeed/NewsCard';

// Make sure to add your new screen to /config/navigation.js
class GNUsocialScreen extends BaseScreen {
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
        <SectionList
          refreshControl={refreshControl}
          style={styles.listContainer}
          extraData={this.state}
          renderItem={info => (
            <NewsCard
              onPressNav={() =>
                this.props.navigation.navigate('NewsDetail', {
                  articleParams: JSON.stringify(info.item.value)
                })
              }
              articleParams={info.item.value}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.category}>{title}</Text>
          )}
          sections={[{ title: 'Recent News', data: this.state.articles }]}
          keyExtractor={item => item.key}
        />
      </View>
    );
  }

  async _fetchArticles(refresh = false) {
    this.setState({ refreshing: true });
    await getRequest(
      '/api/v1/articles',
      res => {
        const articleList = res.data.map(article => ({
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
    alignItems: 'center'
  },
  listContainer: {
    width: '100%'
  },
  category: {
    fontSize: 48,
    alignSelf: 'center'
  }
});

export default GNUsocialScreen;
