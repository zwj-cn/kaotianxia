/*判断有没有登录*/
if(getCookie("username")){
	var lr=document.querySelector(".lr")
	lr.innerHTML=`
	<b style="color:red;font-size:28px;">
	欢迎${getCookie("username")}
	</b>
	<a class="tui">
		退出
	</a>
	`
	/*退出按钮的点击事件 */
    var tui=document.querySelector(".tui");
    addEventListener(tui,"click",function(){
        removeCookie("username");
        location.reload();
        tab.innerHTML="";
    });
}
var tab=document.querySelector(".tab");/*获取购物车显示商品的ul*/
/*从数据库中拉取此页面的所有商品*/
var p=PAjax({
    url:"../server/caidan.php",
    dataType:"json",
});
p.then(function(res){
	var tese="";
	var shaokao="";
	var zhushi="";
	var yinpin="";
    for(var i=0;i<res.length;i++){/*通过循环里面嵌套if判断 将商品分类摆放*/
		if(res[i].pid==1){
			tese+=`
				<li>
					<img src="${res[i].url}" alt="">
					<p>
						<i index="${res[i].id}">${res[i].name}</i>
						<b>￥${res[i].price}元</b>
						<span class="jia"></span>
					</p>
				</li>
			`;
		}
		document.querySelector(".tese").innerHTML=tese;
		if(res[i].pid==2){
			shaokao+=`
				<li>
					<img src="${res[i].url}" alt="">
					<p>
						<i index="${res[i].id}">${res[i].name}</i>
						<b>￥${res[i].price}元</b>
						<span class="jia"></span>
					</p> 
				</li>
			`;
		}
		document.querySelector(".shaokao").innerHTML=shaokao;
		if(res[i].pid==3){
			zhushi+=`
				<li>
					<img src="${res[i].url}" alt="">
					<p>
						<i index="${res[i].id}">${res[i].name}</i>
						<b>￥${res[i].price}元</b>
						<span class="jia"></span>
					</p>
				</li>
			`;
		}
		document.querySelector(".zhushi").innerHTML=zhushi;
		if(res[i].pid==4){
			yinpin+=`
				<li>
					<img src="${res[i].url}" alt="">
					<p>
						<i index="${res[i].id}">${res[i].name}</i>
						<b>￥${res[i].price}元</b>
						<span class="jia"></span>
					</p>
				</li>
			`;
		}
		document.querySelector(".yinpin").innerHTML=yinpin;
    }
	var _res=res;
	/*读取登录账户的购物车商品*/
    var du=PAjax({
        url:"../server/du.php",
        data:{
            name:getCookie("rem_username")
        },
        method:"post",
        dataType:"json",
    })
    du.then(function(res){
		/*res里是两个字符串，通过逗号隔开转成数组*/
        var arr1=res[0].split(",");/*商品的id*/
        var arr2=res[1].split(",");/*商品对应的数量*/
        for(let i=0;i<arr1.length-1;i++){
            for(let j=0;j<_res.length;j++){
                if(arr1[i]==_res[j].id){/*登录账户保存的只有商品id和数量通过和所有商品的id做对比，相等就可以通过id获取到所有的商品信息 商品名字、单价*/
                    var dli=document.createElement("li");
                    dli.innerHTML=`
                        <i class="dx"><input type="checkbox" checked="checked"></i>
                        <i class="ming" index="${arr1[i]}">${_res[j].name}</i>
                        <i class="danjia">${_res[j].price}元</i>
                        <i class="jiajian">
                            <span class="jianh">-</span>
                            <span class="shu">${arr2[i]}</span>
                            <span class="jiah">+</span>
                        </i>
                        <i class="xiaoji">${_res[j].price*arr2[i]}元</i>
                        <i class="shanchu"><span class="iconfont icon-lajixiang"></span></i>
                    `
                    document.querySelector(".tab").insertBefore(dli,document.querySelector(".tab").children[0]);
                }
            }
        }
        zong();/*计算总数量总价钱的函数*/
        listonclick();/*商品单独一行加减删除等功能*/
    })
	var jia=document.querySelectorAll(".jia")/*添加到购物车*/
	for(let i=0;i<jia.length;i++){
		jia[i].onclick=function(){/*判断登录*/
			if(!getCookie("username")){
				alert("请登录之后再进行此操作")
				return;
			}
			qx();/*判断全选按钮该不该打上对勾的函数*/
			var danq=this.previousElementSibling.innerHTML.replace(/[^0-9]/ig,"");/*获取当前商品的价钱*/
			var ming=document.querySelectorAll(".ming");/*获取所有的购物车里的商品名字*/
			var fl=true;
			for(let i=0;i<ming.length;i++){
				if(this.previousElementSibling.previousElementSibling.innerHTML==ming[i].innerHTML){/*如果购物车已有相同商品则数量加一，小计重新计算*/
					ming[i].nextElementSibling.nextElementSibling.children[1].innerHTML=
					parseInt(ming[i].nextElementSibling.nextElementSibling.children[1].innerHTML)+1;
					ming[i].nextElementSibling.nextElementSibling.nextElementSibling.innerHTML=parseInt(ming[i].nextElementSibling.nextElementSibling.children[1].innerHTML)*danq+"元";
					fl=false;
				}
			}
			if(fl){/*购物车没有当前商品则添加一条进去*/
				var pli=document.createElement("li");
				pli.innerHTML=`
					<i class="dx"><input type="checkbox" checked="checked"></i>
					<i class="ming" index="${this.previousElementSibling.previousElementSibling.getAttribute("index")}">${this.previousElementSibling.previousElementSibling.innerHTML}</i>
					<i class="danjia">${danq}元</i>
					<i class="jiajian">
						<span class="jianh">-</span>
						<span class="shu">1</span>
						<span class="jiah">+</span>
					</i>
					<i class="xiaoji">${danq}元</i>
					<i class="shanchu"><span class="iconfont icon-lajixiang"></span></i>
				`
				tab.insertBefore(pli,tab.children[0]);
			}
            zong();
            listonclick();
            window.onunload = function(){/*用户登录且购物车发生变化了 则退出网页时保存购物车数据*/
                baocun();/*保存购物车数据函数*/
			};
		}
    }
    addEventListener(tui,"click",baocun);/*退出按钮保存购物车数据*/
})
document.querySelector(".quans").onclick=function(){/*全部删除按钮*/
	var flag = confirm("确定要清空购物车吗");
	if(flag){
		document.querySelector(".tab").innerHTML="";
		baocun();
		zong();
	}
}
document.querySelector(".quanx").onclick=function(){/*全选按钮功能*/
	var n=document.querySelectorAll(".tab .dx [type='checkbox']");
	if(this.children[0].getAttribute("checked")){
		this.children[0].checked=false;
		this.children[0].removeAttribute("checked");
		for(let i=0;i<n.length;i++){
			n[i].removeAttribute("checked");
			n[i].checked  =false; 
		}
	}else{
		this.children[0].setAttribute("checked","checked")
		this.children[0].checked=true;
		for(let i=0;i<n.length;i++){
			n[i].setAttribute("checked","checked")
			n[i].checked  =true; 
		}
	}
	zong();
}
document.querySelector(".jies").onclick=function(){/*结算按钮功能*/
	var s=document.querySelector(".zongs span").innerHTML.replace(/[^0-9]/ig,"");
	var j=document.querySelector(".zongj span").innerHTML.replace(/[^0-9]/ig,"");
	if(s!=0){
		var div=document.createElement("div");
		div.className="erweima"
		div.innerHTML=`
			<p>共${s}件商品，共${j}元，请微信扫码支付</p>
			<span>关闭</span>
		`
		document.querySelector("body").appendChild(div);
		document.querySelector(".erweima span").onclick=function(){
			document.querySelector("body").removeChild(document.querySelector(".erweima"));
		}
	}else{
		alert("购物车空空如也");
	}
}
let maxh=true;
document.querySelector(".gou>p").onclick=function(){/*点击购物车图标功能*/
	if(maxh){
		document.querySelector(".tab").style.maxHeight="0px";
		maxh=false;
	}else{
		document.querySelector(".tab").style.maxHeight="260px";
		maxh=true;
	}
}
/*电梯四个按钮的点击功能*/
var ele=document.querySelectorAll(".ele li");
var t1=null;
ele[0].onclick=function(){
clearInterval(t1);
	if(document.documentElement.scrollTop<174){
		t1=setInterval(function(){
			document.documentElement.scrollTop+=10;
			if(document.documentElement.scrollTop>=174){
				clearInterval(t1);
			}
		},1)
	}else if(document.documentElement.scrollTop>174){
		t1=setInterval(function(){
			document.documentElement.scrollTop-=10;
			if(document.documentElement.scrollTop<=174){
				clearInterval(t1);
			}
		},1)
	}
}
ele[1].onclick=function(){
	clearInterval(t1);
	if(document.documentElement.scrollTop<598){
		t1=setInterval(function(){
			document.documentElement.scrollTop+=10;
			if(document.documentElement.scrollTop>=598){
				clearInterval(t1);
			}
		},1)
	}else if(document.documentElement.scrollTop>598){
		t1=setInterval(function(){
			document.documentElement.scrollTop-=10;
			if(document.documentElement.scrollTop<=598){
				clearInterval(t1);
			}
		},1)
	}
}
ele[2].onclick=function(){
	clearInterval(t1);
	if(document.documentElement.scrollTop<1670){
		t1=setInterval(function(){
			document.documentElement.scrollTop+=10;
			if(document.documentElement.scrollTop>=1670){
				clearInterval(t1);
			}
		},1)
	}else if(document.documentElement.scrollTop>1670){
		t1=setInterval(function(){
			document.documentElement.scrollTop-=10;
			if(document.documentElement.scrollTop<=1670){
				clearInterval(t1);
			}
		},1)
	}
}
ele[3].onclick=function(){
	clearInterval(t1);
	if(document.documentElement.scrollTop<2417){
		t1=setInterval(function(){
			document.documentElement.scrollTop+=10;
			if(document.documentElement.scrollTop>=2417){
				clearInterval(t1);
			}
		},1)
	}else if(document.documentElement.scrollTop>2417){
		t1=setInterval(function(){
			document.documentElement.scrollTop-=10;
			if(document.documentElement.scrollTop<=2417){
				clearInterval(t1);
			}
		},1)
	}
}
// var jia=document.querySelectorAll(".jia");
// var gou=document.querySelector(".gou p");
// document.querySelector("body").onclick=function(){
// 	var gou=document.querySelector(".gou");
// 	console.log(gou.scrollTop,gou.clientTop,gou.offsetTop);
// }
// for(var i=0;i<jia.length;i++){
// 	jia[i].onclick=function(e){
// 		var ev = e || window.event;
// 		var span=document.createElement("span");
// 		setStyle(span,{
// 			width:"20px",
// 			height:"20px",
// 			background:"#fff",
// 			display:"block",
// 			position:"absolute",
// 			left:135+"px",
// 			top:277+"px",
// 			"border-radius":" 50%",
// 			"z-index": 99
// 		})
// 		this.parentElement.parentElement.appendChild(span);
// 		var left=gou.getBoundingClientRect().left-span.getBoundingClientRect().left
// 		var top=gou.getBoundingClientRect().top-span.getBoundingClientRect().top
// 		var _this=this;
// 		move(span,{
// 			left:left+147.5,
// 			top:top+287,
// 		},function(){
// 			console.log(_this);
// 			span.parentElement.removeChild(span);
// 		})
// 	}
// }
function zong(){/*计算总价钱总数量的函数*/
	var tabhaizi=tab.children.length
	var duo=document.querySelectorAll(".tab .dx [checked='checked']")
	document.querySelector(".zongs").firstElementChild.innerHTML=duo.length+"份";
	var money=0;
	for(var j=0;j<tabhaizi;j++){
		if(tab.children[j].firstElementChild.firstElementChild.getAttribute("checked")){
			money+=parseInt(tab.children[j].children[4].innerHTML);
		}
	}
	document.querySelector(".zongj").firstElementChild.innerHTML=money+"元"
}
function listonclick(){/*购物车增删改查功能函数*/
	var tab=document.querySelector(".tab");
    var tabhaizi=tab.children.length
    var shanchu=document.querySelectorAll(".shanchu");
    var jiah=document.querySelectorAll(".jiah");
    var jianh=document.querySelectorAll(".jianh");
    var dx=document.querySelectorAll(".dx input")
    for(let i=0;i<tabhaizi;i++){
        shanchu[i].onclick=function(){
            tab.removeChild(this.parentElement)
            tabhaizi=tab.children.length
			zong();
			baocun();
        }
        jiah[i].onclick=function(){
            this.previousElementSibling.innerHTML=this.previousElementSibling.innerHTML-0+1;
            jiaxiaoji.call(this);
			zong();
        }
        jianh[i].onclick=function(){
            if(this.nextElementSibling.innerHTML==1){
                return;
            }
            this.nextElementSibling.innerHTML=this.nextElementSibling.innerHTML-1;
            jianxiaoji.call(this);
			zong();
        }
        dx[i].onclick=function(){
            if(this.getAttribute("checked")){
				document.querySelector(".quanx input").checked=false;
				document.querySelector(".quanx input").removeAttribute("checked");
                this.removeAttribute("checked");
            }else{
				this.setAttribute("checked","checked")
				qx();
			}
            zong();
        }
    }
}
function jiaxiaoji(){/*点击购物车加号函数*/
	this.parentElement.nextElementSibling.innerHTML=parseInt(this.previousElementSibling.innerHTML)*parseInt(this.parentElement.previousElementSibling.innerHTML)+"元";
}
function jianxiaoji(){/*点击购物车减号函数*/
	this.parentElement.nextElementSibling.innerHTML=parseInt(this.nextElementSibling.innerHTML)*parseInt(this.parentElement.previousElementSibling.innerHTML)+"元";
}
function baocun(){/*保存购物车数据函数*/
    var bian=document.querySelectorAll(".tab li .ming");
    var str1="";
    var str2="";
    for(let i=0;i<bian.length;i++){
        str1+=bian[i].getAttribute("index")+","
    }
    var shu=document.querySelectorAll(".tab li .shu");
    for(let i=0;i<shu.length;i++){
        str2+=shu[i].innerHTML+",";
    }
    var name=getCookie("rem_username");
    PAjax({
        url:"../server/baocun.php",
        method:"post",
        data:{
            name:name,
            number:str1,
            count:str2,
        },
    });
}
function qx(){/*判断全选按钮该不该打上对勾的函数*/
	var la=true;
	var n=document.querySelectorAll(".dx input");
	for(var i=0;i<n.length;i++){
		if(!n[i].getAttribute("checked")){
				la=false;
		}
	}
	if(la){
		document.querySelector(".quanx input").checked=true;
		document.querySelector(".quanx input").setAttribute("checked","checked");
	}
}