
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Animated, Easing, Image,} from 'react-native';
var Dimensions = require('Dimensions');
let { height, width } = Dimensions.get('window');
export default class Headers extends Component {
  constructor() {
  super()
  }
  render() {
    return (
      <View style={{ width: width, justifyContent: 'center', alignItems:'flex-start',marginTop:15}}>
        <TouchableOpacity onPress={()=>{this.props.onPress()}}>
        <Image
          style={{ width: 50, height: 50,marginLeft: 20, }}
          source={require('../images/back.png')}
        />
          </TouchableOpacity>
      </View>
    )
  }
}