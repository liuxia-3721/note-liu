import React from 'react';
console.log(React);
import ReactDom from 'react-dom';

//react组件 == 类  要求 继承到react

/*class App extends React.Component{
  render(){
    let hello = <div>hello</div>;
    return hello;
  }
}*/

class App extends React.Component{
  render(){
    return (
      <div>
        <h3>标题</h3>
        <p>段落</p>
        <hr/>
      </div>
    );
  }
}

ReactDom.render(
  <App></App>,
  document.querySelector('#root')
);