import React from 'react';
import ReactDom from 'react-dom';


class App extends React.Component{
  render(){

    console.log('this',this);


    return (
      <div>
        <div>app的props: {this.props.title}</div>
        <Header title={this.props.title + 7 }/>
      </div>
    );
  }
}

class Header extends React.Component{
  render(){
    return (
      <div>
        <div>header的props: {this.props.title}</div>
        <nav>导航</nav>
      </div>
    )
  }
}


ReactDom.render(
  <App title="bmw" />,
  document.querySelector('#root')
);