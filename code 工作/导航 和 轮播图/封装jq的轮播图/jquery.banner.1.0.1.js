;(function(){
    "use strict"
    //轮播图的功能都有实现，但自动播放的功能依赖于 右按钮 ，所以没有有左右按钮的话， 自动播放的功能就会无法产生效果
    //不依赖于 按钮的自动播放的功能 请参考 query.banner.1.0.1.js  谢谢。
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
            //公用功能

            this.LOCAL.btnMove=function(type){      //图片轮播时的 函数  
                // console.log(this.listOnoff)
                options.items.eq(that.LOCAL.index).css({left:-options.items.eq(0).width()*type}).stop().animate({left:0},this.moveTime)
                .end().eq(that.LOCAL.iPreve).stop().animate({left:options.items.eq(0).width() *type},this.moveTime);
                
                if(this.listOnoff){

                    options.list.eq(this.index).css("background","red")  //设置list的属性
                    .siblings().css("background","none")
                }
            }

            this.LOCAL.btnRight=function(){

                if(that.LOCAL.index==options.items.length-1){
                    that.LOCAL.index=0;                         // 当前
                    that.LOCAL.iPreve=options.items.length-1        // 走掉的
                }else{
                    that.LOCAL.index++;
                    that.LOCAL.iPreve=that.LOCAL.index-1;
                }
                that.LOCAL.btnMove(-1)
            }


            /////////////////////////////////////////////////////
            if(options.left!=undefined&&options.left.length >0 &&       //判断是否有左右按钮
                options.right!=undefined&&options.right.length>0){

                options.left.on("click",function(){     //左按钮

                    if(that.LOCAL.index==0){
                        that.LOCAL.index=options.items.length-1;   // 当前
                        that.LOCAL.iPreve=0                         // 走掉的
                    }else{
                        that.LOCAL.index--;
                        that.LOCAL.iPreve=that.LOCAL.index+1;
                    }
                    that.LOCAL.btnMove(1)
                })
                
                options.right.on("click",this.LOCAL.btnRight)   //右按钮
            }


            // auto  是否自动换图
            if(options.autoPlay){

                this.timer=setInterval(that.LOCAL.btnRight
                ,this.LOCAL.delayTime)  // 计时器


                this.hover(function(){
                    clearInterval(that.timer)   //清除计时器
                },function(){
                    that.timer=setInterval(that.LOCAL.btnRight
                    ,that.LOCAL.delayTime)     
                })
            }
        }
    })
})();