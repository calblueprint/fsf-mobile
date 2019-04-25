import BackgroundFetch from 'react-native-background-fetch';
import { AsyncStorage } from 'react-native';
import { notify } from './notifications';
import { getRequest } from './requests';
// import DeviceInfo from 'react-native-device-info'; Used to provide debug info

/**
 * Initializes Background Fetching when app loads.
 * Also checks if this is the first app launch and initalizes
 * The 'last updated' field for messages
 */
function initializeBackgroundFetch() {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 60, // <-- minutes (15 is minimum allowed)
      forceReload: true, // <-- App will reload....after it dies...eek..
      stopOnTerminate: false, // <-- Fetching should continue when app terminates
      startOnBoot: true, // <-- Fetching should restart when phone reboots
    },
    async () => {
      console.log('[js] Received background-fetch event');
      var latestMessageTime = await AsyncSorage.getItem('latestMessageTime');
      // if first ever fetch...
      if (latestMessageTime == null) {
        latestMessageTime = (new Date()).toString();
      }
      backgroundTask(latestMessageTime);
      await AsyncStorage.setItem('latestMessageTime', (new Date()).toString());
    },
    error => {
      console.log('[js] RNBackgroundFetch failed to start');
      console.log(error);
    },
  );
}

// Function defining what to do when phone wakes up.
// In this case, request new messages!
// Idea: Send server the last message you received so that it
// can know to only send you what you haven't seen.
// expect: time input AS STRING
async function backgroundTask(latestMessageTime) {
  let shouldNotify = await AsyncStorage.getItem('notificationsOn');
  // if this has never been set before...
  if (shouldNotify == null) {
    // ...set it to be on by default
    shouldNotify = "true";
    await AsyncStorage.setItem('notificationsOn', true);
  }  
  
  if (JSON.parse(shouldNotify)) {
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

export default initializeBackgroundFetch;
