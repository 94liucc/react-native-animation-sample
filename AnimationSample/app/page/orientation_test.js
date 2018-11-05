import React, { Component } from 'react';
import { Platform, Dimensions, Text, View, PanResponder, Animated, Easing, StyleSheet } from 'react-native';
import Headers from '../component/header';
import {Viewstyle,ScreenWidth} from '../common/ui'
import Orientation from 'react-native-orientation';
import Base from '../common/basecomponent'
export default class Test extends Base {
    constructor(props) {
        super(props)
        this.state = {
         orientation:props.orientation
        }
        console.log('props========')
        console.log(props)
      }
 
      pop = () => {
        this.props.navigation.goBack()
      }
      render(){
          return (
              <View style={{ flex: 1, backgroundColor: '#5F6A6A' }}>
                <Headers onPress={() => { this.pop() }} />
                <View style={{flex:1,justifyContent:'center',}}>
                <Text style={{fontSize:16,color:'#D7BDE2',margin:5}}>当前屏幕的宽度为：{ScreenWidth()}</Text>
                <Text style={{fontSize:16,color:'#ABEBC6',margin:5}}>当前屏幕的num为：3333</Text>
                <Text style={{fontSize:16,color:'#A9CCE3',margin:5}}>当前屏幕的宽度为：2222</Text>
                <View style={Viewstyle()}/>
                <View style={styles.viewstyle}/>
                </View>
              </View>
          )
      }
}
let styles = StyleSheet.create({
    viewstyle:{
        width:ScreenWidth(),
        backgroundColor:'#EDBB99',height:5,marginTop:5
    }
})