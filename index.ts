import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/navigation/_index';
import {name as appName} from './app.json';
import { Linking } from 'react-native';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';


const updatedConfig = {
    ...awsconfig,
    oauth: {
        ...awsconfig.oauth,
        redirectSignIn: 'myapp://auth/confirm',
        redirectSignOut: 'myapp://auth/signout'
    }
};

AppRegistry.registerComponent(appName, () => App);
Amplify.configure(updatedConfig);