import React from 'react';
import { Button, Text, View, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { getRequest } from './../../lib/requests';
import APIRoutes from './../../lib/routes';
import MessageCard from './../../components/MessageCard'
import BaseScreen from '../BaseScreen'

// Make sure to add your new screen to /config/navigation.js
class NewsDetailScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = { }
  }

  componentDidMount() {
  }

  render() {
    return (
      <ScrollView>
        <View>
        <Text>News Detail</Text>
        </View>
      </ScrollView>
    )
  }
}

export default NewsDetailScreen;
