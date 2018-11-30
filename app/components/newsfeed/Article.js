import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Article = props => (
  <View style={styles.container}>
    <Text>{props.news.title}</Text>
    <Button title="READ MORE" onPress={null} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    flex: 1
  },
  category: {
    width: "100"
  }
});
export default Article;
