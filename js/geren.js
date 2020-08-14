/*通过cookie判断登录*/
if(!getCookie("username")){
    alert("此页面登录后可见");
    location.href = './denglu.html';
}
/*获取个人信息*/
var xinxi=PAjax({
            url:"../server/xinxi.php",
            method:"post",
            data:{
                name:getCookie("rem_username"),
            },
            dataType:"json",
});
/*获取到的个人信息展示在页面上*/
xinxi.then(function(res){
    document.querySelector(".tou img").src="../images/"+res.tou;
    document.querySelector(".username em").innerHTML=res.name;
    document.querySelector(".sex>span").innerHTML=res.sex;
    document.querySelector(".qian>span").innerHTML=res.ge;
    document.querySelector(".map>span").innerHTML=res.diqu;
    document.querySelector(".work>span").innerHTML=res.work;
})
/*获取所有信息后面的修改按钮*/
var sex=document.querySelector(".sex b");
var qian=document.querySelector(".qian b");
var map=document.querySelector(".map b");
var work=document.querySelector(".work b");
var username=document.querySelector(".username b");
var tou=document.querySelector(".tou span");
/*分别给修改按钮设置功能*/
tou.onclick=function(){
    var touurl=prompt("将图片放到images文件夹,并在此输入图片名字");
    if(touurl){
        document.querySelector(".tou img").src="../images/"+touurl;
        setCookie("tou",touurl,7200,"/");
        PAjax({
            url:"../server/geren.php",
            method:"post",
            data:{
                name:getCookie("rem_username"),
                touurl:touurl,
            }
        });
    }
}
sex.onclick=function(){
   f1.call(this);
   this.parentElement.parentElement.children[4].onclick=function(){
        var text=this.previousElementSibling.previousElementSibling.value;
        PAjax({
            url:"../server/geren.php",
            method:"post",
            data:{
                name:getCookie("rem_username"),
                sex:text,
            }
        });
        this.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML=this.previousElementSibling.previousElementSibling.value
        this.previousElementSibling.previousElementSibling.style.display="none";
        this.style.display="none";
        this.nextElementSibling.style.display="none";
        this.previousElementSibling.previousElementSibling.previousElementSibling.style.display="inline-block"
    }
}
qian.onclick=function(){
   f1.call(this);
   this.parentElement.parentElement.children[4].onclick=function(){
        var text=this.previousElementSibling.previousElementSibling.value;
        PAjax({
            url:"../server/geren.php",
            method:"post",
            data:{
                name:getCookie("rem_username"),
                ge:text,
            }
        });
        this.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML=this.previousElementSibling.previousElementSibling.value
        this.previousElementSibling.previousElementSibling.style.display="none";
        this.style.display="none";
        this.nextElementSibling.style.display="none";
        this.previousElementSibling.previousElementSibling.previousElementSibling.style.display="inline-block"
    }
}
map.onclick=function(){
   f1.call(this);
   this.parentElement.parentElement.children[4].onclick=function(){
        var text=this.previousElementSibling.previousElementSibling.value;
        PAjax({
            url:"../server/geren.php",
            method:"post",
            data:{
                name:getCookie("rem_username"),
                diqu:text,
            }
        });
        this.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML=this.previousElementSibling.previousElementSibling.value
        this.previousElementSibling.previousElementSibling.style.display="none";
        this.style.display="none";
        this.nextElementSibling.style.display="none";
        this.previousElementSibling.previousElementSibling.previousElementSibling.style.display="inline-block"
    }
}
work.onclick=function(){
   f1.call(this);
   this.parentElement.parentElement.children[4].onclick=function(){
        var text=this.previousElementSibling.previousElementSibling.value;
        PAjax({
            url:"../server/geren.php",
            method:"post",
            data:{
                name:getCookie("rem_username"),
                work:text,
            }
        });
        this.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML=this.previousElementSibling.previousElementSibling.value
        this.previousElementSibling.previousElementSibling.style.display="none";
        this.style.display="none";
        this.nextElementSibling.style.display="none";
        this.previousElementSibling.previousElementSibling.previousElementSibling.style.display="inline-block"
    }
}
username.onclick=function(){
   f2.call(this);
   this.parentElement.parentElement.children[3].onclick=function(){
        var text=this.previousElementSibling.previousElementSibling.value;
        setCookie("username",text,7200,"/");
        document.querySelector(".lr b").innerHTML=`
                欢迎${text}
                `
        var m=PAjax({
            url:"../server/geren.php",
            method:"post",
            data:{
                name:getCookie("rem_username"),
                ming:text,
            }
        });
        this.parentElement.children[0].children[0].innerHTML= this.parentElement.children[1].value
        this.previousElementSibling.previousElementSibling.style.display="none";
        this.style.display="none";
        this.nextElementSibling.style.display="none";
    }
}
/*f1,f2,是关于盒子显示隐藏的函数，布局不同函数不同*/
function f1(){
    this.parentElement.nextElementSibling.style.display="none";
    this.parentElement.nextElementSibling.nextElementSibling.style.display="inline-block";
    this.parentElement.parentElement.children[4].style.display="inline-block";
    this.parentElement.parentElement.children[5].style.display="inline-block";
    this.parentElement.parentElement.children[5].onclick=function(){
        this.previousElementSibling.previousElementSibling.previousElementSibling.style.display="none";
        this.style.display="none";
        this.previousElementSibling.style.display="none";
        this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.style.display="inline-block"
    }
}
function f2(){
    this.parentElement.parentElement.children[1].style.display="inline-block";
    this.parentElement.parentElement.children[3].style.display="inline-block";
    this.parentElement.parentElement.children[4].style.display="inline-block";
    this.previousElementSibling.innerHTML="用户名"
    this.parentElement.parentElement.children[4].onclick=function(){
        this.parentElement.children[0].children[0].innerHTML=getCookie("username");
        this.previousElementSibling.previousElementSibling.previousElementSibling.style.display="none";
        this.style.display="none";
        this.previousElementSibling.style.display="none";
    }
}