import React from 'react';
import { Button, Text, View, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { getRequest } from './../lib/requests';
import APIRoutes from './../lib/routes';
import MessageCard from './../components/MessageCard'

// Make sure to add your new screen to /config/navigation.js
class MessagesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      refreshing: true,
    }
  }

  componentDidMount() {
    this._fetchMessages();
  }

  render() {
    console.log("Rendering MessagesScreen");
    var messages = this.state.messages.map((message) => (
      <MessageCard message={message} key={message.id}/>
    ))
    var refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this._fetchMessages(true)}
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

  _fetchMessages(refresh=false){
    this.setState({refreshing: refresh})
    getRequest('/messages',
              (data) => this.setState({messages: data, refreshing: false}),
              (error) => console.log(error))
  }


}

const styles = StyleSheet.create({
  container: {
    marginRight: 40,
    marginLeft: 40,
    alignSelf: 'stretch'
  }
});

export default MessagesScreen;
