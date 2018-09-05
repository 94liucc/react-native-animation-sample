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
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


 class App extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  goAnimation=()=>{
    this.props.navigation.navigate('Animation')
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{width:150,height:60,backgroundColor:'#9370DB',borderRadius:10}} onPress={()=>{this.goAnimation()}}>
          <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Text style={{fontSize:20,color:'#fafafa'}}>动画示例</Text>
          </View>
        </TouchableOpacity>
      </View>
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
