;(function(){

    let obj=JSON.parse($.cookie("goods"))[0];

    $(".loginBar").children("#reg").on("click",function(){
        if($("#reg").html()=="注册"){
            location.href="reg.html"
        }else{
            obj.user="";
            // console.log()
            $.cookie("goods",JSON.stringify([obj]))
            console.log($.cookie("goods"));         //改变自定义属性
            history.go(0) 
        }                                  //打开注册页面
    })
    if(obj.user){    //用户登陆后  重新设置 登陆/注册 功能
        $(".loginBar").children().eq(0).after("<span>欢迎回来 "+ obj.user+"</span>")
        .next("span").css({color:"#55f"});
        $("#land").remove();
        $("#reg").html("注销").css({color:"#aaa"});
    }
    
    // let num=location.search.split("?")[1]
    // let num=location.search.substring(1,)
    // let num=location.search.substr(1,location.search.length-1)
    // let res=/\d/g
    // let num=location.search.match(res).toString()
    function Ready(options){
        this.url=options.url;
        this.num=options.num;

        this.load()
    }
    Ready.prototype.load=function(){
        let that=this;
        $.ajax({
            url:this.url,
            type:"get",
            success:function(res){
                that.data=res;
                that.display();
            }
        })
    }
    Ready.prototype.display=function(){
        // console.log(this.data)
        for(let i=0;i<this.data.length;i++){

            for(let j=0;j<this.data[i].list.length;j++){

               if(this.num==this.data[i].list[j].id){
                    let str="";
                    str=`
                    <div class="goodsImg">
                        <img src="${this.data[i].list[j].a_img}">
                        <img src="${this.data[i].list[j].a_img}" class="bigbg">
                        
                    </div>

                    <div class="introduce">
                    
                            <h3>[ ${this.data[i].list[j].name} ]</h3>
                            <p class="baoyou">全场满99包邮 部分地区除外    此商品满259减20，满500减50，详情点击</p>
                            <div class="price">
                                <p><span>商品编码:</span>AYPP077-${this.num}</p>
                                <p><span>吊牌价:</span><u>${this.data[i].list[j].price}</u></p>
                                <p><span>销售价:</span><b>${this.data[i].list[j].yuanjia}</b></p>
                                <p><span>折扣:</span><i>
                                                ${Math.round((this.data[i].list[j].price.split("￥")[1]/this.data[i].list[j].yuanjia.split("￥")[1])*100)+"%"}
                                                (节省:￥${this.data[i].list[j].yuanjia.split("￥")[1]-this.data[i].list[j].price.split("￥")[1]})
                                                </i></p>
                            </div>
                            <div>
                                <dl class="change change1">
                                    <dt>选择颜色:</dt>
                                    <dd></dd>
                                    <dd></dd>
                                    <dd></dd>
                                    <dd></dd>
                                </dl>
                                <dl class="change change2">
                                    <dt>选择尺码:</dt>
                                    <dd>S</dd>
                                    <dd>M</dd>
                                    <dd>L</dd>
                                    <dd>XL</dd>
                                </dl>
                            </div>
                            <p class="buy">我 要 买：<span class="reduce">-</span><b>1</b><span class="add">+</span></p>
                            <span class="now money"> 立即购买</span>
                            <span class="car money"> 添加购物车</span>
                            <span class="jump money"> 跳转购物车</span>
                        
                    </div>
                    `
                    $("#goods").html(str);
                    this.shopCar();
                    return ;
               }
            }
        }

    }
    Ready.prototype.shopCar=function(){
        var that=this;
        $("#goods").on("click",".reduce",function(e){  //减少数量
            e.stopPropagation()
           let x=parseInt($(this).parent().children("b").html());
           if(x==1){
                $(this).parent().children("b").html(1)
           }else{
               $(this).parent().children("b").html(x-=1)
           }

        });
        $("#goods").on("click",".add",function(e){  //增加数量
            e.stopPropagation()
            let x=parseInt($(this).parent().children("b").html());
            if(x==99){
                 $(this).parent().children("b").html(99)

            }else{
                $(this).parent().children("b").html(x+=1)

            }
         });
         $("#goods").on("click",".car",function(){  // 添加到购物车

            // let user=$(".loginBar").children("span").eq(0).html().split(" ")[1];
            let obj=JSON.parse($.cookie("goods"))[0];
                // let a=that.num+'和'+$("#goods .buy b").html()
                obj[that.num]=that.num+'和'+$("#goods .buy b").html(); 
                console.log(obj)
            $.cookie("goods",JSON.stringify([obj]))     //商品和数量存到cookie上;


            let div=document.createElement("dialog");
            div.style.cssText="left:0;right:0;top:0;bottom:0;margin:auto;color:red;display:block";
            div.innerHTML="添加成功";
            document.body.appendChild(div);
            setTimeout(function(){
                div.remove();
            },800)
            
         });
         $("#goods").on("click",".jump",function(){  // 添加到购物车

            open("../html/shopCar.html")
         })

    }
    new Ready({
        url:"../json/data.json",
        num:location.search.split("?")[1]
    })

    function Choice(){   //选项卡 
        this.talk();
        this.wenda()
    }
    Choice.prototype.talk=function(){   //  clikc 更换
        $(".show .say").children("p").on("click",function(){
            $(this).css({marginBottom: "-3px",boxShadow: "1px 1px 1px",background:"#0a0"});
            $(this).siblings().css({marginBottom: "0px;",boxShadow: "none",background:"none"});
            let index=$(this).index()
            // console.log(index)
            $(".show .list").children("li").eq(index).css({display:"block"}).siblings("li").css({display:"none"})
        })
    }

    Choice.prototype.wenda=function(){
        $(".show ul").on("mouseover",".three>ul>li",function(){
            let index=$(this).index()
            console.log($(".three dd"))
            $(".three dd").eq(index).css({display:"block"}).siblings().css({display:"none"})
        })
    }
    new Choice()

    function Big(){                 //     放大镜效果    事件委托
        this.display();
    }
    Big.prototype.display=function(){
        $("#goods").on("click",".goodsImg>img",function(e){
            e.stopPropagation()

            $(".bigbg").css({display:"block"})
        })
        $("html").on("click",function(e){
            e.stopPropagation()
            $(".bigbg").css({display:"none"});
            console.log(1)
        })
        // console.log($("goodsImg"))
    }

    new Big();
})();
