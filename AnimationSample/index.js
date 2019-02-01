/** @format */

import {AppRegistry,Dimensions} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
global.deviceWidth=Dimensions.get('screen').width
global.deviceHeight=Dimensions.get('screen').height
AppRegistry.registerComponent(appName, () => App);
