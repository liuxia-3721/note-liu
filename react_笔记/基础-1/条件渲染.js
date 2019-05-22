import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component{

  //es7
  state={
    bl:true,
  };

  render(){

    let li;

    if (this.state.bl){
      li = <div>一堆元素</div>
    } else {
      li = null;
    }

    return (
      <div>
        <h3>条件渲染</h3>

        {/*条件1*/}
        {this.state.bl ? <div>一堆元素</div> : null}

        <hr/>

        {/*条件2*/}
        {this.state.bl && <div>一堆元素</div>}

        <hr/>

        {/*条件3*/}
        {li}

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