
import React, { Component } from 'react';
import { Platform, Dimensions, Text, View, PanResponder, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import deviceInfo from 'react-native-device-info'
import Base from '../common/basecomponent'
export default class Websocket extends Base {
  
    constructor(props){
       super(props)
       this.state={
           data:[]
       }
       this.websocket=''
       this.count=0
    }
    componentDidMount(){
        var ws=new WebSocket("ws://192.168.42.253:8080/myHandler/"+deviceInfo.getUniqueID().slice(4))
        this.websocket=ws
        ws.onopen=()=>{
            console.log('ws open=====')
        }
        ws.onmessage=e=>{
            console.log('ws onmessage===='+e.data)
            let datanow =this.state.data
            datanow.push({data:e.data+''})
            this.setState({
                data:datanow
            })
        }
        ws.onerror = e => {
         // an error occurred
         console.log(e.message);
       };
       
       ws.onclose = e => {
         // connection closed
         console.log(e.code, e.reason);
       };
    }
    componentWillUnmount(){
        this.websocket.close()
    }
    _goBack(){
        this.props.navigation.goBack()
    }
    _getConnect(){
        var message = {
            "message":'message22222',
            "username":deviceInfo.getUniqueID().slice(4),
            "to":'All'
        }
        this.websocket.send(JSON.stringify(message))
        this.count++
    }
    _renderItem(value){
        return <View style={{width:deviceWidth,height:50,backgroundColor:'#A1887F',justifyContent:'center',alignItems:'center',marginVertical:10}}>
              <Text style={{fontSize:14}}>{value.data}</Text>
        </View>
    }
    render(){
        return <View style={{flex:1}}>
            {this.renderHeader(()=>{this._goBack()})}
            <View style={{height:50,width:deviceWidth,justifyContent:'center',alignItems:'center',backgroundColor:'#A569BD',flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{this._getConnect()}}>
                    <View style={{width:90,height:30,backgroundColor:'#A9DFBF',justifyContent:'center',alignItems:'center',marginHorizontal:20}}>
                      <Text style={{fontSize:16,color:'#fff'}}>发送信息</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
            <FlatList
                data={this.state.data}
                style={{flex:1, backgroundColor:'#90A4AE'}}
                renderItem={({item})=>(this._renderItem(item))}
                keyExtractor={(item,index)=>item.id}
                />
        </View>
    }
}