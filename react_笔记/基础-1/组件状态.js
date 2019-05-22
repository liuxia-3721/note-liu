import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component{

  //es7
  /*state={
    str:'bmw',
    num:110,
    arr:['aa','bb','cc'],
    json:{a:1,b:2},
    bl:true
  };*/

  constructor(){
    super();
    //es6 组件状态
    this.state={
      str:'bmw',
      num:110,
      arr:['aa','bb','cc'],
      json:{a:1,b:2},
      bl:true,
      nu:null,
      un:undefined,
      zero:0,
      str2:''
    }
  }

  render(){
    return (
      <div>
        <h3>组件状态</h3>
        <div>字符:{this.state.str}</div>
        <div>数字:{this.state.num + 9}</div>
        <div>数组:{this.state.arr}</div>
        <div>对象:{this.state.json.a}/{this.state.json.b}</div>
        <div>布尔:{this.state.bl}</div>
        <div>nu:{this.state.nu}</div>
        <div>un:{this.state.un}</div>
        <div>zero:{this.state.zero}</div>
        <div>str2:{this.state.str2}</div>
      </div>
    );
  }

  show(){

  }

}


ReactDom.render(
  <App />,
  document.querySelector('#root')
);