;(function(){

    $(".loginBar").children("#land").on("click",function(){
        location.href="land.html";          //打开登陆页面
    })
    if($.cookie("goods")){
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
        $(".loginBar").children("em").on("click",function(){
            location.href="../html/shopCar.html"
        })
        let carNum=0;
        for(var i in obj){
            if(obj[i].split("和")[1]){
                carNum+=parseInt(obj[i].split("和")[1])
            }
        }
        $("#loginBar").find("u").html("("+carNum+")")
    }
    
    function Rec(){
        this.timer();
        this.setTime()
    }
    Rec.prototype.setTime=function(){
        setInterval(this.timer,1000)
    }
    
    Rec.prototype.timer=function(){
        let d=new Date();
        let dd=new Date(2019,10,11);
        let s=dd-d;
        if(s==0){
            $("dd").children("span").css({textDecoration: "line-through"});
            $("dd").children("p").css({textDecoration: "line-through"});
            $(".treatment").css({color: "#999"});
            $(".date").html("信息已过期，请查证后再拨").css({color:"black"});
        }else{
            let x=(dd-d)/1000;
            let t=parseInt(x/60/60/24)
            let h=parseInt((x-t*24*60*60)/3600)
            let mins=parseInt((x-t*24*60*60-h*60*60)/60)
            let s=parseInt((x-t*24*60*60-h*60*60-mins*60))
            $(".date").html("招聘有效期："+t+"天,"+h+"小时,"+mins+"分钟,"+s+"秒。")
        }
    }
    new Rec();
})()