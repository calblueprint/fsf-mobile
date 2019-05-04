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
import ActionCard from '../../components/actions/ActionCard';

// Make sure to add your new screen to /config/navigation.js
class ActionScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      actions: [],
      refreshing: true
    };
    this._fetchArticles = this._fetchArticles.bind(this);
  }

  componentDidMount() {
    this._fetchArticles(true);
  }

  render() {
    const refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this._fetchArticles(true)}
      />
    );

    return (
      <View style={styles.container}>
        <SectionList
          refreshControl={refreshControl}
          style={styles.listContainer}
          extraData={this.state}
          renderItem={info => (
            <ActionCard
              onPressNav={() =>
                this.props.navigation.navigate('ActionDetail', {
                  actionParams: info.item.value
                })
              }
              actionParams={info.item.value}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.category}>{title}</Text>
          )}
          sections={[{ title: 'Take Action', data: this.state.actions }]}
          keyExtractor={item => item.key}
        />
      </View>
    );
  }

  async _fetchArticles(refresh = false) {
    this.setState({ refreshing: true });
    await getRequest(
      '/api/v1/petitions',
      res => {
        const actionList = res.data.map(action => ({
          key: action.id.toString(),
          value: action
        }));
        this.setState({ actions: actionList, refreshing: false });
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

export default ActionScreen;
