;(function(){
    window.onresize=function(){     //页面自适应屏幕

        let  a=$(".imgBox").parent().width();
        let  b=$(".imgBox").width();
        let  s=(a-b)/2;
        $(".imgBox").css({left:s})
    } 
    $(window).trigger("resize");



    $(".loginBar").children("#land").on("click",function(){
        location.href="land.html";          //打开登陆页面
    });
    $(".loginBar").children("#reg").on("click",function(){
        location.href="reg.html";          //打开登陆页面
    });


    if($.cookie("goods")){
        let obj=JSON.parse($.cookie("goods"))[0];

        $(".loginBar").children("#reg").on("click",function(){
            if($("#reg").html()=="注册"){
                location.href="reg.html"
            }else{
                obj.user="";
                // console.log()
                $.cookie("goods",JSON.stringify([obj]))
                history.go(0) 
            }                                  //打开注册页面
        })
        if(obj.user){    //用户登陆后  重新设置 登陆/注册 功能
            $(".loginBar").children().eq(0).after("<span>欢迎回来 "+ obj.user+"</span>")
            .next("span").css({color:"#55f"});
            $("#land").remove();
            $("#reg").html("注销").css({color:"#aaa"});
        }
        $(".loginBar").children("em").on("click",function(){
            location.href="../html/shopCar.html"
        })
        let carNum=0;
        for(var i in obj){
            if(obj[i].split("和")[1]){
                carNum+=parseInt(obj[i].split("和")[1])
            }
        }
        $("#loginBar").find("u").html("("+carNum+")");
    }
////////////////////////////////////////////////
    function Fixed(){
        this.change();
        this.jump();
        this.timer="";
    }
    Fixed.prototype.change=function(){

        window.onscroll=function(){
            if(document.documentElement.scrollTop>$("#top").innerHeight()){
                $("#loginBar").css({
                    position:"fixed",
                    top:"0",
                    zIndex:"100"
                });
                let h=$("#loginBar").innerHeight();
                $("#nav").css({
                    position:"fixed",
                    top:h,
                    zIndex:"100"
                })
            }
            if(document.documentElement.scrollTop==0){
                $("#loginBar").css({
                    position:"relative"
                });
                $("#nav").css({
                    position:"relative",
                    top:"0px"
                })
            }
            if(document.documentElement.scrollTop>1000){
                $("#jump").css({display:"block"})
            }else{
                $("#jump").css({display:"none"})
            }
        }
    }
    Fixed.prototype.jump=function(){    //电梯
        let that=this;
        $("#jump").find("li").on("click",function(){
            let index=$(this).index();
            let h=$(".jump").eq(index).offset().top-$("#loginBar").innerHeight()-$("#nav").innerHeight();
            
            if(document.documentElement.scrollTop<h){
                clearInterval(that.timer)
                that.timer=setInterval(function(){
                    document.documentElement.scrollTop+=100;
                    if(document.documentElement.scrollTop>=h){
                        document.documentElement.scrollTop=h;
                        clearInterval(that.timer)
                    }
                },30)
            }
            if(document.documentElement.scrollTop>h){
                clearInterval(that.timer)

                that.timer=setInterval(function(){
                    document.documentElement.scrollTop-=100;
                    if(document.documentElement.scrollTop<=h){
                        document.documentElement.scrollTop=h;
                        clearInterval(that.timer)
                    }
                },30)
            }
        })
    }
    new Fixed()
//  回到顶部的效果 及其 附加效果
    function Return(){
        this.oimg();
        this.odiv()
    }
    Return.prototype.oimg=function(){
        $("#return").children("div").on("mouseover",function(){
            $(this).children("img").css({display:"none"});
            $(this).children("span").css({display:"block"});
        })
        $("#return").children("div").on("mouseout",function(){  //划过 离开  效果
            $(this).children("img").css({display:"block"});
            $(this).children("span").css({display:"none"});
        })

        $("#return").find("span").eq($("#return").find("span").length-1).on("click",function(){     //回到顶部
            $("html").scrollTop(0)
        })
    }
    Return.prototype.odiv=function(){
        if(JSON.parse($.cookie("goods"))){
            let obj=JSON.parse($.cookie("goods"))[0];
            $("#return").find("#msg").after(`<p>亲爱的${obj.user}</p>`);
    
            $("#return").children("div").on("click",function(e){
                e.stopPropagation();
                $(this).children(".zhankai").css({display:"block"})
                console.log(22)
            })
    
            $("html").on("click",function(e){
                e.stopPropagation();
                $(".zhankai").css({display:"none"});
            })
        }
    }
    new Return();
////////////////////////////////////////////////
    function Clother(options){      //从 数据库 取数据 +  渲染
        this.url=options.url;
        this.a=options.a;
        this.ele=options.ele;
        this.type=options.type;
        this.list=options.list;
        this.load();
    }
    Clother.prototype.load=function(){
        let  that=this;
        $.ajax({
            url:this.url,
            type:"get",
            success:function(res){
                var a=that.list;
                that.res=res[that.list].list;
                // console.log(that.res)
                that.change();
                that.display(that.a);
            }
        })
    }
    Clother.prototype.display=function(alb){
        let  addEle=this.ele.append("<div class='box5'>").children("div:last-child");
        let str="";
        if(alb==0){
            this.length=this.res.length/2;
        }else{
            this.length=this.res.length
        }
        for(let i=alb;i<this.length;i++){
            if(this.type==1){
                str+=`<div class="goods" num="${this.res[i].id}">
                        <a  class="a_img">
                            <img src="${this.res[i].a_img}">
                        </a>
    
                        <div class="zhijiang">
                            <div class="word">${this.res[i].word1}</div>
                            <div class="word">${this.res[i].word2}</div>
                        </div>
            
                        <div class="money">
                            <div class="name">${this.res[i].name}</div>
                            <div class="price">${this.res[i].price}</div>
                            <a class="buy_now"><img src="${this.res[i].buy_img}"></a>
                        </div>
                    </div>
                    `
            }else{
                str+=`<div class="goods" num="${this.res[i].id}">
                        <a  class="a_img">
                            <img src="${this.res[i].a_img}">
                        </a>
    
                        <div class="money">
                            <div class="name">${this.res[i].name}</div>
                            <div class="price">${this.res[i].price}</div>
                            <a  class="buy_now"><img src="${this.res[i].buy_img}"></a>
                        </div>
                    </div>
                    `
            }
        }
        addEle.html(str)
        $("div[num]").on("click",function(){
            if($.cookie("goods")){
                let obj=JSON.parse($.cookie("goods"))[0];
                if(obj.user){
                    open("../html/details.html?"+$(this).attr('num'))
                }else{
                    location.href="../html/land.html";
                }
            }else{
                location.href="../html/land.html";
            }
        })
    }
    Clother.prototype.change=function(){
        let that=this;
        this.ele.children(".report").css({
            color:"#fff",
            backgroundSize:"100%",
            fontWeight:"700"
        })
        this.ele.children(".report").eq(0).css({
                                background:"url(../images/shop/card/red.png)",
                                backgroundSize:"100%",
                            }).hover(function(){
                                $(this).css({
                                    background:"url(../images/shop/card/red.png)",
                                    backgroundSize:"100%",
                                });
                                that.ele.children(".report").eq(1).css({
                                    background:"url(../images/shop/card/black.png)",
                                    backgroundSize:"100%",
                                })
                                that.a=0;
                                that.display(that.a)
                            },function(){});

        this.ele.children(".report").eq(1).css({
                                background:"url(../images/shop/card/black.png)",
                                backgroundSize:"100%",
                            }).hover(function(){
                                $(this).css({
                                    background:"url(../images/shop/card/red.png)",
                                    backgroundSize:"100%",
                                });
                                that.ele.children(".report").eq(0).css({
                                    background:"url(../images/shop/card/black.png)",
                                    backgroundSize:"100%",
                                })
                                that.a=that.res.length/2;
                                that.display(that.a)
                                
                            },function(){});
        
    }

    new Clother({                       //衣服部分
        ele:$(".bg_5 .imgBox"),                     
        url:"../json/data.json",
        a:0,
        type:1,
        list:0
    })

    new Clother({  
        ele:$(".bg_12 .imgBox"),                     //篮球部分
        url:"../json/data.json",
        a:0,
        type:2,
        list:2
    })

//////////////////////////////////////////////////////////////

function Group(options){      //从 数据库 取数据 +  渲染
    this.url=options.url;
    this.a=options.a;
    this.list=options.list;
    this.load();
}
Group.prototype.load=function(){
    let  that=this;
    $.ajax({
        url:this.url,
        type:"get",
        success:function(res){
            
            that.res=res[that.list].list;
            // console.log(that.res)
            that.change();
            that.display(that.a);
        }
    })
}
Group.prototype.display=function(alb){
    let  bg7=$(".bg_7 .imgBox").append("<div class='box7'>").children("div:last-child");
    let str="";
    if(alb==0){
        this.length=this.res.length/2;
    }else{
        this.length=this.res.length
    }
    for(let i=alb;i<this.length;i++){
        if(this.res[i].price){
            str+=`
                    <div class="goods" num="${this.res[i].id}">
                        <div class="goodsImg">
                            <img src="${this.res[i].goods_img}">
                            <div class="erwei">
                                <img src="../images/shop/json_group/erwei.png" alt="">
                                <span>微信扫码立即砍价</span>
                            </div>
                        </div>
    
                        <div class="kan">
                            <div class="price">
                                ${this.res[i].price}
                            </div>
                            <img src="${this.res[i].tuan}" class="bgkan">
                            <div class="yuanjia">
                                ${this.res[i].yuanjia}
                            </div>
                            <img src="${this.res[i].kaituan}" class="bgkanjia">
                        </div>
                    </div>
                `
        }else{
            str+=`
                    <div class="goods" >
                        <div class="goodsImg">
                            <img src="${this.res[i].goods_img}">
                            <div class="erwei">
                                <img src="../images/shop/json_group/erwei.png" alt="">
                                <span>微信扫码立即砍价</span>
                            </div>
                        </div>
                    </div>
                `
        }
    }
    bg7.html(str)
    this.erwei();
}
Group.prototype.change=function(){
    let that=this;
    $(".report").css({
        color:"#fff",
        backgroundSize:"100%",
        fontWeight:"700"
    })
    $(".report").eq(2).css({
                            background:"url(../images/shop/card/red.png)",
                            backgroundSize:"100%",
                        }).hover(function(){
                            $(this).css({
                                background:"url(../images/shop/card/red.png)",
                                backgroundSize:"100%",
                            });
                            $(".report").eq(3).css({
                                background:"url(../images/shop/card/black.png)",
                                backgroundSize:"100%",
                            })
                            that.a=0;
                            that.display(that.a)
                        },function(){});

    $(".report").eq(3).css({
                            background:"url(../images/shop/card/black.png)",
                            backgroundSize:"100%",
                        }).hover(function(){
                            $(this).css({
                                background:"url(../images/shop/card/red.png)",
                                backgroundSize:"100%",
                            });
                            $(".report").eq(2).css({
                                background:"url(../images/shop/card/black.png)",
                                backgroundSize:"100%",
                            })
                            that.a=that.res.length/2;
                            that.display(that.a)
                            
                        },function(){});
    
}
Group.prototype.erwei=function(){
    $(".bg_7 .imgBox").on("click",".goodsImg>img",function(){
        $(this).css({display:"none"}).next(".erwei").css({display:"block"})
    })
    $(".bg_7 .imgBox").on("click",".goodsImg .erwei",function(){
        $(this).css({display:"none"}).prev("img").css({display:"block"})
    })
}
new Group({                       //衣服部分
    url:"../json/data.json",
    a:0,
    list:1
})
})();