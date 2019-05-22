//es6 类
/*
class App {
  constructor(arg){
    this.xx=12;//定义实例属性
  }
  show(){
    console.log('实例方法')
  }
}

App.VERSION='3.2.1';
App.show2=function(){
  console.log('类方法|静态方法')
};

let app = new App(12);
app.show();
console.log(app.xx);
app.xx = 121;

console.log(App.VERSION);
App.show2();


class Child extends App{
  constructor(){
    super();
    this.xxx='qq';
  }
  showshow(){console.log('实例方法')}
}

Child.ooo='3.2.1';
Child.showshow2=function(){
  console.log('类方法|静态方法')
};

let child = new Child();
child.xx;
child.xxx;
child.show();
child.showshow();

Child.ooo;
Child.showshow2();
*/
//  实例继承实例 方法继承方法

//es7类        类是自身   实列是被类new出的  

class App {
  // 实例属性 = 值

  xx = 12;
  show(){console.log('实例方法')}
  
  static VERSION = '3.2.1'; //类属性|静态属性
  static showshow(){console.log('静态方法|类方法')}       //static 可以约定 类的属性（静态属性）及方法 

}

let app = new App();
app.show();
console.log(app.xx);

console.log(App.VERSION);
App.showshow();



//java == ts

/*class App {
  //实例属性
  // 实例属性 = 值
  xx:number = 12;
  public xxx:number = 12;
  readonly xxxx:number = 12;
  show(){console.log('实例方法')}

  static VERSION = '3.2.1'; //类属性|静态属性
  static showshow(){console.log('静态方法|类方法')}

}*/
























