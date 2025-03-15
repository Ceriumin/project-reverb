import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/navigation/_index';
import {name as appName} from './app.json';
//import { Amplify } from 'aws-amplify';
//import awsconfig from './aws-exports';

AppRegistry.registerComponent(appName, () => App);
