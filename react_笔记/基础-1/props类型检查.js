import React from 'react';
import ReactDom from 'react-dom';
import propTypes from 'prop-types';


class App extends React.Component{
  render(){
    console.log(this.props);
    return (
      <div>
        <div>app的props-title: {this.props.title}</div>
        <div>app的props-num: {this.props.num}</div>
        <div>app的props-arr: {this.props.arr}</div>
      </div>
    );
  }
}

//默认值
App.defaultProps={
  title:'qq',
  num:0,
  arr:[]
};

//类型约定
App.propTypes={
  title: propTypes.string,
  num: propTypes.number,
  arr: propTypes.array
};



ReactDom.render(
  <App title={12}  />,
  document.querySelector('#root')
);