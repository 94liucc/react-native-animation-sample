/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Animation from './app/page/Animation';
import Follow from './app/page/folllow';
import Spring from './app/page/spring';
import Decay from './app/page/decay';
import Lottie from './app/page/lottie'
import Test from './app/page/orientation_test'
import Orientation from 'react-native-orientation';
import Gesture from './app/page/gesture';
import CommonTest from './app/page/common_test';
import WebCanvas from './app/page/webcanvas';
import {PageConfig} from './app/config/page-config';
import Webgl from './app/page/webgl';
import Websockets from './app/page/websocket'
 class App extends Component {
  constructor(props){
    super(props)
    console.log('deviceWidth====='+deviceWidth)
  }
  componentDidMount(){
    Orientation.addOrientationListener(this._orientationDidChange);
  }
  _orientationDidChange = (orientation) => {
    console.log('profilerender======='+orientation)
    if (orientation === 'LANDSCAPE') {
        
    } else {
      // do something with portrait layout
    }
    
  }
  _onPress(index){
    switch(index){
          case 0:
          this.props.navigation.navigate('Animation')
          break;
          case 1:
          this.props.navigation.navigate('Test')
          break;
          case 2:
          this.props.navigation.navigate('Gesture')
          break;
          case 3:
          this.props.navigation.navigate('CommonTest')
          break;  
          case 4:
          this.props.navigation.navigate('WebCanvas')
          break;
          case 5:
          this.props.navigation.navigate('Webgl')
          break;
          case 6:
          this.props.navigation.navigate('WebSocket')
          break;
    }
  }
  render() {
    console.log('map.length')
    return (
      <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center',alignItems: 'center',}}>
        <View style={styles.container}>
        {
        PageConfig.map((value,index)=>
          (
            <TouchableOpacity style={{width:150,height:60,backgroundColor:'#9370DB',borderRadius:10,marginVertical:20}} onPress={()=>{this._onPress(index)}}>
          <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Text style={{fontSize:20,color:'#fafafa'}}>{value.title}</Text>
          </View>
        </TouchableOpacity>
          )
        )
      }
        </View>
      </ScrollView>
    );
  }
}
export default createStackNavigator({
   Home:{
     screen:App
   },
   Animation:{
     screen:Animation
   },
   Follow:{
     screen:Follow
   },
   Spring:{
     screen:Spring
   },
   Decay:{
     screen:Decay
   },
   Lottie:{
     screen:Lottie
   },
   WebCanvas:{
     screen:WebCanvas
   },
   Test:{
     screen:Test
   },
   Gesture:{
     screen:Gesture
   },
   CommonTest:{
     screen:CommonTest
   },
   Webgl:{
     screen:Webgl
   },
   WebSocket:{
     screen:Websockets
   }
},
{
  headerMode: 'none',
}
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
