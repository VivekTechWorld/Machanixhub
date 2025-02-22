/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Linking } from 'react-native';

// Handle deep linking
const handleDeepLink = (event) => {
    const url = event.url;
    console.log('Deep link received:', url);
};

// Listen for deep links
Linking.addEventListener('url', handleDeepLink);

// Get the initial URL when the app starts
Linking.getInitialURL().then((url) => {
    if (url) {
        handleDeepLink({ url });
    }
});

// Register the app
AppRegistry.registerComponent(appName, () => App);