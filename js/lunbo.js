function move(ele,obj,over){
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
/*轮播图*/
function Lunbo(){
    this.box=document.querySelector(".lunbo");
    this.ul=this.box.querySelector("ul");
    this.index=1;
    this.uliwidth=this.ul.children[0].offsetWidth;
    this.sleft=this.box.querySelector(".sleft");
    this.sright=this.box.querySelector(".sright");
    this.rtsheng();
    this.flas=true;
    this.sright.onclick=()=>{
        this.clickright();
    }
    this.sleft.onclick=()=>{
        this.clickleft();
    }
    this.xunhuan();
    this.box.onmouseenter=()=>{
        clearInterval(this.t1);
    }
    this.box.onmouseleave=()=>{
        this.xunhuan();
    }
    this.yuan()
}
//点击小圆点
Lunbo.prototype.yuan=function(){
    for(let i=0;i<this.ol.children.length;i++){
        this.ol.children[i].onclick=()=>{
            if(this.flas==false){
                return;
            }
            this.flas=false;
            this.index=i+1;
            move(this.ul,{
                left:-this.index*this.uliwidth,
            },function(){
                this.folli.className="";
                this.ol.children[i].className="act";
                this.folli=this.ol.children[i];
                this.flas=true;
            }.bind(this))
        }
    }
}
//定时器
Lunbo.prototype.xunhuan=function(){
    this.t1=setInterval(function(){
        if(this.flas==false){
        return;
        }
        this.flas=false;
        this.index++;
        move(this.ul,{
            left:-this.index*this.uliwidth,
        },function(){
            if(this.index==this.ul.children.length-1){
                this.index=1;
                this.ul.style.left=-this.index*this.uliwidth+"px";
            }
            this.folli.className="";
            this.ol.children[this.index-1].className="act";
            this.folli=this.ol.children[this.index-1];
            this.flas=true;
        }.bind(this))
    }.bind(this),4000)
}
//点击左键
Lunbo.prototype.clickleft=function(){
    if(this.flas==false){
        return;
    }
    this.flas=false;
    this.index--;
    move(this.ul,{
        left:-this.index*this.uliwidth,
    },function(){
       if(this.index==0){
            this.index=this.ul.children.length-2;
            this.ul.style.left=-this.index*this.uliwidth+"px";
       }
        this.folli.className="";
        this.ol.children[this.index-1].className="act";
        this.folli=this.ol.children[this.index-1];
        this.flas=true;
    }.bind(this))
}
//点击右边
Lunbo.prototype.clickright=function(){
    if(this.flas==false){
        return;
    }
    this.flas=false;
    this.index++;
    move(this.ul,{
        left:-this.index*this.uliwidth,
    },function(){
        if(this.index==this.ul.children.length-1){
            this.index=1;
            this.ul.style.left=-this.index*this.uliwidth+"px";
        }
        this.folli.className="";
        this.ol.children[this.index-1].className="act";
        this.folli=this.ol.children[this.index-1];
        this.flas=true;
    }.bind(this))
}
//创建olli ulli绑定类名
Lunbo.prototype.rtsheng=function(){
    this.ol=this.box.querySelector("ol");
    for(var i=0;i<this.ul.children.length;i++){
        var li=document.createElement("li");
        this.ol.appendChild(li);
    }
    this.ul.insertBefore(this.ul.lastElementChild.cloneNode(true),this.ul.children[0])
    this.ul.appendChild(this.ul.children[1].cloneNode(true));
    this.ul.style.width=7200+"px"
    this.ul.style.left=(-this.index*this.uliwidth)+"px";
    this.folli=this.ol.children[0];
    this.folli.className="act";
}
var bo=new Lunbo();