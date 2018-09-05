import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native';
import Headers from '../component/header'
export default class Animation extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.mainAnimate = new Animated.Value(0);
        this.Animate1 = new Animated.Value(1);
        this.Animate2 = new Animated.Value(1)
        this.Animate3 = new Animated.Value(1)
        this.Animate4 = new Animated.Value(1)
        this.Animate5 = new Animated.Value(1)
        this.DataMap = [];
        this.initedata()
    }
    componentDidMount() {
        this.startAnimate()
    }
    pop = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{  flex: 1, backgroundColor: '#fff' }}>
                <Headers onPress={() => { this.pop() }} />
                <View style={{flex:1,justifyContent: 'center', alignItems: 'center',}}>
                    <View style={{ width: 200, height: 500, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            this.DataMap.map((value, index) =>
                                <Animated.View style={{
                                    transform: [{
                                        translateX: value.animate.interpolate({
                                            inputRange: [0, 60],
                                            outputRange: [-100, 0]
                                        })
                                    }]

                                }}>
                                    <TouchableOpacity style={{ width: 160, height: 50, backgroundColor: value.bg, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}
                                        onPress={() => { this.itemPress(index) }}>
                                        <Text style={{ fontSize: 20, color: '#fafafa' }}>{value.title}</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            )
                        }
                    </View>
                </View>
            </View>
        )
    }
    itemPress(index) {
        switch (index) {
            case 0:
                this.props.navigation.navigate('Follow')
                break;
            case 1:
                this.props.navigation.navigate('Spring')
                break;
            case 2:
                this.props.navigation.navigate('Decay')
                break;
            case 3:
                this.props.navigation.navigate('Lottie')
                 break    
        }
    }
    startAnimate() {
        Animated.timing(
            this.mainAnimate,
            {
                toValue: 60,
                duration: 800,
                easing: Easing.linear,
            }
        ).start()
        Animated.timing(
            this.Animate1,
            {
                toValue: 60,
                duration: 800,
                easing: Easing.linear,
                delay: 100
            }
        ).start()
        Animated.timing(
            this.Animate2,
            {
                toValue: 60,
                duration: 800,
                easing: Easing.linear,
                delay: 200
            }
        ).start()
        Animated.timing(
            this.Animate3,
            {
                toValue: 60,
                duration: 800,
                easing: Easing.linear,
                delay: 300
            }
        ).start()
        Animated.timing(
            this.Animate4,
            {
                toValue: 60,
                duration: 800,
                easing: Easing.linear,
                delay: 400
            }
        ).start()
        Animated.timing(
            this.Animate5,
            {
                toValue: 60,
                duration: 800,
                easing: Easing.linear,
                delay: 500
            }
        ).start()
    }
    initedata() {
        this.DataMap.push({
            title: '手势跟随',
            bg: '#4DD0E1',
            animate: this.mainAnimate
        })
        this.DataMap.push({
            title: '弹性动画',
            bg: '#996699',
            animate: this.Animate1
        })
        this.DataMap.push({
            title: '渐停动画',
            bg: '#1976D2',
            animate: this.Animate2
        })
        this.DataMap.push({
            title: 'Lottie',
            bg: '#FBC02D',
            animate: this.Animate3
        })
        this.DataMap.push({
            title: '无',
            bg: '#BDBDBD',
            animate: this.Animate4
        })
        this.DataMap.push({
            title: '无',
            bg: '#00ACC1',
            animate: this.Animate5
        })
    }
}

