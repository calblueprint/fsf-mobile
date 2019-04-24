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
    () => {
      console.log('[js] Received background-fetch event');
      backgroundTask();
    },
    (error) => {
      console.log('[js] RNBackgroundFetch failed to start');
      console.log(error);
    },
  );
}

// Function defining what to do when phone wakes up.
// In this case, request new messages!
// Idea: Send server the last message you received so that it
// can know to only send you what you haven't seen.
function backgroundTask() {
  getRequest(
    '/messages',
    (newMessages) => {
      pingDebugServer('pinging!') // Debug
      processMessages(newMessages);
    },
    (error) => {
      console.log('Request for messages failed');
      console.log(error);
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED);
    },
  );
}


// Function defining what to do with new messages
async function processMessages(newMessages) {
  try {
    // Find current latest
    let latestID = await AsyncStorage.getItem('latestMessageID');
    let shouldNotify = await AsyncStorage.getItem('notificationsOn');
    if (shouldNotify == null) {
      // By default, notifications should be on
      shouldNotify = true;
      await AsyncStorage.setItem('notificationsOn', 'true');
    }

    if (latestID == null) {
      // First ever fetch!
      shouldNotify = false;
      latestID = '0';
    }
    latestID = JSON.parse(latestID);

    // let newMessageCount = 0; only used for debugging
    let newLatestID = -1;
    newMessages.forEach((key) => {
      const message = newMessages[key];
      newLatestID = newLatestID > message.id ? newLatestID : message.id;
      if (message.id > latestID) {
        if (shouldNotify) {
        //   newMessageCount += 1; only used for debugging
          notify(message.title, message.content, message.link, message.id);
        }
      }
    });

    // Debugging Only
    //  _pingDebugServer(newMessageCount);

    // Update Stored Messages
    await AsyncStorage.setItem('latestMessageID', JSON.stringify(newLatestID));
    BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
  } catch (error) {
    console.log('Error saving Message Data.\nData:');
    console.log(newMessages);
    console.log('\n\nError:');
    console.log(error);
    BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED);
  }
}

// Note: There exists a notification debug server that gets pinged when a
//       phone successfully wakes up and performs a fetch. Feel free to renable!!

// Sends status update to debug server.
function pingDebugServer(numUpdates) {
  let uuid = DeviceInfo.getUniqueID();
  let req = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'uuid': uuid,
      'updates': numUpdates
    })
  };
  fetch('http://fsf-notif-test.herokuapp.com/notifications', req).then(function (response) {
    console.log('Background Fetch Debug Result: ' + response.status)
  });
}

export default initializeBackgroundFetch;
