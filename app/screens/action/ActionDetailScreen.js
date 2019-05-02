import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Linking
} from 'react-native';
import BaseScreen from '../BaseScreen';
import HTML from 'react-native-render-html';
import { getRequest } from '../../lib/requests';

// Make sure to add your new screen to /config/navigation.js
class ActionDetailScreen extends BaseScreen {
  constructor(props) {
    super(props);
    const errorOutput = {
      "title": "Loading",
      "description": "Please wait while we fetch your petition",
      "link": ""
    };
    const { params } = this.props.navigation.state;
    this.state = {
      refreshing: params.actionParams === undefined,
      actionParams: params.actionParams ? params.actionParams : errorOutput
    };
    if (this.state.refreshing) {
      global.disableSplash = true;
    };
    this._fetchPetition = this._fetchPetition.bind(this);
  }

  componentDidMount() {
    if (this.state.refreshing) {
      const { params } = this.props.navigation.state;
      this._fetchPetition(params.id);
    }
  }

  render() {
    // const { params } = this.props.navigation.state;
    // const actionParams = params ? params.actionParams : null;
    // const actionParamsOb = actionParams;

    const actionParamsOb = this.state.actionParams;

    const actionLink = `<a href="${actionParamsOb.link}">Take Action</a>`;
    const additionalProps = {
      onLinkPress: (evt, href) => {
        Linking.openURL(href);
      },
      baseFontStyle: {
        fontSize: 18
      },
      imagesInitialDimensions: {
        width: Dimensions.get('window').width - 50,
        height: 200
      }
    };
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.action}>
            <Text style={styles.title}>{actionParamsOb.title}</Text>
            <Text style={styles.description}>{actionParamsOb.description}</Text>
            <HTML html={actionLink} {...additionalProps} />
          </View>
        </ScrollView>
      </View>
    );
  }
  async _fetchPetition(id) {
    const URL = '/api/v1/petitions/' + id;
    await getRequest(
      URL,
      res => {
        this.setState({ actionParams: res.data})
        // const petitionList = res.data.map(petition => ({
        //   key: petition.id.toString(),
        //   value: petition
        // }));
        // // NOT SAFE - fix later
        // // this.setState({actionParams: res.data[0]})
        // this.setState({ actionParams: petitionList.filter(function(petition) { return petition.key == id })[0].value, refreshing: false });
      },
      error => console.log(error)
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  action: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    marginTop: 10,
    textAlign: 'left',
    fontSize: 24,
    fontWeight: 'bold'
  },
  description: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 10,
    marginBottom: 25
  }
});
export default ActionDetailScreen;
