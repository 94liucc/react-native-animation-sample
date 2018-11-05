import React, { Component } from 'react';
import { Platform, Dimensions, Text, View, PanResponder, Animated, Easing, StyleSheet } from 'react-native';
import Headers from '../component/header';
import {Viewstyle,ScreenWidth} from '../common/ui'
import Orientation from 'react-native-orientation';

export default class touch extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        bg: 'red',
        bg1: 'pink'
      }
    }
    componentWillMount(){
      this.gestureHandlers = {
        onStartShouldSetResponder: (e) => {
          console.log("start");
          return true
      },
        onMoveShouldSetResponder: (e) => {console.log("move begin"); return true},
        onResponderGrant: (e) => {
          console.log("grant");
          this.setState({bg: 'orange'});
      },
        onResponderMove: (e) => {
          console.log("moving"); 
      },
        onResponderRelease: (e) => {
          console.log("release"); 
          this.setState({bg: 'red'})
        },
        //最关键的两句：加上下面两句则响应者会变化
        onStartShouldSetResponderCapture: () => true,
        onMoveShouldSetResponderCapture: ()=> true
    };
    this.gestureHandlers2 = {
        onStartShouldSetResponder: (e) => {
          console.log("start1");
          return false
      },
        onMoveShouldSetResponder: (e) => {console.log("move begin"); return false},
        onResponderGrant: (e) => {
          console.log("grant1");
          this.setState({bg1: 'red'});
      },
        onResponderMove: (e) => {
          console.log("moving1"); 
      },
        onResponderRelease: (e) => {
          console.log("release1"); 
          this.setState({bg1: 'pink'})
        },
    };
  }
  pop = () => {
    this.props.navigation.goBack()
  }
    render() {
      return (
       <View style={styles.container}>
        <Headers onPress={() => { this.pop() }} />
         <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
         <View 
          {...this.gestureHandlers}
          style={[styles.rectBig, {
            "backgroundColor": this.state.bg
          }]}>
          
          </View>
          <View
           {...this.gestureHandlers2}
           style={[styles.rect,  {
            "backgroundColor": this.state.bg1    
           }]}>
          </View>
          </View>
         </View>
      );
    }
  }
  const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    rect: {
      width: 100,
      height: 100,
      position:'absolute',
      right:400,
      top: 500,
    },
    rectBig: {
      width: 200,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });