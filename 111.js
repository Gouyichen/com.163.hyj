/*************
第一步：定义公共变量
*************/
var _msgw               =     390;//div的宽度
var _msgh               =     327;//div的高度
var _background         =     "#FFFFFF";//背景颜色
var _bordercolor        =     "#55BACC";//窗口边框的颜色
var _str                =     "";//初始化变量
var _IsMousedown        =     0;//鼠标初始化
var _ClickLeft          =     0;//鼠标坐标初始化
var _ClickTop           =     0;//鼠标坐标初始化
var _img                =     "";//初始化变量
var _MyMessage          =     "";//我当前的输入信息
var _SID                =     0;//发送者的ID
var _RID                =     0;//接收者的ID
var _RNAME              =     "游客";//当前和哪个在聊天，对方的名字
var _RTYPE              =     "咨询";//聊天对象是什么，是群，还是个人用户，还是企业用户
var _url                =     "";//网页地址
var _cache              =     '';//缓存上一个状态的所有信息
/*************
第二步：在界面的中心生成一个可以移动的DIV
*************/
var _Maindiv=document.createElement("div");
var _Imgdiv=document.createElement("div");
function Create_Main_Div(){
 //计算DIV在页面中的中心位置，聊天工具的主窗口
 sjw=Math.round(_msgw/2);
 sjh=Math.round(_msgh/2);
 _lastw=Math.round(document.body.clientWidth/2)-sjw;
 _lasth=Math.round(document.body.clientHeight/2)-sjw;
 _Maindiv.setAttribute('id','MAIN_DIV_0001_WJL');//ID复杂主要是想设置其为网站的唯一性！
 _Maindiv.setAttribute("align","center");
 _Maindiv.style.position="absolute";
 _Maindiv.style.background=_background;
 _Maindiv.style.border="1px solid " + _bordercolor;
 _Maindiv.style.position = "absolute";
 _Maindiv.style.overflow = "hidden";
 _Maindiv.style.left = _lastw;   
 _Maindiv.style.top = _lasth;
 _Maindiv.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";     
 _Maindiv.style.width  = _msgw + "px";   
 _Maindiv.style.height = _msgh + "px"; 
 _Maindiv.style.zIndex = "700000";//至于所有的DIV的最上面
 _Maindiv.innerHTML = set_str();
 document.body.appendChild(_Maindiv);
}
//创建一个表情DIV，因为表情的DIV必须跟随主窗口移动而移动
function CreateImgDiv(){
 var s=document.getElementById("IMG_WJL_CHAT_CET");
 if(s){
  CloseDiv(_Imgdiv);
 }else{
  var sal1=_Maindiv.style.left;
  var sal2=_Maindiv.style.top;
  var arr1=sal1.split("px");
  var arr2=sal2.split("px");
  var left=arr1[0]*1+27;
  var top=arr2[0]*1+115;
  sjw=Math.round(_msgw/2);
  sjh=Math.round(_msgh/2);
  _lastw=Math.round(document.body.clientWidth/2)-sjw;
  _lasth=Math.round(document.body.clientHeight/2)-sjw;
  _Imgdiv.setAttribute("id","IMG_WJL_CHAT_CET");
  _Imgdiv.setAttribute("align","center");
  _Imgdiv.style.background=_background;
  _Imgdiv.style.border="1px solid #E0EEF8";
  _Imgdiv.style.position = "absolute";
  _Imgdiv.style.left = left;   
  _Imgdiv.style.top = top;
  _Imgdiv.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";     
  _Imgdiv.style.width  = "110px";   
  _Imgdiv.style.height = "90px"; 
  _Imgdiv.style.zIndex = "700001";//故意设置这么高的，置于页面的最顶层
  _Imgdiv.innerHTML = Img1();
  document.body.appendChild(_Imgdiv);
 }
}
function Img1(){
 _img="";
 _img=_img+'<div style="border:solid 1px #E0EEF8; width:110px; height:90px;">';
 _img=_img+'<div  style="width:110px; height:30px;">';
 _img=_img+'<div style="float:left;width:27px; height:30px;padding:2px;">';
 _img=_img+'<img src="'+_url+'Chat/icon/1.gif" width="21" height="22" style="cursor:pointer;" onClick="recimg(this.src)" title="微笑">';
 _img=_img+'</div>';
 _img=_img+'<div style="float:left;width:27px; height:30px;padding:2px;">';
 _img=_img+'<img src="'+_url+'Chat/icon/2.gif" width="22" height="22"  style="cursor:pointer;" onClick="recimg(this.src)" title="难过">';
 _img=_img+'</div>';
 _img=_img+'<div style="float:left;width:27px; height:30px;padding:2px;">';
 _img=_img+'<img src="'+_url+'Chat/icon/3.gif" width="21" height="22" style="cursor:pointer;" onClick="recimg(this.src)" title="呲牙">';
 _img=_img+'</div>';
 _img=_img+'<div style="float:left;width:27px; height:30px;padding:2px;">';
 _img=_img+'<img src="'+_url+'Chat/icon/4.gif" width="22" height="22" style="cursor:pointer;" onClick="recimg(this.src)" title="睡">';
 _img=_img+'</div>';
 _img=_img+'</div>';
 _img=_img+'<div  style="width:110px; height:30px;">';
 _img=_img+'<div style="float:left;width:27px; height:30px;padding:2px;">';
 _img=_img+'<img src="'+_url+'Chat/icon/5.gif" width="21" height="22" style="cursor:pointer;" onClick="recimg(this.src)" title="可爱">';
 _img=_img+'</div>';
 _img=_img+'<div style="float:left;width:27px; height:30px;padding:2px;">';
 _img=_img+'<img src="'+_url+'Chat/icon/6.gif" width="22" height="22" style="cursor:pointer;" onClick="recimg(this.src)" title="憨笑">';
 _img=_img+'</div>';
 _img=_img+'<div style="float:left;width:27px; height:30px;padding:2px;">';
 _img=_img+'<img src="'+_url+'Chat/icon/7.gif" width="24" height="22" style="cursor:pointer;" onClick="recimg(this.src)" title="衰">';
 _img=_img+'</div>';
 _img=_img+'<div style="float:left;width:27px; height:30px;padding:2px;">';
 _img=_img+'<img src="'+_url+'Chat/icon/8.gif" width="22" height="22" style="cursor:pointer;" onClick="recimg(this.src)" title="惊恐">';
 _img=_img+'</div>';
 _img=_img+'<div  style="width:110px; height:30px;">';
 _img=_img+'<div style="float:left;width:27px; height:30px;padding:2px;">';
 _img=_img+'<img src="'+_url+'Chat/icon/9.gif" width="21" height="22" style="cursor:pointer;" onClick="recimg(this.src)" title="疑问">';
 _img=_img+'</div>';
 _img=_img+'<div style="float:left;width:27px; height:30px;padding:2px;">';
 _img=_img+'<img src="'+_url+'Chat/icon/10.gif" width="22" height="22" style="cursor:pointer;" onClick="recimg(this.src)" title="得意">';
 _img=_img+'</div>';
 _img=_img+'<div style="float:left;width:27px; height:30px;padding:2px;">';
 _img=_img+'<img src="'+_url+'Chat/icon/11.gif" width="24" height="22" style="cursor:pointer;" onClick="recimg(this.src)" title="大哭">';
 _img=_img+'</div>';
 _img=_img+'<div style="float:left;width:27px; height:30px;padding:2px;">';
 _img=_img+'<img src="'+_url+'Chat/icon/12.gif" width="22" height="22" style="cursor:pointer;" onClick="recimg(this.src)" title="哈欠">';
 _img=_img+'</div>';
 _img=_img+'</div>';
 _img=_img+'</div>';
 return _img;
}
function recimg(strimg){
 var tempurl=strimg.split("/");
 _Getimg=tempurl[tempurl.length-1];
 insertimg();
}

