import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component{

  constructor(){
    super();

    this.show3 = this.show3.bind(this);//this修正 √
  }

  render(){
    return (
      <div>
        <input type="button" value="按钮" onClick={this.show.bind(this, 12)} />
        <input type="button" value="按钮2" onClick={()=>{this.show2()}} />
        <input type="button" value="按钮3" onClick={this.show3} />
        <input type="button" value="按钮33" onClick={this.show3.bind(window)} />
      </div>
    );
  }

  show(arg,ev){
    // console.log('show',this)
    console.log('show',arg,ev)
  }
  show2(){
    console.log('show2',this)
  }
  show3(){
    console.log('show3',this)
  }
}


ReactDom.render(
  <App />,
  document.querySelector('#root')
);