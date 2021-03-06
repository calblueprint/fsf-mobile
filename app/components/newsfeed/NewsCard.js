import React from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';

const NewsCard = props => (
  <TouchableNativeFeedback
    onPress={() => props.onPressNav()}
    background={TouchableNativeFeedback.Ripple()}
  >
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{props.articleParams.title}</Text>
        <Text style={styles.lead}>
          {props.articleParams.summary.substring(0, 100)}
        </Text>
        <Text style={styles.date}>
          {Date(props.articleParams.pub_date).substring(4, 10)}
        </Text>
      </View>
      <TouchableNativeFeedback
        onPress={() => props.onPressNav()}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>READ MORE</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 12,
    paddingLeft: 28,
    paddingRight: 28,
    marginBottom: 39
  },
  buttonContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-end'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 26,
    marginBottom: 12,
    color: '#E2583E'
  },
  title: {
    textAlign: 'left',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  lead: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 10,
    marginBottom: 5
  },
  date: {
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 5,
    marginBottom: 5
  }
});
export default NewsCard;
