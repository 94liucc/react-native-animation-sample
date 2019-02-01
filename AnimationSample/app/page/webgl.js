
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import BaseComponent from'../common/basecomponent'
import Example1 from '../modals/webgl-example1'
export default class Webgl extends BaseComponent{


   constructor(props){
      super(props)
      this.state={

      }
   }
    _pop(){
        this.props.navigation.goBack()
    }
    _showExample(index){
        switch(index){
            case 0:
            this.example1.changeState(true,1);
            break;
            case 1:
            this.example1.changeState(true,2);
            break;
        }
    }
    render() {
      return (
        <View style={{flex:1,}}>
        {this.renderHeader(()=>{this._pop()})}
            <Example1 ref={(exa)=>{this.example1=exa}}/>
            <View style={{alignItems:'center',flex:1}}>
                <TouchableOpacity onPress={()=>{this._showExample(0)}}>
                    <View style={{width:150,height:50,backgroundColor:'#FFCC80',justifyContent:'center',alignItems:'center',borderRadius:19}}>
                        <Text style={{color:'#E67E22',fontSize:16}}>示例1</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this._showExample(1)}}>
                    <View style={{width:150,height:50,backgroundColor:'#FFCC80',justifyContent:'center',alignItems:'center',borderRadius:19,marginTop:20}}>
                        <Text style={{color:'#E67E22',fontSize:16}}>渐变色</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
      )
    }
}