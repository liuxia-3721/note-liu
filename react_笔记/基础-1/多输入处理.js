import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component{

  //es7
  state={
    a:1,
    userName:'',
    password:'',
    b:2
  };

  render(){
    return (
      <div>
        <h3>受控元素</h3>
        <input type="text" name="userName" value={this.state.userName} onChange={this.changeLogin.bind(this)}/>
        <br/>
        <input type="text" name="password" value={this.state.password} onChange={this.changeLogin.bind(this)}/>

      </div>
    );
  }


  changeLogin(ev){
    this.setState({
      [ev.target.name]:ev.target.value
    })

  }

}


ReactDom.render(
  <App />,
  document.querySelector('#root')
);