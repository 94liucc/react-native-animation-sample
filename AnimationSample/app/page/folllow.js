import React, { Component } from 'react';
import { Platform, Dimensions, Text, View, PanResponder, Animated, Easing, TouchableOpacity } from 'react-native';
import Headers from '../component/header';
var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');
let CIRCLE_R = 80;
export default class Follow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visiable: false,
      is_limit: false
    }
    this.followanimation = new Animated.ValueXY(0, 0);
    this.coloranimation = new Animated.Value(0)
  }
  componentDidMount() {
    this.changeColor()
  }
  componentWillMount() {
    this._responser = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y} 现在会被设置为0
        this.setState({
          visiable: true,
          touchY: gestureState.y0 - 65
        })
        this.followanimation.setValue({ x: 0, y: 0 });
        this.followanimation.setOffset({ x: gestureState.x0 - CIRCLE_R / 2, y: gestureState.y0 - CIRCLE_R / 2 - 65 })


      },
      onPanResponderMove: Animated.event(
        [null, {
          dx: this.followanimation.x,
          dy: this.followanimation.y,
        }]
      ),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        this.setState({
          visiable: false,
        });
        this.followanimation.setOffset({ x: 0, y: 0 });
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
  changeColor() {
    this.coloranimation.setValue(0)
    Animated.timing(this.coloranimation, {
      toValue: 1,
      duration: 5000,
      easing: Easing.bounce
    }).start(() => { this.changeColor() })
  }

  limit() {
    this.setState({
      is_limit: !this.state.is_limit
    })
  }
  render() {
    let limit = this.state.is_limit;

    var interpolatedColorAnimation = this.coloranimation.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: ['rgba(235, 245, 251,1)', 'rgba(230, 126, 34,1)', 'rgba(27, 79, 114,1)', 'rgba(230, 126, 34,1)', 'rgba(235, 245, 251,1)'],
      extrapolate: 'clamp'
    });
    let translateY = this.followanimation.y.interpolate({
      inputRange: [-CIRCLE_R / 2, 500-CIRCLE_R / 2],
      outputRange: [-CIRCLE_R / 2, 500-CIRCLE_R / 2],
      extrapolate: 'clamp'
    })

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Headers onPress={() => { this.pop() }} />
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <View style={{ width: deviceWidth, height: limit ? 500 : deviceHeight, backgroundColor: limit ? '#f0f0f0' : '#fff' }} {...this._responser.panHandlers}>
            {
              this.state.visiable ?
                <Animated.View style={[{ width: CIRCLE_R, height: CIRCLE_R, borderRadius: CIRCLE_R / 2, backgroundColor: '#000' },
                {
                  transform: [
                    { translateX: this.followanimation.x },
                    { translateY: limit ? translateY : this.followanimation.y },
                  ],
                  backgroundColor: interpolatedColorAnimation
                }
                ]} /> : <View />
            }
          </View>
        </View>
        <TouchableOpacity style={{ position: 'absolute', right: 40, top: 100 }} onPress={() => { this.limit() }}>
          <View style={{ backgroundColor: '#FAD7A0', borderRadius: 6, width: 130, height: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#1E8449' }}>手势限制</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}