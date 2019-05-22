import React from 'react';
import ReactDom from 'react-dom';


class App extends React.Component{
  render(){
    return (
      <div>
        <Header/>
        <Wrap></Wrap>
        <Footer></Footer>
      </div>
    );
  }
}

class Header extends React.Component{
  render(){
    return (
      <nav>导航</nav>
    )
  }
}

class Wrap extends React.Component{
  render(){
    return (
      <div>内容</div>
    )
  }
}

class Footer extends React.Component{
  render(){
    return (
      <div>页脚</div>
    )
  }
}

ReactDom.render(
  <App/>,
  document.querySelector('#root')
);