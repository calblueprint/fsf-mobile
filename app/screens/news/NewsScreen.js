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
import BaseScreen from "../BaseScreen";
import MessageCard from "./../../components/MessageCard";
import NewsList from "../../components/newsfeed/NewsList";
import NewsData from "./../../components/newsfeed/newsData.js";

// Make sure to add your new screen to /config/navigation.js
class NewsScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      refreshing: true
    };
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>FSF NEWS </Text>
          <Button
            title="Detail"
            onPress={() => this.props.navigation.navigate("NewsDetail")}
          />
        </View>
        <NewsList newsItems={NewsData} />
      </ScrollView>
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
