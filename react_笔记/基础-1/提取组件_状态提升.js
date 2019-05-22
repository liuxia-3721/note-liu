import React from 'react';
import ReactDom from 'react-dom';
import Input from './components/Input'
import List from "./components/List";
class App extends React.Component{

  //es7
  state={
    user:'',
    content:'',
    list:[
      // {id:1,name:'xxx',content:'xxx1'},
      // {id:2,name:'222',content:'22222'}
    ]
  };

  constructor(){
    super();
    this.send = this.send.bind(this);
    this.delItem = this.delItem.bind(this);
  }

  render(){
    return (
      <div>
        <h3>todolist</h3>
        <input
          type="text"
          name="user"
          value={this.state.user}
          onChange={this.changeMess.bind(this)}
        />
        <br/>
        <input
          type="text"
          name="content"
          value={this.state.content}
          onChange={this.changeMess.bind(this)}
        />
        <br/>
        <Input text="提交" clickHandler={this.send}/>

        <br/>

        <List del={this.delItem} text="干掉" list={this.state.list}/>


      </div>
    );
  }

  delItem(index){

    let arr=[...this.state.list];

    arr.splice(index,1);

    this.setState({
      list:arr
    })
  }

  send(){
    console.log(this);
    this.setState({
      list: this.state.list.concat({
        id:this.state.list.length+1,
        name:this.state.user,
        content:this.state.content
      }),
      user:'',
      content:''
    })
  }

  changeMess(ev){
    this.setState({
      [ev.target.name]:ev.target.value
    })

  }

}


ReactDom.render(
  <App />,
  document.querySelector('#root')
);