;(function(){
    $(".load1").load("share.html"); // 利用jq的load方法 加载 共有的的头部样式
    $(".load2").load("share2.html"); // 利用jq的load方法 加载 共有的的底部样式

    function random(){
        return Math.round(Math.random()*9000+1000)
    }
    $("#num").val(random()).on("copy",function(e){ // 获得随机验证码  && 验证码无法复制
        e.preventDefault()
    })
    $(".land").on("click",function(){
        location.href="land.html";
    })
    $("#pass2").val("赶紧注册登陆吧。。").css({color:"#f0f"});

    class Reg{        //登陆页面
        constructor(){
            this.url="http://www.liyangyf.com/ctrl/register.php";
            this.init()
        }
        init(){
            var that=this;
            $("#btn").on("click",function(){
                if($("#num1").val()!=$("#num").val()){
                    $("#pass2").val("输入正确的验证码才能提高安全性哦").css({color:"red"});
                    setTimeout(function(){
                        $("#pass2").val("赶紧注册登陆吧。。").css({color:"#f0f"});
                    },3000)

                }else{
                    that.load()
                }
            })
        }
        load(){
            $.ajax({
                url:this.url,
                data:{
                    tel:$("#user").val(),
                    pass:$("#pass1").val()
                },
                success:function(res){
                    switch(res){
                        case "0":
                        $("#pass2").val("用户名 不合法/重名").css({color:"red"});
                            break;
                        case "1":
                            $("#pass2").val("注册成功，3秒之后调转到登录").css({color:"#0f0"});
                            setTimeout(() => {
                                location.href = "land.html";
                            }, 3000);
                            break;
                        case "2":
                        $("#pass2").val("请输入完整的信息").css({color:"red"});
                            break;
                    }
                },
            })
        }
    }
    new Reg()
 
})();
