import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Article from "./Article";

const ArticleList = props => {
  const newsfeedOutput = props.newsArticles.map((newsArticle, i) => (
    <Article
      key={i}
      headline={newsArticle.headline}
      lead={newsArticle.lead}
      date={newsArticle.date}
    />
  ));
  return <View style={styles.listContainer}>{newsfeedOutput}</View>;
};
const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignItems: "center"
  }
});
export default ArticleList;
