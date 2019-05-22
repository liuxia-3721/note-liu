import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component{

  //es7
  state={
    bl:true,
    msg2:'父数据'
  };

  render(){
    return (
      <div>
        <h3>refs</h3>
        <div>{this.state.msg2}</div>
        <div ref="d1">box</div>
        <Child ref="c1" msg2={this.state.msg2}></Child>

        <input type="button" value="抓取并修改子" onClick={this.show.bind(this)}/>

      </div>
    );
  }

  show(){
    console.log(this.refs);
    this.refs.d1.style.background='red';//dom操作
    console.log(this.refs.c1);//子组件
    console.log('抓取子组件数据',this.refs.c1.state.msg);
    this.refs.c1.state.msg = '父修改子后的数据';//×
    this.refs.c1.show();
  }

}

class Child extends React.Component{
  state={
    msg:'子数据'
  };
  render(){
    return (
      <div>
        <h3>child</h3>
        {this.state.msg}
        <br/>
        {this.props.msg2}
        <br/>
        <input type="button" value="修改props" onClick={()=>{
          this.props.msg2='qq'//不可以修改 ×
        }}/>
      </div>
    )
  }
  show(){console.log('子方法')}
}


ReactDom.render(
  <App />,
  document.querySelector('#root')
);