/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Widget handler
import widgetTask from './widgetTask';

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerHeadlessTask('WidgetTask', () => widgetTask);
