/*判断登录*/
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
	var tui=document.querySelector(".tui");
	tui.onclick=function(){
		removeCookie("username");
		location.reload() 
	}
}