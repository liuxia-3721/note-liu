require(["./aa.js","./bb.js"],function(a,b){
    console.log("加载完成");
     
     a.show(a.data);
     b.show(a.data);

 })