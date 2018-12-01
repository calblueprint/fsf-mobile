import React from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  FlatList
} from 'react-native';
import { getRequest } from './../../lib/requests';
import APIRoutes from './../../lib/routes';
import MessageCard from './../../components/MessageCard';
import BaseScreen from '../BaseScreen';
import apiNewsData from '../../components/newsfeed/apiNewsData';
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
    console.log(apiNewsData);
    console.log('you are welcome good person');
    this._fetchArticles();
  }

  render() {
    const refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this._fetchArticles(true)}
      />
    );

    return (
      <FlatList
        refreshControl={refreshControl}
        style={styles.listContainer}
        data={this.state.articles}
        renderItem={info => (
          <NewsCard style={styles.container} articleParams={info.item.value}>
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
    );
  }

  _fetchArticles(refresh = false) {
    this.setState({ refreshing: false });
    this.setState({ articles: apiNewsData });
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

export default NewsScreen;
