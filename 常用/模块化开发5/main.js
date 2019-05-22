require.config({
    baseUrl:"",     //通用的总路径
    paths:{
        a:"./aa",
        b:"./bb"
    }
})


require(["a","b"],function(a,b){
    console.log("加载完成");
     
     a.show(a.data);
     b.show(a.data);

 })