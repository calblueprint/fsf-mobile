import BackgroundFetch from "react-native-background-fetch";
import { AsyncStorage } from "react-native"
import { notify } from "./notifications"
import { getRequest } from "./requests"
import DeviceInfo from 'react-native-device-info';


/**
* Initializes Background Fetching when app loads.
* Also checks if this is the first app launch and initalizes
* The "last updated" field for messages
*/
function initializeBackgroundFetch() {
  BackgroundFetch.configure({
    minimumFetchInterval: 60, // <-- minutes (15 is minimum allowed)
    forceReload: true,        // <-- App will reload....after it dies...eek..
    stopOnTerminate: false,  // <-- Fetching should continue when app terminates
    startOnBoot: true      // <-- Fetching should restart when phone reboots
  }, () => {
    console.log("[js] Received background-fetch event");
    _backgroundTask()
  }, (error) => {
    console.log("[js] RNBackgroundFetch failed to start");
    console.log(error)
  });
}



function _backgroundTask(initialPull){
  getRequest('/messages',
    (newMessages) => {
      _processMessages(newMessages)
    },
    (error) => {
      console.log("Request for messages failed")
      console.log(error);
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED);
    }
  )
}

function _pingDebugServer(numUpdates) {
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
    console.log("Background Fetch Debug Result: " + response.status)
  });
}

async function _processMessages(newMessages) {
  try {
    // Find current latest
    latestID = await AsyncStorage.getItem('latestMessageID')
    shouldNotify = JSON.parse(await AsyncStorage.getItem('notificationsOn'));
    if (latestID == null) { // First ever fetch!
      shouldNotify = false
      latestID = '0'
    }
    latestID = JSON.parse(latestID)

    let newMessageCount = 0
    let newLatestID = -1
    for (messageIndex in newMessages) { // Notify for all with higher ID than latest. Find new max
      message = newMessages[messageIndex];
      newLatestID = newLatestID > message.id ? newLatestID : message.id
      if (message.id > latestID) {
        if (shouldNotify) {
          newMessageCount += 1
          notify(message.title, message.content, message.link, message.id)
        }
      }
    }

    // Debugging Only
    _pingDebugServer(newMessageCount);

    // Update Stored Messages
    await AsyncStorage.setItem('latestMessageID', JSON.stringify(newLatestID));
    BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);

  } catch (error) {
    console.log("Error saving Message Data.\nData:")
    console.log(newMessages)
    console.log("\n\nError:")
    console.log(error)
    BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED);
  }

}

export { initializeBackgroundFetch }
