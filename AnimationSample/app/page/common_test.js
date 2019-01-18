import React, { Component } from 'react';
import { Platform, Dimensions, Text, View, PanResponder, Animated, Easing, TouchableOpacity } from 'react-native';
import Headers from '../component/header';
import axiosInstance from '../service/axios-instance';
import ImagePicker from 'react-native-image-picker'
var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');
const listArray=[
    {
        title:'Get',
        id:0,
        key:1,
    },{
        title:'Post',
        key:2,
        id:1
    },{
        title:'Put',
        key:3,
        id:2
    },{
        title:'Delet',
        key:4,
        id:3
    }
]
export default class CommonTest extends Component {
    constructor(props){
       super(props)
       this.state={
           responseText:'返回的值',
           id:1
       }
    }
    pop = () => {
        this.props.navigation.goBack()
    }
    buttonPress(id){
      let context=this
      let Id=context.state.id;
      switch(id){
        case 0:
                axiosInstance.get('/login/getuser',{
                    params:{
                        id:Id-1,       
                    }
                }).then(function(response){
                    context.setState({
                        responseText:response.data
                    })
                
                }).catch(function(error){
                    console.log(error)
                })
        break;
        case 1:
                axiosInstance.post('/login/setuser',{
                   name:'liucheng',
                   id:context.state.id,
                   token:Math.floor(Math.random()*200)
                }).then(function(response){
                    
                    context.setState({
                        responseText:response.data,
                        id:Id+1
                    })
                }).catch(function(error){
                    console.log(error)
                })
        break;
        case 2:
                axiosInstance.put('/login/changeuser',{
                    name:'tiantian',
                    id:Id-1,
                    token:Math.floor(Math.random()*200)
                }).then(function(response){
                    context.setState({
                        responseText:response.data,
                    })
                }).catch(function(error){
                    console.log(error)
                })
        break;
        case 3:
                axiosInstance.delete('/login/deletuser',{
                    params:{
                        id:Id-2,       
                    }
                }).then(function(response){
                    context.setState({
                        responseText:response.data,
                    })
                }).catch(function(error){
                    console.log(error)
                })
        break
      }
    }
    buttonCompontent(value){
        return <TouchableOpacity onPress={()=>{this.buttonPress(value.id)}} key={value.id}>
                   <View style={{width:deviceWidth/5,height:deviceWidth/10,backgroundColor:'#CACFD2',marginHorizontal:10,justifyContent:'center',alignItems:'center'}}>
                       <Text style={{color:'#fff',fontSize:14}}>{value.title}</Text>
                   </View>
                </TouchableOpacity>
    }
    _uploadPic(){
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          let context=this
          /**
           * The first arg is the options object for customization (it can also be null or omitted for default options),
           * The second arg is the callback which sends object: response (more info in the API Reference)
           */
          ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
              const form=new FormData();
              form.append('file',{
                  uri:response.uri,
                  type: 'image/jpeg', // <-- this
                  name: 'image.jpg',
              })
              form.append('id',10+'')
              axiosInstance.post('/picture/addpic',form).then(function(response){
                 console.log(response)
                 context.setState({
                    responseText:response.data,
                 })
              }).catch(function(error){
                console.log(error)
              })
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
          });
    }
   render(){
       return <View style={{flex:1,backgroundColor:'#fff'}}>
       <Headers onPress={() => { this.pop() }} />
        <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row', width:deviceWidth,height:deviceHeight/5}}>
            {listArray.map((value,index)=>(
                this.buttonCompontent(value)
            ))}
        </View>
        <Text style={{fontSize:20,color:'#884EA0'}}>{this.state.responseText}</Text>
        <View style={{marginTop:20,marginLeft:20}}>
            <TouchableOpacity onPress={()=>{this._uploadPic()}}>
                <View style={{width:150,height:50,justifyContent:'center',alignItems:'center',borderRadius:15,backgroundColor:'#A569BD'}}>
                    <Text style={{fontSize:20,color:'#fff'}}>点击上传图片</Text>
                </View>    
            </TouchableOpacity>    
        </View>
       </View>
      
   }
}