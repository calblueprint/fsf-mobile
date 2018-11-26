import FSFLocalNotifications from 'react-native-fsf-local-notifications';
import moment from 'moment'

function initializeNotifications() {
  FSFLocalNotifications.initializeNotifications()
}

function notify(title, content, id) {
  FSFLocalNotifications.publishNotification(title, content, id);
}

function testNotify(content) {
  FSFLocalNotifications.publishNotification("Test Notification", content, -1);
}

export { initializeNotifications, notify, testNotify }
