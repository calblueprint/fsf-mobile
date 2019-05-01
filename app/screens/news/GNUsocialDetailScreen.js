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
    const errorOutput = JSON.stringify({
      "gs_user_name": "Loading",
      "content_html": "Please wait while we fetch your notice",
      "published": ""
    });
    this.state = {};
    const { params } = this.props.navigation.state;
    this.state = {
      refreshing: params.noticeParams === undefined,
      noticeParams: params.noticeParams ? params.noticeParams : errorOutput
    };
    this._fetchNotice = this._fetchNotice.bind(this);
  }

  // .substring(0, 10) for date
  render() {
    // const { params } = this.props.navigation.state;
    // const noticeParams = params ? params.noticeParams : null;
    // const noticeParamsOb = JSON.parse(noticeParams);

    const noticeParamsOb = this.state.noticeParams;
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
    await getRequest(
      '/api/v1/notices',
      res => {
        const noticeList = res.data.map(notice => ({
          key: notice.id.toString(),
          value: notice
        }));
        // NOT SAFE - fix later
        this.setState({ noticeParams: noticeList.filter(function(notice) { return notice.key == id })[0].value, refreshing: false });
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
