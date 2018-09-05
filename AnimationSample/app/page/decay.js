import React, { Component } from 'react';
import { Platform, Dimensions, Text, View, PanResponder, Animated, Easing, TouchableOpacity } from 'react-native';
import Headers from '../component/header';
var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');
export default class Decay extends Component {
    constructor(props) {
        super(props)
       this.state={
      
       }
       this.followanimation=new Animated.Value(0)
       this.centeranimation=new Animated.ValueXY(0,0)
    }
    componentWillMount(){
        this._responser = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      
            onPanResponderGrant: (evt, gestureState) => {
            this.followanimation.setValue(0)
      
            },
            onPanResponderMove:  Animated.event(
                [null, {
                  dx: this.followanimation,
                //   dy: this.followanimation.y,
                }]
              ),
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                console.log(gestureState)
                if (Math.abs(this.followanimation._value) > 50) {
                    Animated.decay(this.followanimation, {
                      velocity:gestureState.vx,
                      deceleration: 0.98
                    }).start()
                  } else {
                    Animated.spring(this.followanimation, {
                      toValue: 0,
                      friction: 4
                    }).start()
                  }
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
          this._responser1 = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      
            onPanResponderGrant: (evt, gestureState) => {
             this.centeranimation.setValue({x:0,y:0})
            },
            onPanResponderMove:  Animated.event(
                [null, {
                  dx: this.centeranimation.x,
                  dy: this.centeranimation.y,
                }]
              ),
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                console.log(gestureState)
                if (Math.abs(this.centeranimation.x._value) > 50) {
                    Animated.decay(this.centeranimation, {
                      velocity:{x:gestureState.vx,y:gestureState.vy},
                      deceleration: 0.98
                    }).start()
                  } else {
                    Animated.spring(this.centeranimation, {
                      toValue: {x:0,y:0},
                      friction: 4
                    }).start()
                  }
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
       let transformanimate=this.followanimation.interpolate({
           inputRange:[0,200],
           outputRange:[0,200]
       })
       let centertransX=this.centeranimation.x.interpolate({
           inputRange:[0,200],
           outputRange:[0,200]
       })
       let centertransY=this.centeranimation.y.interpolate({
        inputRange:[0,200],
        outputRange:[0,200]
    })
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Headers onPress={() => { this.pop() }} />
                <View style={{ height:80,justifyContent:'center',width:deviceWidth , backgroundColor:'#607D8B'}} {...this._responser.panHandlers}>
                <Animated.View style={[{},{
                    transform:[{
                        translateX: transformanimate
                    }]
                }]} >
                    <View style={{width:50,height:50,backgroundColor:'#F1C40F'}}>

                    </View>
                </Animated.View>
                </View>
                <View style={{ flex:1,justifyContent:'center',width:deviceWidth , backgroundColor:'#AED581',alignItems:'center'}} {...this._responser1.panHandlers}>
                <Animated.View style={[{},{
                    transform:[
                    {translateX: this.centeranimation.x},
                    {translateY:this.centeranimation.y}]
                }]} >
                    <View style={{width:200,height:200,backgroundColor:'#26C6DA'}}>

                    </View>
                </Animated.View>
                </View>
            </View>
        )
    }
}