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
class GNUsocialDetailScreen extends BaseScreen {
  constructor(props) {
    super(props);
    const errorOutput = {
      "gs_user_name": "Loading",
      "content_html": "Please wait while we fetch your notice",
      "published": ""
    };
    const { params } = this.props.navigation.state;
    this.state = {
      refreshing: params.noticeParams === undefined,
      noticeParams: params.noticeParams ? params.noticeParams : errorOutput
    };
    if (this.state.refreshing) {
      global.disableSplash = true;
    };
    this._fetchNotice = this._fetchNotice.bind(this);
  }

  componentDidMount() {
    if (this.state.refreshing) {
      const { params } = this.props.navigation.state;
      this._fetchNotice(params.id);
    }
  }


  // .substring(0, 10) for date
  render() {
    // const { params } = this.props.navigation.state;
    // const noticeParams = params ? params.noticeParams : null;
    // const noticeParamsOb = JSON.parse(noticeParams);

    noticeParamsOb = this.state.noticeParams;
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
          <View style={styles.article}>
            <Text style={styles.title}>{noticeParamsOb.gs_user_name}</Text>
            <Text style={styles.date}>
              {noticeParamsOb.published}
            </Text>
            <HTML html={noticeParamsOb.content_html} {...additionalProps} />
          </View>
        </ScrollView>
      </View>
    );
  }

  async _fetchNotice(id) {
    const URL = '/api/v1/notices/' + id;
    await getRequest(
      URL,
      res => {
        this.setState({ noticeParams: res.data})
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
  article: {
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
  lead: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 10,
    marginBottom: 25
  },
  date: {
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 10,
    marginBottom: 10
  }
});
export default GNUsocialDetailScreen;
