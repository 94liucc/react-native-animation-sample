import React, { Component } from 'react';
import { Platform, Dimensions, Text, View, PanResponder, Animated, Easing, WebView } from 'react-native';
import Headers from '../component/header';
var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');
export default class Webcanvas extends Component {
    
    pop = () => {
        this.props.navigation.goBack()
    }
    
   render(){
   const html=`
  
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        body{
            padding:0;
            margin:0;
            overflow: hidden;
        }
        #cas{
            display: block;
            background-color:rgba(0,0,0,0);
            margin:auto;
            border:1px solid;
        }
    </style>
    <title>测试</title>
</head>
<body>
    <div >
        <canvas id='cas' width="800" height="600">浏览器不支持canvas</canvas>
        <div style="text-align:center">1000个圈圈对象也不卡</div>
    </div>
 
    <script>
        var testBox = function(){
            var canvas = document.getElementById("cas"),
                ctx = canvas.getContext('2d'),
                borderWidth = 2,
                Balls = [];
            var ball = function(x , y , vx , vy , useCache){
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.r = getZ(getRandom(20,40));
                this.color = [];
                this.cacheCanvas = document.createElement("canvas");
                this.cacheCtx = this.cacheCanvas.getContext("2d");
                this.cacheCanvas.width = 2*this.r;
                this.cacheCanvas.height = 2*this.r;
                var num = getZ(this.r/borderWidth);
                for(var j=0;j<num;j++){
                    this.color.push("rgba("+getZ(getRandom(0,255))+","+getZ(getRandom(0,255))+","+getZ(getRandom(0,255))+",1)");
                }
                this.useCache = useCache;
                if(useCache){
                    this.cache();
                }
            }
 
            function getZ(num){
                var rounded;
                rounded = (0.5 + num) | 0;
                // A double bitwise not.
                rounded = ~~ (0.5 + num);
                // Finally, a left bitwise shift.
                rounded = (0.5 + num) << 0;
 
                return rounded;
            }
 
            ball.prototype = {
                paint:function(ctx){
                    if(!this.useCache){
                        ctx.save();
                        var j=0;
                        ctx.lineWidth = borderWidth;
                        for(var i=1;i<this.r;i+=borderWidth){
                            ctx.beginPath();
                            ctx.strokeStyle = this.color[j];
                            ctx.arc(this.x , this.y , i , 0 , 2*Math.PI);
                            ctx.stroke();
                            j++;
                        }
                        ctx.restore();
                    } else{
                        ctx.drawImage(this.cacheCanvas , this.x-this.r , this.y-this.r);
                    }
                },
 
                cache:function(){
                    this.cacheCtx.save();
                    var j=0;
                    this.cacheCtx.lineWidth = borderWidth;
                    for(var i=1;i<this.r;i+=borderWidth){
                        this.cacheCtx.beginPath();
                        this.cacheCtx.strokeStyle = this.color[j];
                        this.cacheCtx.arc(this.r , this.r , i , 0 , 2*Math.PI);
                        this.cacheCtx.stroke();
                        j++;
                    }
                    this.cacheCtx.restore();
                },
 
                move:function(){
                    this.x += this.vx;
                    this.y += this.vy;
                    if(this.x>(canvas.width-this.r)||this.x<this.r){
                        this.x=this.x<this.r?this.r:(canvas.width-this.r);
                        this.vx = -this.vx;
                    }
                    if(this.y>(canvas.height-this.r)||this.y<this.r){
                        this.y=this.y<this.r?this.r:(canvas.height-this.r);
                        this.vy = -this.vy;
                    }
 
                    this.paint(ctx);
                }
            }
 
            var Game = {
                init:function(){
                    for(var i=0;i<1000;i++){
                        var b = new ball(getRandom(0,canvas.width) , getRandom(0,canvas.height) , getRandom(-10 , 10) ,  getRandom(-10 , 10) , true)
                        Balls.push(b);
                    }
                },
 
                update:function(){
                    ctx.clearRect(0,0,canvas.width,canvas.height);
                    for(var i=0;i<Balls.length;i++){
                        Balls[i].move();
                    }
                },
 
                loop:function(){
                    var _this = this;
                    this.update();
                    RAF(function(){
                        _this.loop();
                    })
                },
 
                start:function(){
                    this.init();
                    this.loop();
                }
            }
 
            window.RAF = (function(){
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {window.setTimeout(callback, 1000 / 60); };
            })();
 
            return Game;
        }();
 
        function getRandom(a , b){
            return Math.random()*(b-a)+a;
        }
 
        window.onload = function(){
            testBox.start();
        }
    </script>
</body>
</html>`



       return <View style={{flex:1,backgroundColor:'#fff'}}>
       <Headers onPress={() => { this.pop() }} />
       <WebView
       style={{width:deviceWidth,height:deviceHeight}}
       originWhitelist={['*']}
       bounces={true}
	   domStorageEnabled={true}
       javaScriptEnabled={true}
       scrollEnabled={false}
       allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        source={{
            // baseUrl: "file://" + RNFetchBlob.fs.dirs.DocumentDir + '/' + FileConfig.dirAssets + "/",
             html: html
        }}
       />
       </View>
   }
}