;(function(){
    
    $(".loginBar").children("#land").on("click",function(){
        location.href="land.html";          
    })

    let obj=JSON.parse($.cookie("goods"))[0];
    if(!obj.user){
        let str=`
                <tr id="gouwuche">
                    <td >
                        <img src="../images/shop/gouwuche.jpg">
                    </td>
                </tr>` ;
        $("table").children("tbody").html(str);

        let div=document.createElement("dialog");
        div.style.cssText="left:0;right:0;top:0;bottom:0;margin:auto;color:red;display:block";
        div.innerHTML="请登录陆后查看物车，谢谢";
        document.body.appendChild(div);

    }else{
        
    $(".loginBar").children("#reg").on("click",function(){
        if($("#reg").html()=="注册"){
            location.href="reg.html"
        }else{
            obj.user="";
            $.cookie("goods",JSON.stringify([obj]))
            // console.log($.cookie("goods"));         //改变自定义属性
            history.go(0) 
        }                                  //打开注册页面
    })
    if(obj.user){    //用户登陆后  重新设置 登陆/注册 功能
        $(".loginBar").children().eq(0).after("<span>欢迎回来 "+ obj.user+"</span>")
        .next("span").css({color:"#55f"});
        $("#land").remove();
        $("#reg").html("注销").css({color:"#aaa"});
    }

    let carNum=0;
    for(var i in obj){
        if(obj[i].split("和")[1]){
            carNum+=parseInt(obj[i].split("和")[1])
        }
    }
    $("#loginBar").find("u").html("("+carNum+")")
    function Car(options){
        this.url=options.url;
        this.load();
        this.changeGou()
    }
    Car.prototype.load=function(){
        var that = this;
        $.ajax({
            url:this.url,
            type:"get",
            success:function(res){
                that.res=res;
                that.display();
                that.change();
            }
        })
        $(".jiesuan").on("click",function(e){
            e.stopPropagation()
            $("#pay").css({display:"block"})
        })
        $("#pay>span").on("click",function(e){
            e.stopPropagation();
            console.log(1)
            $("#pay").css({display:"none"})
        })
    }
    Car.prototype.display=function(){
        let str = "";
        let obj=JSON.parse($.cookie("goods"))[0];
        for(let i=0;i<this.res.length;i++){
            
            for(let j=0;j<this.res[i].list.length;j++){
                let x=this.res[i].list[j].id//每个商品的id
                if(obj[x]){
                    let num=obj[x].split("和")[1];

                    str+=`
                            <tr liu="${x}">
                                <td>
                                    <span class="gou"></span>
                                    <img src="${this.res[i].list[j].a_img}">
                                </td>
                                <td class="name">${this.res[i].list[j].name}</td>
                                <td class="price">
                                    <p>${this.res[i].list[j].price}</p>
                                    <p>${this.res[i].list[j].yuanjia}</p>
                                </td>
                                <td>
                                    <span class="reduce">-</span><b>${num}</b><span class="add">+</span>
                                </td>
                                <td class="youhui">${(this.res[i].list[j].yuanjia.split("￥")[1]-this.res[i].list[j].price.split("￥")[1])*num}</td>
                                <td class="zhekoujia">￥${this.res[i].list[j].price.split("￥")[1]*num}</td>
                                <td class="remove">删除</td>
                            </tr>
                    `
                    $("table tbody").html(str)
                    $("table tfoot").find("b#num").html("");
                    $("table tfoot").find(".shaona").html("");
                    $("table tfoot").find(".total").html("总价");
                    $("th").children("b").prev("span.gou").css({background:"#444"});
                }
            }

        }
    }

    Car.prototype.change=function(){
        let that=this;

        $("table tbody").on("click","td .reduce",function(){   //   -----减少数量
            let obj=JSON.parse($.cookie("goods"))[0];
            // console.log(obj)
            let x=parseInt($(this).siblings("b").html());
            if(x==1){
                x=1;
                $(this).siblings("b").html(1);
                let l=$(this).parent().parent("tr").attr("liu");
                let y=obj[l].split("和")[1]=x
                obj[l]=l+"和"+y;

                $.cookie("goods",JSON.stringify([obj]));
                that.display()

            }else{
                x-=1;
                $(this).siblings("b").html(x);
                let l=$(this).parent().parent("tr").attr("liu");
                let y=obj[l].split("和")[1]=x
                obj[l]=l+"和"+y;

                $.cookie("goods",JSON.stringify([obj]));
                that.display()
            }
        });
        $("table tbody").on("click","td .add",function(){  //  +++++增加数量
            
            let obj=JSON.parse($.cookie("goods"))[0];
            console.log(obj)
            let x=parseInt($(this).siblings("b").html());
            if(x==99){
                x=99;
                $(this).siblings("b").html(99);
                $(this).siblings("b").html(x);
                let l=$(this).parent().parent("tr").attr("liu");
                let y=obj[l].split("和")[1]=x
                obj[l]=l+"和"+y;

                $.cookie("goods",JSON.stringify([obj]));
                that.display()
                alert("购买上限，请下单后继续购买")
            }else{
                x+=1;
                $(this).siblings("b").html(x);
                let l=$(this).parent().parent("tr").attr("liu");
                let y=obj[l].split("和")[1]=x
                obj[l]=l+"和"+y;
                // console.log(obj)
                $.cookie("goods",JSON.stringify([obj]));
                that.display()
            }

        })
        $("table tbody").on("click","td.remove",function(){ // 数量改变 cookie 改变
            let obj2=JSON.parse($.cookie("goods"))[0];
            let l=$(this).parent("tr").attr("liu");
            // console.log(l)
            obj2[l]="";          // 利用 for in 遍历对象，数量为空的 商品id 删除
            
            let obj={}
            for(var i in obj2){
                if(obj2[i]){
                // console.log(obj[i])
                    obj[i]=obj2[i]
                }
            }

            $.cookie("goods",JSON.stringify([obj]));
            $(this).parent("tr").remove()
            that.display()
        });
              
    }
    Car.prototype.changeGou=function(){

        $("table").on("click","span.gou",function(){        //改变选项
            let zongjia=0;   //总价
            let shaona=0;    // 优惠了多少钱
            let  num=0;      // 购买的总数量
            if($(this).attr("abc")){
                $(this).attr("abc","");
                $(this).css({background:"#444"})
    
                if($(this).next("b").html()=="全选"){
                    $("span.gou").css({background:"#444"}).attr("abc","");
                }
            }else{
                $(this).attr("abc","123");
                $(this).css({background:"url(../images/shop/shopcar/gou.jpg)"})
                if($(this).next("b").html()=="全选"){
                    $("span.gou").css({background:"url(../images/shop/shopcar/gou.jpg)"}).attr("abc","123")
                }
            }
            if($("tbody").find("span.gou[abc=123]").length==$("tbody").children("tr").length){
                $("span.gou").css({background:"url(../images/shop/shopcar/gou.jpg)"}).attr("abc","123")
            }else{
                    $("span.gou").next("b").prev().css({background:"#444"}).attr("abc","")
            }
            for(let i=0;i<$("tbody span.gou[abc=123]").length;i++){
                zongjia+=parseInt( $("tbody span.gou[abc=123]").eq(i).parent().parent().find(".zhekoujia").html().split("￥")[1] );
                shaona+=parseInt( $("tbody span.gou[abc=123]").eq(i).parent().parent().find(".youhui").html() );
                num+=parseInt( $("tbody span.gou[abc=123]").eq(i).parent().parent().find("b").html() );
                console.log(i)
            }
            $(".total").html(zongjia)
            $(".shaona").html(shaona)
            $("b#num").html(num)
        })

    }
    new Car({
        url:"../json/data.json"
    })


    }  //-----------  判断 用户是否在线的 
})();
