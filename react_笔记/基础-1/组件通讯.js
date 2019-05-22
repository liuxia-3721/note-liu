import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component{

  constructor(){
    super();
    this.show = this.show.bind(this);
  }

  render(){
    return (
      <div>
        <h3>app</h3>
        <Child msg1={'bmw'} msg2={this.show}></Child>
      </div>
    );
  }

  show(data){
    console.log('父方法',data);
    console.log('父方法',this);
  }

}

class Child extends React.Component{

  render(){
    return (
      <div>
        <h3>Child</h3>
        <div>props:{this.props.msg1}</div>
        <input type="button" value="按钮" onClick={
          ()=>{ this.props.msg2('qq') }
        }/>
      </div>
    );
  }

}

ReactDom.render(
  <App />,
  document.querySelector('#root')
);