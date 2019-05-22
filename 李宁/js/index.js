;(function(){
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
                $.cookie("goods",JSON.stringify([obj]))aa
                console.log($.cookie("goods"));         
                history.go(0) 
            }                                  
        })
        if(obj.user){   
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

    $("#banner").banner({
        items:$("#banner").children(".imgBox").children("img"),
        left:$("#banner .btns").children(".left"),   
        right:$("#banner .btns").children(".right"),  
        list:$("#banner .list").children("span"),   
        autoPlay:false,                    
        delayTime:3500,                   
        moveTime:200,                   
        autoPlay:true                  
    })

    $(".imgBox").children("img").on("click",function(){
        location.href="../html/shop.lining.html"
    })
    window.onresize=function(){     //页面自适应屏幕
        location.reload()
    } 
})();