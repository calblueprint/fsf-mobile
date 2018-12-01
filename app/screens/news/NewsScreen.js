import React from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  ScrollView
} from "react-native";
import APIRoutes from "./../../lib/routes";
import MessageCard from "./../../components/MessageCard";
import BaseScreen from "../BaseScreen";
import ArticleList from "../../components/newsfeed/ArticleList";
import Article from "../../components/newsfeed/Article";
import { getArticles } from "./../../lib/newsfeedAPI";
import  apiNewsData  from "../../components/newsfeed/apiNewsData";

// Make sure to add your new screen to /config/navigation.js
// #NewsScreen
// #NewsList
// NewsDetail props so 
// onPress={() => this.props.navigation.setParams({ name: 'Lucy' })}
class NewsScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      articles: apiNewsData,
      refreshing: true
    };
    this._fetchArticles.bind(this);
    this._newsDetailScreen.bind(this);
  }

  _newsDetailScreen(article_params) {
     this.props.navigation.setParams({ newsArticle: article_params });
     this.props.navigation.navigate("NewsDetail");
  }

  _fetchArticles(refresh = false) {
    this.setState({ refreshing: refresh });
    getArticles().then(
      data => this.setState({ articles: data, refreshing: false }),
      error => console.log(error)
    );
  }

  componentDidMount() {
    this._fetchArticles();
  }

  render() {
    // const refreshControl = (
    //   <RefreshControl
    //     refreshing={this.state.refreshing}
    //     onRefresh={() => this._fetchArticles(true)}
    //   />
    // );

    return (
      // <ScrollView refreshControl={refreshControl}>
      //   <View style={styles.container}>
      //     <Text>This is the News Screen</Text>
      //     <Button
      //       title="Detail"
      //       onPress={() => this.props.navigation.navigate("NewsDetail")}
      //     />
      //     <ArticleList newsArticles={articleData} />
      //   </View>
      // </ScrollView>
      <View style={styles.container}>
        <Text>This is the news screen</Text>
      <FlatList
        style={styles.listContainer}
        data={this.state.articles}
        renderItem={info => (
          <Article _onPress={() => this._newsDetailScreen} news={info.item.value} />
        )}
      />

    );
  }
const styles = StyleSheet.create({
  container: {
    marginRight: 40,
    marginLeft: 40,
    alignSelf: "stretch"
  },
  listContainer: {
    width: "100%"
  }
});

export default NewsScreen;
