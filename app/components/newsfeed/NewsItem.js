import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const NewsItem = props => (
  <View style={styles.container}>
    <Text>{props.category}</Text>
    <Text>{props.headline}</Text>
    <Text>{props.lead}</Text>
    <Text>{props.date}</Text>
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
export default NewsItem;
