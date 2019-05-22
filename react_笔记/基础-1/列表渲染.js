import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component{

  //es7
  state={
    arr:['aa','bb','cc'],
    arr2:[
      {id:1,name:'xxx1'},
      {id:2,name:'xxx2'},
    ],
    arr3:[
      {id:1,name:'xxx1'},
      {id:2,name:'xxx2',child:[
          {id:1,name:'ooo1'},
          {id:2,name:'ooo2'},
        ]},
    ],
    bl:true,
  };

  render(){
    let arr3 = this.state.arr3;
    return (
      <div>
        <h3>列表渲染</h3>
        <ul>
          {
            this.state.arr.map((val,index)=>{
              return <li key={index}>{val}</li>
            })
          }
        </ul>

        <hr/>

        <ul>
          {
            this.state.arr2.map(item=><li key={item.id}>{item.name}</li>)
          }
        </ul>

        <hr/>

        <ul>
          {
            this.state.arr2.map(item=>(
              <li key={item.id}>{item.name}</li>
            ))
          }
        </ul>

        <hr/>

        <ul>
          {
            arr3.map(item=>(
              <li key={item.id}>
                {item.name}/{item.id}
                <ul>
                  {
                    item.child && item.child.map(item=>(
                      <li key={item.id}>{item.id}/{item.name}</li>
                    ))
                  }
                </ul>
              </li>
            ))
          }
        </ul>

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