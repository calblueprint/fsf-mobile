import React from 'react';
import { View, StyleSheet } from 'react-native';

const NewsCard = props => (
  <View style={styles.container}>{props.children}</View>
);

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    flex: 1
  }
});
export default NewsCard;
