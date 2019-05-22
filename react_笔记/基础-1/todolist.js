import React from 'react';
import ReactDom from 'react-dom';

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
        <input type="button" value="提交" onClick={this.send.bind(this)}/>

        <br/>

        <ul>
          {
            !this.state.list.length && <li>暂无数据</li>
          }
          {
            this.state.list.map((item,index)=>(
              <li key={item.id}>
                <span>{item.content}</span>
                ---
                <em>{item.name}</em>
                <a href="javascript:;" onClick={this.del.bind(this,index )}>删除</a>
              </li>
            ))
          }
        </ul>

      </div>
    );
  }

  del(index){

    let arr=[...this.state.list];

    arr.splice(index,1);

    this.setState({
      list:arr
    })
  }

  send(){
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