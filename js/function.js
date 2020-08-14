//创建cookie
function setCookie(key,value,second=0){
    if(second==0){
        document.cookie=`${key}=${value};path=/`;
        //例：document.cookie="name=zhang;expires=date;path=/"只有一对双引号就够了;
    }else{
        var date=new Date();
        date.setTime(date.getTime()-8*3600*1000+second*1000);
        document.cookie=`${key}=${value};expires=${date};path=/`;
    }
}
//获取cookie的值
function getCookie(key){
    var cookies = document.cookie;
    var arr=cookies.split("; ");
    for(var i=0;i<arr.length;i++){
        var brr=arr[i].split("=");
        if(brr[0]==key){
            return brr[1];
        }
    }
}
//删除根目录cookie的值
function removeCookie(key){
    setCookie(key,"123",-5);
}
//删除当前目录的cookie值
function removeCookiephp(key){
    var date=new Date();
    date.setTime(date.getTime()-8*3600*1000+-60*1000);
    document.cookie=`${key}=${null};expires='${date}'`;
}
//创建AJAX
function setAjax(obj){
    if(obj.url===undefined){//判断地址不能为空
        throw new Error("地址是必填项");
    }
    if(Object.prototype.toString.call(obj.url) !== "[object String]"){//判断地址类型是字符串
        throw new Error("地址类型不对");
    }
    if(obj.method===undefined){//判断地址栏不能为空并且值为get或post
        obj.method="get"
    }else{
        if(obj.method!="get"&&obj.method!="post"){
            throw new Error("请求值必须为get或post");
        }
    }
    if(obj.data!=undefined){//如果传进来的data不为空就将data转为"键=值&键=值"的格式
        if(Object.prototype.toString.call(obj.data) === "[object Object]"){
            var f="";
            var str="";
            for(var attr in obj.data){
                str+=f+attr+"="+obj.data[attr];
                f="&";
            }
            obj.data=str;
        }
    }
    if(obj.method=="get" && obj.data!=undefined){//如果使用的是get方式但又传了值进来那么就将值拼接在地址栏的后面
        obj.url += "?"+obj.data;
    }
    if(obj.async===undefined){//默认操作为异步操作
        obj.async=true;
    }else{
        if(Object.prototype.toString.call(obj.async) !== "[object Boolean]"){
            throw new Error("是否异步只能填写true或是false");
        }
    }
    if(obj.dataType===undefined){//没有传希望的数据类型默认为字符串传了就判断类型对不对
        obj.dataType = "string";
    }else{
        if(obj.dataType!="xml" && obj.dataType!="json" && obj.dataType!="string"){
            throw new Error("希望得到的数据类型的值不对");
        }
    }
    if(obj.success===undefined){//没有传执行成功执行的函数默认值为空函数
        obj.success=function(){}
    }else{
        if(Object.prototype.toString.call(obj.success) !== "[object Function]"){
            throw new Error("成功函数类型不对")
        }
    }
    if(obj.error===undefined){//失败要执行的函数参数处理
        obj.error=function(){}
    }else{
        if(Object.prototype.toString.call(obj.error) !== "[object Function]"){
            throw new Error("失败函数类型不对")
        }
    }
    var xhr=new XMLHttpRequest();
    xhr.open(obj.method,obj.url,obj.async);
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            if(200<=xhr.status<300){
                if(obj.dataType==="string"){
                    var res=xhr.responseText;
                }else if(obj.dataType==="json"){
                    var res=JSON.parse(xhr.responseText);
                }else if(obj.dataType==="xml"){
                    var res=xhr.responseXML;
                }
                obj.success(res);
            }else{
                obj.error();
            }
        }
    }
    if(obj.method=="post"){
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        if(obj.data!="undefined"){
            xhr.send(obj.data);
        }else{
            xhr.send();
        }
        return
    }
    xhr.send();
}
//Promise 与 ajax结合的函数
function PAjax(obj){
    return new Promise(function(resolve,reject){
        setAjax({
            url:obj.url,
            method:obj.method,
            data:obj.data,
            dataType:obj.dataType,
            async:obj.async,
            success:function(res){
                resolve(res);
            },
            error:function(){
                reject();
            }
        })
    });
}
/******************调    用    模     板***********************************************
var p=PAjax({
    url:请求的地址,(必填项)
    method:请求方式get或post,(默认为get)
    data:需要传送的数据,(默认值为空)
    dataType:希望得到的数据类型,(默认值为string)
    async:是否异步执行,(默认值为true异步执行)
    success:function(res){
        resolve(res);
        执行成功将值传给resolve
    },
    error:function(){
        reject();
        失败要执行的函数
    }
});
p.then(function(res){
    成功要执行的函数
})
*/
function move(ele,obj,over){//运动函数
    var setObj={}
    for(let attr in obj){
        if(attr == "opacity"){
            obj[attr] *= 100;
        }
        setObj[attr]=setInterval(function(){
            var l=getComputedStyle(ele)[attr];
            if(attr=="opacity"){
                l=l*100;
            }
            l= parseInt(l);
            var pel=(obj[attr]-l)/50;
            if(pel>0){
                pel=Math.ceil(pel);
            }else{
                pel=Math.floor(pel);
            }
            l=l+pel;
            if(attr=="opacity"){
                l=l/100;
                ele.style[attr]=l;
            }else{
                ele.style[attr]=l+"px";
            }
            if(l==obj[attr]){
                clearInterval(setObj[attr]);
                delete setObj[attr];
                let k=0;
                for(let j in setObj){
                    k++;
                }
                if(k==0){
                    over();
                }
            }
        },10)
    }
}
function setStyle(ele,obj){//setStyle("元素",{键:值,键:值})
    for(var attr in obj){
        ele.style[attr]=obj[attr]
    }
}
function addEventListener(element,type,fn){//addEventListener("事件源","事件名称","回调函数")
    if(element.addEventListener){
      element.addEventListener(type,fn,false);
    }else if(element.attachEvent){
      element.attachEvent("on"+type,fn);
    }else{
      element["on"+type]=fn;
    }
}