
    function move(ele,json,callBack){
        clearInterval(ele.timer)

            ele.timer=setInterval(function(){       //开启计时器
                var onOff=true;
                var speed=20;

                for(var attr in json){
                    var iNow=parseInt(getStyle(ele,attr));

                    if(json[attr]!=iNow) onOff=false;
                        
                    if(speed>json[attr]-iNow){
                        ele.style[attr]=parseInt(json[attr])+"px"
                        clearInterval(ele.timer)
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

    
