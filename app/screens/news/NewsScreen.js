import React from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  ScrollView
} from "react-native";
import { getRequest } from "./../../lib/requests";
import APIRoutes from "./../../lib/routes";
import MessageCard from "./../../components/MessageCard";
import BaseScreen from "../BaseScreen";
import ArticleList from "../../components/newsfeed/ArticleList";
import { getArticles } from "./../../lib/newsfeedAPI";
import articleData from "../../components/newsfeed/articleData";
import { apiNewsData } from "../../components/newsfeed/apiNewsData";

// Make sure to add your new screen to /config/navigation.js
class NewsScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      refreshing: true
    };
    this._fetchArticles.bind(this);
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
    const refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this._fetchArticles(true)}
      />
    );

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
        <ArticleList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 40,
    marginLeft: 40,
    alignSelf: "stretch"
  }
});

export default NewsScreen;
