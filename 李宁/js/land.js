;(function(){
    $(".load1").load("share.html"); // 利用jq的load方法 加载 共有的的头部样式
    $(".load2").load("share2.html"); // 利用jq的load方法 加载 共有的的底部样式

    function random(){
        return Math.round(Math.random()*9000+1000)
    }
    $("#num").val(random()).on("copy",function(e){ // 获得随机验证码  && 验证码无法复制
        e.preventDefault()
    })
    $(".reg").on("click",function(){
        location.href="reg.html";
    })
   
    function Mdiv(type){    //用户 登陆错误时 的提示

        this.div=document.createElement("dialog");
        
        this.div.style.cssText="left:0;right:0;top:0;bottom:0;margin:auto;color:red;"
        document.body.appendChild(this.div);
    }
    Mdiv.prototype.time=function(type){
        var that=this;
        clearTimeout(that.timer)
        this.div.style.display="block";
        switch(type){
            case 1:that.div.innerHTML="验证码有误";break;
            case 2:that.div.innerHTML="用户名密码不符";break;
            case 3:that.div.innerHTML="登陆超时，请刷新页面重试";break;
        }
        if(this.div.style.display=="block"){
            this.timer=setTimeout(function(){
                that.div.style.display="none"
            },2000)
        }
    }
    Mdiv.a=new Mdiv()
////////////////////////////////////////////

    class Land{        //登陆页面
        constructor(){
            this.url="http://www.liyangyf.com/ctrl/login.php";
            this.init()
        }
        init(){
            var that=this;
            $("#btn").on("click",function(){
                if($("#num").val()==$("#num1").val()){
                    that.load()
                }else{
                    Mdiv.a.time(1)
                }
            })
        }
        load(){
            $.ajax({
                url:this.url,
                data:{
                    user:$("#user").val(),
                    pass:$("#pass").val()
                },
                success:function(res){
                    switch(res){
                        case "0":
                            // console.log ( "用户名密码不符");
                            Mdiv.a.time(2)
                            break;
                        case "1":
                        //    console.log("登录失效，请重新登录")
                            Mdiv.a.time(3)
                            break;
                        default:
                            console.log("登录成功")
                            let str=$("#user").val() ;
                            
                            $.cookie("goods",JSON.stringify([{"user":str}]))
                            location.href="shop.lining.html";
                    }
                },
            })
        }
    }
    new Land()
    //cookie的 查取：根据名字，得到值；
    function getCookie(key){
        
        var arr = document.cookie.split("; ");
        for(var i=0;i<arr.length;i++){
            if(arr[i].split("=")[0] == key){
                return arr[i].split("=")[1]
            }
        }
        return "";
    }
    //cookie的  增改：指定的 名字 和 值 ，存放几天， 没有就默认会话级
    function setCookie(key,value,day){
        var d=new Date();
        d.setDate(d.getDate()+day)
        document.cookie=key+"="+value+";expries="+d;
    }
    //cookie的  删除：指定的 名字进行删除 （设置成过去的日期就是删除）
    function removeCookie(key){
        setCookie(key,"nothing",-1);
    }
})();
