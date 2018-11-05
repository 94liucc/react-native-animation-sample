import Orientation from 'react-native-orientation';
import React, { Component } from 'react';

export default class Base extends Component{

    constructor(props){
        super(props)
        this.state={
            orientation :'abc'
        }
    }
    _orientationDidChange = (orientation) => {
        console.log('profilerender======='+orientation)
        // this.num1=Dimensions.get("screen").width+22;
        this.forceUpdate()
        if (orientation === 'LANDSCAPE') {
           
          // do something with landscape layout
        } else {
          // do something with portrait layout
        }
      }
      componentDidMount() {
        //   console.log(ScreenWidtha)
          Orientation.addOrientationListener(this._orientationDidChange);
      }
      componentWillUnmount(){
        Orientation.removeOrientationListener(this._orientationDidChange);
      }
};