import BackgroundFetch from 'react-native-background-fetch';
import { AsyncStorage } from 'react-native';
import { getRequest } from './requests';
import { notify } from './notifications';

async function getLatestMessage(latestMessageTime) {
    const route = '/api/v1/latestMessages?last_sent=' + latestMessageTime;
    await getRequest(
      route,
      async res => {
        await processMessages(res.data); 
        await AsyncStorage.setItem('latestMessageTime', JSON.stringify(new Date()));
      },
      error => {
        console.log('Request for messages failed');
        console.log(error);
        BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED);
      });
}

// expect: input as res.data
async function processMessages(data) {
    try {
      data.forEach(message => {
        notify(message.title, message.content, message.link, message.id);
      });
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA); 
    } catch (error) {
      console.log('Error saving Message Data.\nData:');
      console.log(newMessages);
      console.log('\n\nError:');
      console.log(error);
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED);
    }
  }

export default getLatestMessage;