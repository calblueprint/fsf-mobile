import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  SectionList
} from 'react-native';
import { getRequest } from '../../lib/requests';
import BaseScreen from '../BaseScreen';
import NoticeCard from '../../components/newsfeed/NoticeCard';

// Make sure to add your new screen to /config/navigation.js
class GNUsocialScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      notices: [],
      refreshing: true
    };
    this._fetchNotices = this._fetchNotices.bind(this);
  }

  componentDidMount() {
    this._fetchNotices(true);
  }

  render() {
    const refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this._fetchNotices(true)}
      />
    );

    return (
      <View style={styles.container}>
        <SectionList
          refreshControl={refreshControl}
          style={styles.listContainer}
          extraData={this.state}
          renderItem={info => (
            <NoticeCard
              onPressNav={() =>
                this.props.navigation.navigate('GNUsocialDetail', {
                  noticeParams: JSON.stringify(info.item.value)
                })
              }
              noticeParams={info.item.value}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.category}>{title}</Text>
          )}
          sections={[{ title: 'Recent Notices', data: this.state.notices }]}
          keyExtractor={item => item.key}
        />
      </View>
    );
  }

  async _fetchNotices(refresh = false) {
    this.setState({ refreshing: true });
    await getRequest(
      '/api/v1/notices',
      res => {
        const noticeList = res.data.map(notice => ({
          key: notice.id.toString(),
          value: notice
        }));
        this.setState({ notices: noticeList, refreshing: false });
      },
      error => console.log(error)
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  listContainer: {
    width: '100%'
  },
  category: {
    fontSize: 48,
    alignSelf: 'center'
  }
});

export default GNUsocialScreen;
