import RNLocalNotifications from 'react-native-local-notifications';
import moment from 'moment'

function initializeNotifications() {
  RNLocalNotifications.setAndroidIcons("ic_launcher", "mipmap", "ic_launcher", "mipmap");
}

function notify(id, content) {
  let curDateString = moment().format('YYYY-mm-dd hh:mm');
  console.log("Scheduling notification for " + curDateString + " with content " + content)
  //RNLocalNotifications.createNotification(id, text, datetime, sound[, hiddendata]);
  RNLocalNotifications.createNotification(id, content, '2017-01-02 12:30', 'default');
}

function testNotify(content) {
  let curDateString = moment().add(1, 'minutes').format('YYYY-mm-dd hh:mm');
  console.log("Scheduling notification for " + curDateString + " with content " + content)
  //RNLocalNotifications.createNotification(id, text, datetime, sound[, hiddendata]);
  RNLocalNotifications.createNotification(123124124, content, '2017-01-02 12:30', 'default');
}

export { initializeNotifications, notify, testNotify }
