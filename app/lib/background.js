import BackgroundFetch from "react-native-background-fetch";
import { AsyncStorage } from "react-native"
import { notify } from "./notifications"
import { getRequest } from "./requests"
import DeviceInfo from 'react-native-device-info';


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
    forceReload: true,
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
  _pingDebugServer();
  getRequest('/messages',
    (newMessages) => {
      console.log("Receieving Data");
      console.log("Processing Messages");
      _processMessages(newMessages)
    },
    (error) => {
      console.log("Request for messages failed")
      console.log(error);
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED);
    }
  )
}

function _pingDebugServer() {
  var deviceInfo = `BG FETCH. Device Name: ${DeviceInfo.getDeviceName()}, Device Type: ${DeviceInfo.getModel()}, Device ID: ${DeviceInfo.getUniqueID()}, API Level: ${DeviceInfo.getAPILevel()}`
  let req = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'device_id': deviceInfo
    })
  };
  fetch('http://fsf-notif-test.herokuapp.com/notifications', req).then(function (response) {
    console.log("Background task request Response status: " + response.status)
  });
}

async function _processMessages(newMessages) {
  try {
    // Get old messages
    oldMessageHash = await AsyncStorage.getItem('messages')
    if (oldMessageHash == null) {
      oldMessageHash = "{}"
    }
    oldMessageHash = JSON.parse(oldMessageHash)
    newMessageHash = {}
    console.log("Old Message Hash")
    console.log(oldMessageHash)

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
    console.log("Notified about " + newMessageCount + " new messages");
    // Update Stored Messages
    await AsyncStorage.setItem('messages', JSON.stringify(newMessageHash));
    console.log("Finished saving data in async storage");

    // Finish
    if (newMessageCount > 0) {
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    } else {
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NO_DATA);
    }

  } catch (error) {
    console.log("Error saving Message Data.\nData:")
    console.log(newMessages)
    console.log("\n\nError:")
    console.log(error)
    BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED);
  }
}

export { initializeBackgroundFetch, status}
