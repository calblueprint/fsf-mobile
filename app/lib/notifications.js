import FSFLocalNotifications from 'react-native-fsf-local-notifications';

function initializeNotifications() {
  FSFLocalNotifications.initializeNotifications();
}

function notify(title, content, link, id) {
  FSFLocalNotifications.publishNotification(title, content, link, id);
}

function testNotify(content) {
  FSFLocalNotifications.publishNotification('Testing!', content, 'fsf://fsf/donate', -1);
}

// 1. fetch from the database
// 2. parse contents
// 3. ddisplay it
function testNotifyFromDb() {
  
  
}

function testDeepLink(content) {
  FSFLocalNotifications.publishNotification('Testing!', content, 'fsf://fsf/profile', -1);
}

export { initializeNotifications, notify, testNotify, testDeepLink, testNotifyFromDb };
