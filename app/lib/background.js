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
    // Get old messages
    latestID = await AsyncStorage.getItem('latestMessageID')
    if (latestID == null) { // First ever fetch!

    }

    let newMessageCount = 0
    for (messageIndex in newMessages) {
      message = newMessages[messageIndex];
      if (message.id > latestID) {
        newMessageCount += 1
        notify(message.title, message.content, message.id)
      }
    }
    oldMessageHash = await AsyncStorage.getItem('messages')
    if (oldMessageHash == null) { // First ever fetch
      oldMessageHash = "{}"
    }
    oldMessageHash = JSON.parse(oldMessageHash)
    newMessageHash = {}

    // For every message that comes in, add it to the hash
    // And notify if we haven't seen it
    let newMessageCount = 0
    for (messageIndex in newMessages) {
      message = newMessages[messageIndex]
      newMessageHash[message.id] = message
      if (!(message.id in oldMessageHash)) {
        newMessageCount += 1
        notify(message.title, message.content, message.id)
      }
    }

    // Debugging Only
    _pingDebugServer(newMessageCount);

    // Update Stored Messages
    await AsyncStorage.setItem('messages', JSON.stringify(newMessageHash));
    BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);

  } catch (error) {
    console.log("Error saving Message Data.\nData:")
    console.log(newMessages)
    console.log("\n\nError:")
    console.log(error)
    BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED);
  }

}

export { initializeBackgroundFetch, status}
