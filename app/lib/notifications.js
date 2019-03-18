import FSFLocalNotifications from 'react-native-fsf-local-notifications';

function initializeNotifications() {
  FSFLocalNotifications.initializeNotifications();
}

function notify(title, content, link, id) {
  FSFLocalNotifications.publishNotification(title, content, link, id);
}

function testNotify(content) {
  FSFLocalNotifications.publishNotification('Donate Now!', content, 'fsf://fsf/donate', -1);
}

export { initializeNotifications, notify, testNotify };
