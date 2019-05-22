//日期格式化
var otime=document.getElementById("box")
time()
function time(){

    var d=new Date();
    var y=d.getFullYear();
    var m=d.getMonth();
    var date=d.getDate();
    var day=d.getDay();
    var h=d.getHours();
    var mins=d.getMinutes();
    var s=d.getSeconds();
    function buZero(a){     //补零
    if(a<10){
            return a="0"+a
        }else{
            return a
        }
    }
    switch(day){
        case 0:day="星期日";break;
        case 1:day="星期一";break;
        case 2:day="星期二";break;
        case 3:day="星期三";break;
        case 4:day="星期四";break;
        case 5:day="星期五";break;
        case 6:day="星期六";break;
    }
    otime.innerHTML=y+"年"+buZero(m+1)+"月"+buZero(date)+"日"+day+buZero(h)+":"+buZero(mins)+":"+buZero(s);

}
setInterval(time,1000)







// function createDate(){
// 	var d = new Date()
// 	var y = d.getFullYear()
// 	var m = d.getMonth()
// 	var mydate = d.getDate()
// 	var day = d.getDay()
// 	var h = d.getHours()
// 	var mts = d.getMinutes()
// 	var s = d.getSeconds()
// 	switch(day){
// 		case 0:day = "星期日";break;
// 		case 1:day = "星期一";break;
// 		case 2:day = "星期二";break;
// 		case 3:day = "星期三";break;
// 		case 4:day = "星期四";break;
// 		case 5:day = "星期五";break;
// 		case 6:day = "星期六";break;
// 	}
// 	return  y + "年"+ createZero(m+1) +"月"+ createZero(mydate) +"日 "+ day +" "+ createZero(h) +":"+ createZero(mts) +":"+createZero(s);
// }
// //补零
// function createZero(n){
// 	if(n<10){
// 		return "0"+n
// 	}else{
// 		return n
// 	}
// }






