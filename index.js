/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainNavigator from './src/navigation/MainNavigator';

AppRegistry.registerComponent(appName, () => MainNavigator);
