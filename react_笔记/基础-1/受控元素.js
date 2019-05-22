import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component{

  //es7
  state={
    a:1,
    ipt:'bmw7',
    b:2
  };

  render(){
    return (
      <div>
        <h3>非受控元素</h3>
        {/*<input type="text" defaultValue="bmw"/>*/}
        <input type="text" defaultValue={this.state.ipt}/>

        <h3>受控元素</h3>
        {/*<input type="text" value={this.state.ipt}/>*/}

        <input type="text" value={this.state.ipt} onChange={this.changeIpt.bind(this)}/>

      </div>
    );
  }


  changeIpt(ev){
    console.log('事件')
    // ev.target.value//vdom

    //修改react状态
    // this.state.ipt = 'xx';//可以改，单不响应式
    // this.setState(对象|函数) 对象 == state 对象  对象合并  Object.asigin({},old,new)
    this.setState({
      ipt:ev.target.value
    })

  }
}

ReactDom.render(
  <App />,
  document.querySelector('#root')
);