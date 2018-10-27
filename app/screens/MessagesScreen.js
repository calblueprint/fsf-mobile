import React from 'react';
import { Button, Text, View, StyleSheet, RefreshControl } from 'react-native';
import { getRequest } from '../lib/requests.js';
import { APIRoutes } from '../lib/routes.js';

// Make sure to add your new screen to /config/navigation.js
class MessagesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.setState({
      messages: [],
      refreshing: true,
    })
    fetchMessages();
  }

  render() {
    console.log("Rendering MessagesScreen");
    var messages = this.state.messages.map((message) => (
      <MessageCard message={message}/>
    ))
    var refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this.fetchCourses(true)}
      />
    )
    return (
      <ScrollView refreshControl={refreshControl}>
        <View style={styles.container}>
          {messages}
        </View>
      </ScrollView>
    )
  }

  fetchMessages(refresh=false){
    this.setState({refreshing: refresh})
    getRequest(APIRoutes.messages(),
              (data) => this.setState({messages: data, refreshing: false}),
              (error) => console.log(error)))
  }


}

const styles = StyleSheet.create({
  container: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 180,
    alignSelf: 'stretch'
  }
});

export default MessagesScreen;
