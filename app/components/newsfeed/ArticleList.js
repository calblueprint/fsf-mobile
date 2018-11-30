import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import apiNewsData from "./apiNewsData";
import Article from "./Article";

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: apiNewsData
    };
  }

  render() {
    return (
      <FlatList
        style={styles.listContainer}
        data={this.state.data}
        renderItem={info => (
          <Article onP={() => this.props.navigation} news={info.item.value} />
        )}
      />
    );
  }
}
const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});
export default ArticleList;
