import React, {Component} from 'react';
import {ScrollView, Modal, Text, View,TouchableOpacity} from 'react-native';
import Base from'../common/basecomponent'
import Slider from 'react-native-slider'
import {Shaders,Node,GLSL} from 'gl-react'
import {Surface} from 'gl-react-native'
export default class WebglExample extends Base{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            value:0.5,
            type:1
        }
    }
    changeState(value,type){
        this.setState({
            visible:value,
            type
        })
    }
    _dismissModal(){
      this.setState({
          visible:false
      })
    }

    render(){
        let shader='';
        let uniform='';
        switch(this.state.type){
            case 1:
            shader=shaders.helloBlue
            uniform={blue:this.state.value}
            break;
            case 2:
            shader=shaders.sdf1
            uniform={time:10}
            break;
            default:
            shader=shaders.helloBlue
            uniform={blue:this.state.value}
            break
        }
        return <Modal
        animationType="slide"
        visible={this.state.visible}
        transparent={false}
        >
         {this.renderHeader(()=>{this._dismissModal()})}
         <View style={{width:deviceWidth,height:deviceHeight,alignItems:'center'}}>          
               <Surface style={{width:200, height:200}}>
                  {/* <Node shader={shaders.helloBlue}
                        uniforms={{blue:this.state.value}}></Node> */}
                        <Node shader={shader}
                        uniforms={uniform}></Node>
               </Surface>
               <Slider
               style={{width:300,height:20,marginTop: 20,}}
               value={0.5}
               minimumValue={0}
               maximumValue={1}
               thumbTintColor='#FFAB91'
               minimumTrackTintColor='#00FFFF'
               maximumTrackTintColor='#607D8B'
               onSlidingComplete={(value)=>{this.setState({value:value})}}
               />
         </View>
        </Modal>
    }
}
const shaders = Shaders.create({
    helloBlue: {
   // uniforms are variables from JS. We pipe blue uniform into blue output color
      frag: GLSL`
  precision highp float;
  varying vec2 uv;
  uniform float blue;
  void main() {
    gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
  }
  ` },
  sdf1:{
    frag: GLSL`
    precision highp float;
varying vec2 uv;
uniform float time;

float smin(float a, float b, float k) {
  float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
  return mix( b, a, h ) - k*h*(1.0-h);
}
float sdSphere(vec3 p, float s) {
  return length(p) - s;
}
float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz)-t.x,p.y);
  return length(q)-t.y;
}
float sdBox(vec3 p, vec3 b) {
  vec3 d = abs(p) - b;
  return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}
vec3 opRep(inout vec3 p, vec3 c) {
  vec3 m = mod(p, c);
  vec3 id = (p - m) / c;
  p = m - 0.5 * c;
  return id;
}

vec2 scene (vec3 p) {
  p.x += time;
  vec3 id = opRep(p, vec3(2.0, 14.0, 4.0));
  p.y += 0.5 + 0.5 * cos(4.3 * (id.x + time) + 1.3 * (id.z + time));
  float rot = time + cos(30.0 * id.x + 123.4 * id.z);
  p.xz *= mat2(
    cos(rot), sin(rot),
    -sin(rot), cos(rot)
  );
  float r = smin(
    mix(sdSphere(p, 0.7), sdBox(p, vec3(0.7)), 0.5 + 0.5 * cos(time + id.x)),
    sdTorus(p.xzy - vec3(0.0, 0.7, 0.0), vec2(0.2, 0.08)),
    0.1
  );
  return vec2(r, id.x);
}
vec3 normal(vec3 p, float smoothness) {
  vec3 n;
  vec2 dn = vec2(smoothness, 0.0);
  return normalize(vec3(
    scene(p + dn.xyy).x - scene(p - dn.xyy).x,
    scene(p + dn.yxy).x - scene(p - dn.yxy).x,
    scene(p + dn.yyx).x - scene(p - dn.yyx).x));
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec3 direction = normalize(vec3(2.0 * uv - 1.0, 1.0));
  float rotY = 0.6;
  direction.zy *= mat2(
    cos(rotY), sin(rotY),
    -sin(rotY), cos(rotY)
  );
  vec3 origin = vec3(0.0, 3.0, 0.0);
  float totalDist = 0.0;
  vec2 res;
  vec3 p;
  for(int i = 0; i < 36; i++) {
    p = origin + direction * totalDist;
    res = scene(p);
    totalDist += res.x;
  }
  vec3 nrml = normal(p, 0.002);
  vec3 materialColor = hsv2rgb(vec3(res.y / 24.0, 0.8, 1.0));
  vec3 light_dir = normalize(vec3(0.2, 1.0, 0.2));
  float diffuse = dot(light_dir, nrml);
  diffuse = diffuse * 0.5 + 0.5;
  vec3 light_color = vec3(0.9, 0.8, 0.7);
  vec3 ambient_color = vec3(0.2, 0.45, 0.6);
  vec3 diffuseLit = materialColor * (diffuse * light_color + ambient_color);
  float fogFactor = smoothstep(10.0, 50.0, totalDist);
  gl_FragColor = vec4(mix(diffuseLit, vec3(0.1), fogFactor), 1.0);
}
    `
  }
  });
  