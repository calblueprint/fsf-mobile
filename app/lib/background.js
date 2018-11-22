import BackgroundFetch from "react-native-background-fetch";
import { AsyncStorage } from "react-native"
import { notify } from "./notifications"


function status() {
  BackgroundFetch.status((status) => {
    switch(status) {
      case BackgroundFetch.STATUS_RESTRICTED:
        return "BackgroundFetch restricted";
      case BackgroundFetch.STATUS_DENIED:
        return "BackgroundFetch denied";
      case BackgroundFetch.STATUS_AVAILABLE:
        return "BackgroundFetch is enabled";
    }
  });
}

function initializeBackgroundFetch() {
  BackgroundFetch.configure({
    minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
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

function _backgroundTask(){
  getRequest('/messages',
    (newMessages) => {
      processMessages(newMessages)
    },
    (error) => {
      console.log(error);
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED);
    }
  )
}

function _processMessages(newMessages) {
  try {
    // Get old messages
    oldMessageHash = AsyncStorage.getItem('messages')
    newMessageHash = {}

    // For every message that comes in, add it to the hash
    // And notify if we haven't seen it
    let newMessageCount = 0
    for (message in newMessages) {
      newMessageHash[message.id] = message
      if (!(message.id in oldMessageHash)) {
        newMessageCount += 1
        notify(message.id, message.title + " " + message.content)
      }
    }
    console.log("Notified about " + newMessageCount + " new messages");
    // Update Stored Messages
    AsyncStorage.setItem('messages', newMessageHash);

    // Finish
    if (newMessageCount > 0) {
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    } else {
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NO_DATA);
    }

  } catch (error) {
    console.log("Error saving Message Data.\nData:")
    console.log(data)
    console.log("\n\nError:")
    console.log(error)
    BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED);
  }
}

export { initializeBackgroundFetch, status}
