function Page(clname,obj={}){
    this.box=document.querySelector("."+clname);
    this.obj=obj;
    this.default={
        language:{
            first:"首页",
            prev:'上一页',
            list:'list',
            next:'下一页',
            last:'尾页',
        },
        pageData:{
            total:20,
            size:2,
        }
    }
    this.show=obj.show;
    this.ye=1;
    this.setDefault();
    this.totalPage = Math.ceil(this.default.pageData.total/this.default.pageData.size);
    this.setchild();
    this.setchp();
    this.show(this.ye);
    var _this=this;
    this.box.addEventListener("click",function(){
        _this.setonclick();
    });
    this.settbn();
}
//新建文本框元素跳转功能
Page.prototype.settbn=function(){
    var inp=document.createElement("input");
    inp.className="inp"
    this.setStyle(inp,{
        width:"40px",
        height:"20px",
        margin:"0 10px"
    });
    this.box.appendChild(inp);
    var btn=document.createElement("button");
    btn.className="btn";
    btn.innerHTML="跳转";
    this.setStyle(btn,{
        fontSize:"18px",
        width:"60px",
        height:"30px",
        border:"1px solid #000",
        lineHeight:"30px",
        textAlign:"center",
        cursor:"pointer",
        background:"#fff",
    });
    this.box.appendChild(btn);
}
//页数为首位时清除点击事件
Page.prototype.clearon=function(){
    if(this.ye==1){
        this.box.querySelector(".first").style.background="#ccc";
        this.box.querySelector(".prev").style.background="#ccc";
        this.box.querySelector(".first").style.name="fa";
        this.box.querySelector(".prev").style.name="fa";
    }else{
        this.box.querySelector(".first").style.background="#fff";
        this.box.querySelector(".prev").style.background="#fff";
        this.box.querySelector(".first").style.name="tu";
        this.box.querySelector(".prev").style.name="tu";
    }
    if(this.ye==this.totalPage){
        this.box.querySelector(".next").style.background="#ccc";
        this.box.querySelector(".last").style.background="#ccc";
        this.box.querySelector(".next").style.name="fa";
        this.box.querySelector(".last").style.name="fa";
    }else{
        this.box.querySelector(".next").style.background="#fff";
        this.box.querySelector(".last").style.background="#fff";
        this.box.querySelector(".next").style.name="tu";
        this.box.querySelector(".last").style.name="tu";
    }
}
//点击事件
Page.prototype.setonclick=function(e){
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if(target.className=="prev"&&target.style.name!="fa"){
        this.ye--;
        this.box.querySelector(".list").innerText="";
        this.setchp();
        this.clearon();
        this.show(this.ye);
    }
    if(target.className=="next"&&target.style.name!="fa"){
        this.ye++;
        this.box.querySelector(".list").innerText="";
        this.setchp();
        this.clearon();
        this.show(this.ye);
    }
    if(target.className=="first"&&target.style.name!="fa"){
        this.ye=1;
        this.box.querySelector(".list").innerText="";
        this.setchp();
        this.clearon();
        this.show(this.ye);
    }
    if(target.className=="last"&&target.style.name!="fa"){
        this.ye=this.totalPage;
        this.box.querySelector(".list").innerText="";
        this.setchp();
        this.clearon();
        this.show(this.ye);
    }
    if(target.className=="btn"){
        if(this.box.querySelector(".inp").value-0<=this.totalPage&&this.box.querySelector(".inp").value!=""){
            this.ye=this.box.querySelector(".inp").value-0;
            this.box.querySelector(".inp").value="";
            this.box.querySelector(".list").innerText="";
            this.setchp();
            this.clearon();
            this.show(this.ye);
        }
    }
}
//创建p标签的函数
Page.prototype.setchp=function(){
    if(this.totalPage<=5){
        for(let i=1;i<=this.totalPage;i++){
            var p=document.createElement("p");
            p.innerText=i;
            this.setStyle(p,{
                border:"solid 1px #32373b",
                background:"#3e4347",
                boxShadow: "inset 0px 1px 1px rgba(255,255,255, .1), 0px 1px 3px rgba(0,0,0, .1)",
                color: "#fff",
                textShadow: "0px 1px 0px rgba(0,0,0, .5)",
                fontSize:"20px",
                display: "inline-block",
                padding: "6px 9px",
                marginRight: "4px",
                borderRadius:"3px",
            })
            if(i==this.ye){
                p.style.border="none";
                p.style.background= "#2f3237";
                p.style.boxShadow="inset 0px 0px 8px rgba(0,0,0, .5), 0px 1px 0px rgba(255,255,255, .1)";
            }
            this.box.querySelector(".list").appendChild(p);
        }
    }else if(this.totalPage>5&&this.ye<this.totalPage-2){
           if(this.ye<=3){
                for(let i=1;i<=5;i++){
                    var p=document.createElement("p");
                    p.innerText=i;
                    this.setStyle(p,{
                        border:"solid 1px #32373b",
                        background:"#3e4347",
                        boxShadow: "inset 0px 1px 1px rgba(255,255,255, .1), 0px 1px 3px rgba(0,0,0, .1)",
                        color: "#fff",
                        textShadow: "0px 1px 0px rgba(0,0,0, .5)",
                        fontSize:"20px",
                        display: "inline-block",
                        padding: "6px 9px",
                        marginRight: "4px",
                        borderRadius:"3px",
                    })
                    if(i==this.ye){
                        p.style.border="none";
                        p.style.background= "#2f3237";
                        p.style.boxShadow="inset 0px 0px 8px rgba(0,0,0, .5), 0px 1px 0px rgba(255,255,255, .1)";
                    }
                    this.box.querySelector(".list").appendChild(p);
                }
           }else{
                for(let i=this.ye-2;i<this.ye+3;i++){
                    var p=document.createElement("p");
                    p.innerText=i;
                    this.setStyle(p,{
                        border:"solid 1px #32373b",
                        background:"#3e4347",
                        boxShadow: "inset 0px 1px 1px rgba(255,255,255, .1), 0px 1px 3px rgba(0,0,0, .1)",
                        color: "#fff",
                        textShadow: "0px 1px 0px rgba(0,0,0, .5)",
                        fontSize:"20px",
                        display: "inline-block",
                        padding: "6px 9px",
                        marginRight: "4px",
                        borderRadius:"3px",
                    })
                    if(p.innerText-0==this.ye){
                        p.style.border="none";
                        p.style.background= "#2f3237";
                        p.style.boxShadow="inset 0px 0px 8px rgba(0,0,0, .5), 0px 1px 0px rgba(255,255,255, .1)";
                    }
                    this.box.querySelector(".list").appendChild(p);
                }
           }
   }else if(this.ye>=this.totalPage-2){
       for(var i=this.totalPage-4;i<=this.totalPage;i++){
            var p=document.createElement("p");
            p.innerText=i;
            this.setStyle(p,{
                border:"solid 1px #32373b",
                background:"#3e4347",
                boxShadow: "inset 0px 1px 1px rgba(255,255,255, .1), 0px 1px 3px rgba(0,0,0, .1)",
                color: "#fff",
                textShadow: "0px 1px 0px rgba(0,0,0, .5)",
                fontSize:"20px",
                display: "inline-block",
                padding: "6px 9px",
                marginRight: "4px",
                borderRadius:"3px",
            })
            if(p.innerText-0==this.ye){
                p.style.border="none";
                p.style.background= "#2f3237";
                p.style.boxShadow="inset 0px 0px 8px rgba(0,0,0, .5), 0px 1px 0px rgba(255,255,255, .1)";
            }
            this.box.querySelector(".list").appendChild(p);
        }
   }
};
//创建box孩子的函数
Page.prototype.setchild=function(){
    for(var attr in this.default.language){
        var div=document.createElement("div");
        if(attr!="list"){
            div.className=attr;
            div.innerText=this.default.language[attr]
            this.setStyle(div,{
                width:"60px",
                height:"30px",
                border:"1px solid #000",
                lineHeight:"30px",
                textAlign:"center",
                cursor:"pointer",
                background:"#fff",

            });
            this.box.appendChild(div);
        }else{
            div.className=attr;
            this.setStyle(div,{
                display:"flex",
                justifyContent:"center"
            });
            this.box.appendChild(div);
        }
    }
}
//遍历传进去的对象并覆盖默认的对象
Page.prototype.setDefault=function(){
    for(var attr in this.obj.language){
        this.default.language[attr]=this.obj.language[attr];
    }
    for(var attr in this.obj.pageData){
        this.default.pageData[attr]=this.obj.pageData[attr];
    }
}
//给元素样式的函数
Page.prototype.setStyle=function(el,at){
    for(var i in at){
        el.style[i]=at[i];
    }
}