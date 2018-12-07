import React from 'react';
import { View, StyleSheet } from 'react-native';

const NewsCard = props => (
  <View style={styles.containerCard}>{props.children}</View>
);

const styles = StyleSheet.create({
  containerCard: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    flex: 1,
    elevation: 5
  }
});
export default NewsCard;
