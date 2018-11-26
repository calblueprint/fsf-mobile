import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import NewsfeedItem from "./NewsItem";

const NewsList = props => {
  console.log(props);
  const newsfeedOutput = props.newsItems.map((newsItem, i) => (
    <NewsfeedItem
      key={i}
      headline={newsItem.headline}
      lead={newsItem.lead}
      date={newsItem.date}
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
export default NewsList;
