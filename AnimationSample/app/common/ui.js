import {
    PixelRatio, 
    Dimensions, 
    Platform, 
    StatusBar
}from 'react-native';
class GetDimensions {
    get ScreenWidth() {return Dimensions.get("screen").width;}
    get ScreenHeight() {return Dimensions.get("screen").height;}
}
let Dimen=new GetDimensions();
let num11=Dimensions.get("screen").width+22;


// export default Dimen;
export function ScreenWidth(){
    return  Dimensions.get("screen").width;
}
export function Viewstyle(){
    return {
        width:ScreenWidth(),
        height:5,
        backgroundColor:'#F7DC6F'
        ,margin:5
    }
}
export var num1=Dimen.ScreenWidth; 