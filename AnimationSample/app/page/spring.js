import React, { Component } from 'react';
import { Platform, Dimensions, Text, View, PanResponder, Animated, Easing, TouchableOpacity } from 'react-native';
import Headers from '../component/header';
var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');
export default class Spring extends Component {
    constructor(props) {
        super(props)
        this.spring_1 = new Animated.Value(0)
    }
    componentDidMount() {
        // Animated.sequence([
        //     Animated.timing(
        //         this.spring_1,{
        //             toValue:200,
        //             duration:2000
        //         }
        //     ),
        //     Animated.spring(
        //         this.spring_1,
        //         {   toValue:200,
        //             friction:0.7,
        //             duration:2000
        //         }
        //     ),
        // ]).start()
    }
    pop = () => {
        this.props.navigation.goBack()
    }
    onpress1() {
        this.spring_1.setValue(-20)
        Animated.spring(
            this.spring_1,
            {
                toValue: 0,
                friction: 0.8,
                tension: 20
            }
        ).start()
    }
    render() {
        let translate1 = this.spring_1.interpolate({
            inputRange: [-20, 20],
            outputRange: [-20, 20],
            // extrapolate: 'clamp'
        })
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Headers onPress={() => { this.pop() }} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <TouchableOpacity onPress={() => { this.onpress1() }}>
                        <Animated.View style={[{ width: 50, height: 50, backgroundColor: '#26C6DA' },
                        {
                            transform: [
                                { translateX: translate1 }
                            ]
                        }]} />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}