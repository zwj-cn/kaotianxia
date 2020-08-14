/*鼠标滑过星星功能*/
var xing=document.querySelectorAll(".pxing span");
var xingnum;
var xingfl=false;
for(let i=0;i<xing.length;i++){
    xing[i].onmouseover=function(){
        xingnum=i;
        xingfl=true;
        for(var j=0;j<=i;j++){
            xing[j].style.color="yellow";
        }
        for(var j=i+1;j<xing.length;j++){
            xing[j].style.color="#999";
        }
    }
}
/*点击发表评论功能*/
var but=document.querySelector("button");
but.onclick=function(){
    /*获取时间 获取星星数 通过星星数判断好评差评中评 获取输入框内的文字 然后发送到后台*/
    var t=new Date();
    var nian=t.getFullYear();
    var yue=t.getMonth()+1;
    var ri=t.getDate();
    var time=nian+"-"+yue+"-"+ri;
    if(!getCookie("username")){
        alert("登录后才可发表评论");
        return;
    }
    if(!xingfl){
        alert("请选择星星评分");
        return;
    }
    var txt=document.querySelector("textarea");
    txtv = txt.value.replace(/\s*/g,"");
    if(txtv==""){
        alert("评论不能为空");
        return;
    }
    var haohuai="";
    if(xingnum<2){
        haohuai="差评"
    }else if(xingnum==2){
        haohuai="中评"
    }else if(xingnum>2){
        haohuai="好评"
    }
    var fa=PAjax({
        url:"../server/xiepinglun.php",
        method:"post",
        data:{
            name:getCookie("username"),
            xingnum:xingnum,
            haohuai:haohuai,
            text:txtv,
            time:time,
            tou:getCookie("tou"),
        },
    })
    fa.then(function(res){
        if(res=="1"){
            alert("评论成功");
            location.reload();
        }else{
            alert("评论失败请重试");
        }
    })
}
/*读取后台所有的评论*/
var du=PAjax({
    url:"../server/dupinglun.php",
    dataType:"json"
})
/*将读到的数据展示在页面上*/
du.then(function(res){
    res=res.reverse()
    new Page("box",{
        language:{
        first:"首页",
        prev:"上一页",
        next:"下一页",
        last:"尾页"
    },
        pageData:{
            total:res.length,
            size:5
        },
        show:function(ye){
            var arr = res.slice((ye-1)*this.obj.pageData.size,ye*this.obj.pageData.size);
            var str = '';
            for(var i=0;i<arr.length;i++){
                var span="";
                switch(Number(arr[i].xingnum)){
                    case 0:
                        span=`
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>`
                    break;
                    case 1:
                        span=`
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>`
                    break;
                    case 2:
                        span=`
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>`
                    break;
                    case 3:
                        span=`
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>
                        <span class="iconfont icon-xingxing"></span>`
                    break;
                    case 4:
                        span=`
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>
                        <span class="iconfont icon-xingxing" style="color:yellow;"></span>`
                    break;
                }
                str += `
                <li>
                    <i>
                        <img src="../images/${arr[i].tou}" alt="">
                    </i>
                    <div class="xinxibox">
                        <h3 class="namebox">${arr[i].name}</h3>
                        <p class="xingbox">
                            ${span}
                        </p>
                        <b>${arr[i].ping}</b>
                        <p class="timebox">${arr[i].time}</p>
                        <p class="txt">${arr[i].text}</p>
                    </div>
                </li>
                `
            }
            document.querySelector(".comment").innerHTML = str;
        }
    })
})