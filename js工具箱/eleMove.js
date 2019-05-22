
    function move(ele,json,callBack){
        clearInterval(ele.timer)

            ele.timer=setInterval(function(){       //开启计时器
                var onOff=true;

                for(var attr in json){
                var iNow=attr=="opacity"?getStyle(ele,attr)*100 : parseInt(getStyle(ele,attr));
                var speed=(json[attr]-iNow)/8;

                speed=speed>0?Math.ceil(speed):Math.floor(speed);
                if(json[attr]!=iNow) onOff=false;
                    
                if(attr=="opacity"){
                    ele.style[attr]=(iNow+speed)/100;
                    ele.style.filter = "alpha(opacity="+ (iNow+speed) +")";
                }else{
                    ele.style[attr]=iNow+speed+"px";
                }
                
            }
            if(onOff){
                clearInterval(ele.timer);
                if(callBack) callBack();
            }

        },50)
    }
    
    function getStyle(ele,attr){
        if(ele.currentStyle){
            return ele.currentStyle[attr];
        }else{
            return getComputedStyle(ele,false)[attr];
        }
    }

    
