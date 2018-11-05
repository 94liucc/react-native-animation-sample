/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Animation from './app/page/Animation';
import Follow from './app/page/folllow';
import Spring from './app/page/spring';
import Decay from './app/page/decay';
import Lottie from './app/page/lottie'
import Test from './app/page/orientation_test'
import Orientation from 'react-native-orientation';
import Gesture from './app/page/gesture';
import CommonTest from './app/page/common_test'
 class App extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  goAnimation=()=>{
    this.props.navigation.navigate('Animation')
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
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{width:150,height:60,backgroundColor:'#9370DB',borderRadius:10}} onPress={()=>{this.goAnimation()}}>
          <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Text style={{fontSize:20,color:'#fafafa'}}>动画示例</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{width:150,height:60,backgroundColor:'#9370DB',borderRadius:10,marginTop:20}} onPress={()=>{this.goTest()}}>
          <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Text style={{fontSize:20,color:'#fafafa'}}>屏幕旋转</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{width:150,height:60,backgroundColor:'#9370DB',borderRadius:10,marginTop:20}} onPress={()=>{this.goGesture()}}>
          <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Text style={{fontSize:20,color:'#fafafa'}}>手势处理</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{width:150,height:60,backgroundColor:'#9370DB',borderRadius:10,marginTop:20}} onPress={()=>{this.goCommonTest()}}>
          <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Text style={{fontSize:20,color:'#fafafa'}}>测试用例</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  goTest=()=>{
    this.props.navigation.navigate('Test')
  }
  goGesture=()=>{
    this.props.navigation.navigate('Gesture')
  }
  goCommonTest=()=>{
    this.props.navigation.navigate('CommonTest')
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
   Test:{
     screen:Test
   },
   Gesture:{
     screen:Gesture
   },
   CommonTest:{
     screen:CommonTest
   }
},
{
  headerMode: 'none',
}
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
