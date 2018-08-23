import React, { Component } from 'react';
import { Platform, Dimensions, Text, View, PanResponder, Animated, Easing } from 'react-native';
import Headers from '../component/header';
var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');
export default class Follow extends Component {
  constructor(props) {
    super(props)
    this.state = {
         visiable:false
    }
    this.followanimation=new Animated.ValueXY(0,0)
  }
  componentWillMount(){
    this._responser=PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
         
        // gestureState.{x,y} 现在会被设置为0
         this.setState({
           visiable:true
         })
        //  this.followanimation.setOffset({x:gestureState.x,y:gestureState.y})
         this.followanimation.setValue({x:0,y:0})
      },
      onPanResponderMove: Animated.event(
        [null,{dx:this.followanimation.x,
              dy:this.followanimation.y}]
      ),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        this.setState({
          visiable:false
        })
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    })
  }
  pop = () => {
    this.props.navigation.goBack()
  }
  render() {
    var interpolatedColorAnimation = this.followanimation.y.interpolate({
      inputRange: [- deviceHeight, deviceHeight],
      outputRange: ['rgba(225,0,0,1)', 'rgba(225,0,225,1)'],
      extrapolate: 'clamp'
    });
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Headers onPress={() => { this.pop() }} />
        <View style={{flex:1}} {...this._responser.panHandlers}>
           {
             this.state.visiable?
             <Animated.View style={[{width:50,height:50,borderRadius:25},
              {
                transform: [
                  {translateX: this.followanimation.x},
                  {translateY: this.followanimation.y},                 
                ],
                backgroundColor: interpolatedColorAnimation
              }
             ]}/>:<View/>
           }
        </View>  
      </View>
    )
  }
}