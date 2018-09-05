import React, { Component } from 'react';
import { Platform, Dimensions, Text, View, PanResponder, Animated, Easing, TouchableOpacity } from 'react-native';
import Headers from '../component/header';
import LottieView from 'lottie-react-native';
var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');
export default class Lottie extends Component {
    pop = () => {
        this.props.navigation.goBack()
    }
    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
        };
    }

    componentDidMount() {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
        }).start();
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Headers onPress={() => { this.pop() }} />
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <LottieView style={{width:300,height:300,justifyContent: 'center', alignItems: 'center', }} source={require('../lottie/LineAnimation')} progress={this.state.progress} />
                </View>

            </View>
        )
    }
}