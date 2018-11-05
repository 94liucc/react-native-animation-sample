import React, { Component } from 'react';
import { Platform, Dimensions, Text, View, PanResponder, Animated, Easing, TouchableOpacity } from 'react-native';
import Headers from '../component/header';
var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');
export default class CommonTest extends Component {
    pop = () => {
        this.props.navigation.goBack()
    }
   render(){
       return <View style={{flex:1,backgroundColor:'#fff'}}>
       <Headers onPress={() => { this.pop() }} />

       </View>
   }
}