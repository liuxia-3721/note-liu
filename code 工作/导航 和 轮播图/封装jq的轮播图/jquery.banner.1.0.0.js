;(function(){
    "use strict"
    //此版本 实现了 各元素间功能的分离与相互依赖，但代码还需要调整和简化，请留意下版本 1.1.0   谢谢。
    $.extend($.fn,{
        banner:function(options){
            this.LOCAL= {
                autoPlay : options.autoPlay ===  false?false:true,
                delayTime : options.delayTime || 3000,
                moveTime : options.moveTime||300,
                index:0,
                iPreve:options.items.lenght-1,
                listOnoff:false,
                
            };
            //list 部分 选项卡
            var that=this;

            if(options.list!=undefined&&options.list.length>0){
                that.LOCAL.listOnoff=true;

                options.list.eq(0).css("background","red")  //设置初始项span的样式

                this.LOCAL.listMove=function(i,type){   //给左右按钮封装函数
                    
                    options.items.eq(that.LOCAL.index).stop().animate({left:-options.items.eq(0).eq(0).width() * type},this.moveTime)
                    .end().eq(i).css({left:options.items.eq(0).width() * type}).stop().animate({left:0},this.moveTime);
                }


                options.list.on("click",function(){     

                    if(that.LOCAL.index<$(this).index()){         //当前图片往左走
                        that.LOCAL.listMove($(this).index(),1)
                    }

                    if(that.LOCAL.index>$(this).index()){        //当前图片往右走
                        that.LOCAL.listMove($(this).index(),-1)     
                    }

                    that.LOCAL.index=$(this).index(); //修改index

                    options.list.eq($(this).index()).css("background","red")  //设置list的属性
                    .siblings().css("background","none") 
                })

            }
            //btn  左右按钮
            if(options.left!=undefined&&options.left.length >0 &&
                options.right!=undefined&&options.right.length>0){

                this.LOCAL.btnMove=function(type){
                    // console.log(this.listOnoff)
                    options.items.eq(that.LOCAL.index).css({left:-options.items.eq(0).width()*type}).stop().animate({left:0},this.moveTime)
                    .end().eq(that.LOCAL.iPreve).stop().animate({left:options.items.eq(0).width() *type},this.moveTime);
                    
                    if(this.listOnoff){

                        options.list.eq(this.index).css("background","red")  //设置list的属性
                        .siblings().css("background","none")
                    }
                }
                
                options.left.on("click",function(){

                    if(that.LOCAL.index==0){
                        that.LOCAL.index=options.items.length-1;   // 当前
                        that.LOCAL.iPreve=0                         // 走掉的
                    }else{
                        that.LOCAL.index--;
                        that.LOCAL.iPreve=that.LOCAL.index+1;
                    }
                    that.LOCAL.btnMove(1)
                    // options.items.eq(that.LOCAL.index).css({left:-options.items.eq(0).width()}).stop().animate({left:0},500)
                    // .end().eq(that.LOCAL.iPreve).stop().animate({left:options.items.eq(0).width()},500);
                    
                    // options.list.eq(that.LOCAL.index).css("background","red")  //设置list的属性
                    // .siblings().css("background","none") 
                })
                
                options.right.on("click",function(){

                    if(that.LOCAL.index==options.items.length-1){
                        that.LOCAL.index=0;                         // 当前
                        that.LOCAL.iPreve=options.items.length-1        // 走掉的
                    }else{
                        that.LOCAL.index++;
                        that.LOCAL.iPreve=that.LOCAL.index-1;
                    }
                    that.LOCAL.btnMove(-1)

                    // options.items.eq(that.LOCAL.index).css({left:options.items.eq(0).width()}).stop().animate({left:0},500)
                    // .end().eq(that.LOCAL.iPreve).stop().animate({left:-options.items.eq(0).width()},500);

                    // options.list.eq(that.LOCAL.index).css("background","red")  //设置list的属性
                    // .siblings().css("background","none")
                }) 
            }
            // auto  是否自动换图
            if(options.autoPlay){

                this.timer=setInterval(function(){
                    options.right.trigger("click")
                },this.LOCAL.delayTime)

                this.hover(function(){
                    clearInterval(that.timer)
                },function(){
                    that.timer=setInterval(function(){
                        options.right.trigger("click")
                    },that.LOCAL.delayTime)
                })
            }
        }
    })
})();