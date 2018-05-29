/* 
* @Author: Administrator
* @Date:   2018-05-27 16:15:03
* @Last Modified by:   Administrator
* @Last Modified time: 2018-05-27 16:15:03
*/
/**
 * [ajaxUtil 数据请求类]
 * @type {Object}
 */
var loading ;
var ajaxUtil = {
    
	/**
     * post异步请求
     * @param {Object} functionName 请求方法名
     * @param {Object} param    请求参数
     * @param {Object} respFuncCallBack 返回成功回调函数
     * @param {String} beforeMsg 请求前load信息
     * @param {Object} errcallback 返回失败回调函数
     * @param {Object} cworkState 网络不可用回调函数
     */
    ajaxByAsyncPost : function(functionName, param, respFuncCallBack,beforeMsg, errcallback,cworkState) {
        log.v("发送到java端加密之前的数据：" + param);
        log.v("请求的URL地址是:"+ website.path + functionName);
        $.ajax({
            //远程Rest接口
            url : website.path + functionName,
            type : "POST",
            cache : false,
            //返回的数据类型
            dataType : "json",
			      data:param,
            // data : {
            //     "def" : param
            // },
            timeout : 60000,
            success : respFuncCallBack,
            beforeSend:function(){
                 if(!(undefined==beforeMsg||null==beforeMsg)){
                    loading = weui.loading(beforeMsg, {
                        className: 'custom-classname'
                    });
                 }else{
                 }
            },complete:function(){
                loading.hide(function() {
                    console.log('`loading` has been hidden');
                });
            },
            error : function(jqXHR, textStatus, errorThrown) {
                loading.hide(function() {
                    console.log('`loading` error');
                });
              log.v("错误信息======="+jqXHR.status+"===="+jqXHR.readyState+"===="+textStatus);
                toastUtils.showToast('服务器异常');
                if (null != errcallback) {
                    errcallback(jqXHR, textStatus, errorThrown);
                }
            }
        });
    },
    /**
     * post异步请求
     * @param {Object} functionName 请求方法名
     * @param {Object} param    请求参数
     * @param {Object} respFuncCallBack 返回成功回调函数
     * @param {String} beforeMsg 请求前load信息
     * @param {Object} errcallback 返回失败回调函数
     * @param {Object} cworkState 网络不可用回调函数
     */
    ajaxCodeByAsyncPost : function(functionName, param, respFuncCallBack,beforeMsg, errcallback,cworkState) {
        log.v("发送到java端加密之前的数据：" + param);
        log.v("请求的URL地址是:"+ website.path + functionName);
        var ld=null;
        $.ajax({
            //远程Rest接口
            url : website.path + functionName,
            type : "POST",
            cache : false,
            //返回的数据类型
            dataType : "json",
            data : {
                "def" : param
            },
            timeout : 60000,
            success : respFuncCallBack,
            beforeSend:function(){
                if(!(undefined==beforeMsg||null==beforeMsg)){
                    loading = weui.loading(beforeMsg, {
                        className: 'custom-classname'
                    });
                 }else{
                 }
            },complete:function(){
                loading.hide(function() {
                    console.log('`loading` has been hidden');
                });
            },
            error : function(jqXHR, textStatus, errorThrown) {
                loading.hide(function() {
                    console.log('`loading` error');
                });
              log.v("错误信息======="+jqXHR.status+"===="+jqXHR.readyState+"===="+textStatus);
                toastUtils.showToast('服务器异常，返回数据失败');
                if (null != errcallback) {
                    errcallback(jqXHR, textStatus, errorThrown);
                }
            }
        });
    },        
    /**
     * @Author:      muchen
     * @DateTime:    2014-12-10 09:54:09
     * @Description: ajax同步返回data
     */
    ajaxBySyncPost : function(functionName, param,beforeMsg, errcallback,cworkState) {
        log.v("发送到java端加密之前的数据：" + param);
        log.v("请求的URL地址是:"+ website.path + functionName);

        var result;
        loading = weui.loading(beforeMsg, {
            className: 'custom-classname'
        });
        $.ajax({
            //远程Rest接口
            url : website.path + functionName,
            type : "POST",
            cache : false,
            //返回的数据类型
            dataType : "json",
            data : {
                "def" : param
            },
            timeout : 60000,
            async: false,
            success : function(data){
                loading.hide(function() {
                    console.log('`loading` has been hidden');
                });
                result = data;
            },
            beforeSend:function(){
                loading = weui.loading(beforeMsg, {
                    className: 'custom-classname'
                });
            },complete:function(){
                loading.hide(function() {
                    console.log('`loading` has been hidden');
                });
            },
            error : function(jqXHR, textStatus, errorThrown) {
                $.unblockUI();
              log.v(jqXHR);
              log.v("错误信息======="+jqXHR.status+"===="+jqXHR.readyState+"===="+textStatus);
                toastUtils.showToast('服务器异常，返回数据失败');
                if (null != errcallback) {
                    errcallback(jqXHR, textStatus, errorThrown);
                }
            }
        });
        return result;
    },

    /**
     * get异步请求
     * @param {Object} functionName 请求方法名
     * @param {Object} param    请求参数
     * @param {Object} respFuncCallBack 返回成功回调函数
     */
    ajaxByAsyncGet : function(url, param, respFuncCallBack,beforeMsg, errcallback,cworkState) {
        // if (!checkworkState()) {
        //     toastUtils.showToast('当前网络不可用，请重新设置');
        //     if (null != cworkState) {
        //         cworkState();
        //     }
        //     return;
        // }
        var ld=null;
         log.v("get请求发送到java端加密之前的数据：" + param);
        $.ajax({
            //远程Rest接口
            url :  url,
            type : "GET",
            cache : false,
            //返回的数据类型
            dataType : "json",
            data : param,
            timeout : 60000,
            success : respFuncCallBack,
            beforeSend:function(){
                 if(!(undefined==beforeMsg||null==beforeMsg)){
                    $.ui.showMask(beforeMsg);
                 }
            },complete:function(){
                $.ui.hideMask();
            },
            error : function(jqXHR, textStatus, errorThrown) {
              log.v("错误信息======="+jqXHR.status+"===="+jqXHR.readyState+"===="+textStatus);
               toastUtils.showToast('服务器异常，返回数据失败');
                
                if (null != errcallback) {
                    errcallback(jqXHR, textStatus, errorThrown);
                }
            }
        });
    },

    /**
     * get同步请求
     * @param {Object} functionName 请求方法名
     * @param {Object} param    请求参数
     * @param {Object} respFuncCallBack 返回成功回调函数
     */
    ajaxBySyncGet : function(url, param, respFuncCallBack,beforeMsg, errcallback,cworkState) {
        if (!checkworkState()) {
            toastUtils.showToast('当前网络不可用，请重新设置');
            if (null != cworkState) {
                cworkState();
            }
            return;
        }
        var ld=null;
         log.v("get请求发送到java端加密之前的数据：" + param);
        $.ajax({
            //远程Rest接口
            url :  url,
            type : "GET",
            cache : false,
            //返回的数据类型
            dataType : "json",
            data : param,
            timeout : 60000,
            async: false,
            success : respFuncCallBack,
            beforeSend:function(){
                 if(!(undefined==beforeMsg||null==beforeMsg)){
                    $.ui.showMask(beforeMsg);
                 }
            },complete:function(){
                $.ui.hideMask();
            },
            error : function(jqXHR, textStatus, errorThrown) {
              log.v("错误信息======="+jqXHR.status+"===="+jqXHR.readyState+"===="+textStatus);
               toastUtils.showToast('服务器异常，返回数据失败');

                if (null != errcallback) {
                    errcallback(jqXHR, textStatus, errorThrown);
                }
            }
        });
    }
}

/**
 * [log 日志打印]
 * @type {Object}
 */
var log = {
  v : function(message){
    if (website.isLog) {
      console.log(message);
    };
  },
  a : function(message){
    if (website.isLog) {
      alert(message);
    };
  }
}

/**
 *  json数据格式转换
 */
var jsonUtils = {

    toObject : function(value) {
        return $.parseJSON(value);
    },

    toJson : function(value) {
        return JSON.parse(value);
    },

    toString : function(value) {
        return JSON.stringify(value);
    }
}

/**
 *本地数据存取函数
 */
var localStorageUtils = {
    setParam : function(name, value) {
        store.set(name, jsonUtils.toString(value));
    },
    getParam : function(name) {
         var obj = store.get(name);
         return jsonUtils.toJson(obj);
    },
    removeParam : function(name) {
        store.remove(name);
    },
    clear : function(){
        store.clear();
    }
}

/**
 * session数据存取函数
 */

var sessionStorageUtils = {
    setParam : function(name, value) {
        store.set(name, jsonUtils.toString(value));
    },
    getParam : function(name) {
         var obj = store.get(name);
         return jsonUtils.toJson(obj);
    },
    removeParam : function(name) {
        store.remove(name);
    },
    clear : function(){
        store.clear();
    }
}





/**
 * [toastUtils 显示toast消息]
 * @type {Object}
 */
var toastUtils = {
	showToast : function(text){
    if(text == null || text == ""){
      return;
    }
     weui.toast(text, 3000);
    },
    showToast_callBack : function(text, callBackFunName){
        //$.ui.showToast(text);
        window.setTimeout(function () {
            //$.ui.hideToast();
            eval(callBackFunName);
        },2000);
    }
}
//------------------------------------------------------------------



/**
 * [bigNumberUtil 对金额大数据、浮点数处理]
 * @type {Object}
 */
var bigNumberUtil = {
    /**
     * 转换成BigNumber
     */
    toBigNumber:function(value){
    	if(/^-?[1-9]\d*$/.test(value) || /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/.test(value)){
            return new BigNumber(value);
        }else{
            return new BigNumber("0");
        }
    },
    /**
     * BigNumber进行加法运算
     */
    add:function(value1,value2){
        return bigNumberUtil.toBigNumber(value1).plus(bigNumberUtil.toBigNumber(value2));
    },
    
    /**
     * BigNumber进行减法运算
     */
    minus:function(value1,value2){
        return bigNumberUtil.toBigNumber(value1).minus(bigNumberUtil.toBigNumber(value2));
    },
    
    /**
     * BigNumber进行乘法运算
     */
    multiply:function(value1,value2){
        return bigNumberUtil.toBigNumber(value1).times(bigNumberUtil.toBigNumber(value2));
    },
    
    /**
     * BigNumber进行除法运算
     */
    divided:function(value1,value2){
        return bigNumberUtil.toBigNumber(value1).dividedBy(bigNumberUtil.toBigNumber(value2));
    },
              
    /**
     * BigNumber进行取整运算
     */
     dividedToInt:function(value1,value2){
        return bigNumberUtil.toBigNumber(value1).dividedToIntegerBy(bigNumberUtil.toBigNumber(value2));
     },
    
    
    /**
     * 处理大数据的金额
     * value 金额
     * pointNum 小数点后保留几位
     */
    getBalanceRealMoney:function(value,pointNum){
        var temp = bigNumberUtil.divided(value,10000).toFixed(pointNum + 1).toString();
        return temp.substring(0, temp.length - 1);
    },
    
    /**
     * 取绝对值
     */
    getRealMoney:function(value,pointNum){
        var temp = Math.abs(bigNumberUtil.divided(value,10000)).toFixed(pointNum + 1).toString();
        return temp.substring(0, temp.length - 1);
    }
};

var ObjUtil = {
    /********** 判断对象是否为空  **********/
    isEmpty: function( obj ) {
        for ( var name in obj ) {
            return false;
        }
            return true;
    }
}

//验证正则
var checkUtil = {
    TikuanMIma : function (s) {
        var regu = /^(\w){6,20}$/;
        var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        }else{
           return false;
        }
    },
    Email : function (s) {
        var regu = /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        }else{
           return false;
        }
    },
    QQ : function (s) {
        var regu = /^[0-9]{4,20}$/;
        var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        }else{
           return false;
        }
    },
    Tel : function (s) {
        var regu = /^1[3|4|5|7|8][0-9]{9}$/;
        var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        }else{
           return false;
        }
    },
    Name : function (s) {
        var regu = /^[\u4E00-\u9FA5]{2,8}$/;
        var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        }else{
           return false;
        }
    },
    IDcard : function (s) {
        var regu = /^[0-9]{15}$|^[0-9]{18}$|^[0-9]{17}[X|x]$/;
        var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        }else{
           return false;
        }
    },
    BankName : function (s) {
        var regu = /^[\u4E00-\u9FA5]{2,100}$/;
        var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        }else{
           return false;
        }
    },
    BankNum : function (s) {
        var regu = /^[0-9]{16,19}$/;
        var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        }else{
           return false;
        }
    },
    UserName : function (s) {
        if (!isChinese(s)) {
          var regu = /^(?!^\d+$)([\u2E80-\u9FFF]|[a-z-A-Z0-9]|[_]){4,20}$/;
            var re = new RegExp(regu);
            if (re.test(s)) {
                return true;
            }else{
              return false;
              }
        }else{
                if (checksum(s) >=4 && checksum(s) <= 20) {
                      return true;
                }else{
                      return false;
                }
        }
    },
    Address : function (s) {
        if (!isChinese(s)) {
          var regu = /^(?!^\d+$)([\u2E80-\u9FFF]|[a-z-A-Z0-9]|[_]){1,200}$/;
            var re = new RegExp(regu);
            if (re.test(s)) {
                return true;
            }else{
              return false;
              }
        }else{
                if (checksum(s) >=1) {
                      return true;
                }else{
                      return false;
                }
        }
    },    
    Mima : function (s) {
        var regu = /^[0-9A-Za-z]{6,20}$/;
        var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        }else{
           return false;
        }
    },
    Money : function (s) {
        var regu = /^((1[0-9])|([2-9]\d)|([1-9]\d{2,}))(\.\d{1,2})?$/g;
        var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        }else{
           return false;
        }
    },
    isNum : function(s) {
        var regu = /^[0-9]*$/;
        var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        }else{
           return false;
        }
    }
}

//判断是否全为汉字
function isChinese(temp) { 
var re=/[^\u4e00-\u9fa5]/; 
if(re.test(temp)) return false; 
return true; 
} 

function checksum(chars){
  var sum = 0; 
  for (var i=0; i<chars.length; i++){ 
      var c = chars.charCodeAt(i); 
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){ 
        sum++; 
      }else{     
        sum+=2; 
      } 
  }
  return sum;
}


/**
 * @author Administrator
 * 日期处理
 */

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var dateUtil = {
    /**
     * 将毫秒数转换成时分秒
     */
    getTimer:function(millseconds){
		
        var seconds =   Math.floor(millseconds/1000);
		//小时的处理
		var h       =  Math.floor(seconds/3600);
		var hour    =  h<10?"0"+h:   (h>=100? "."+ h%100 : h);
		var ms= parseInt(  millseconds%1000/10  ); //100有进位制
		ms=ms<10?"0"+ms:ms;
        return (Math.floor(seconds%3600/60)<10?"0"+Math.floor(seconds%3600/60):Math.floor(seconds%3600/60))
        +":"+
        (seconds%3600%60<10?"0"+seconds%3600%60:seconds%3600%60)+":"+ ms;
    },
    /**
     * 将毫秒数转换成时分秒  
     */
    getTimer1:function(millseconds){
		
        var seconds =   Math.floor(millseconds/1000);
		//小时的处理
		var h       =  Math.floor(seconds/3600);
		var hour    =  h<10?"0"+h:   (h>=100? "."+ h%100 : h);
        return hour+":"+
        (Math.floor(seconds%3600/60)<10?"0"+Math.floor(seconds%3600/60):Math.floor(seconds%3600/60))
        +":"+
        (seconds%3600%60<10?"0"+seconds%3600%60:seconds%3600%60);
    },
        /**
     * 将毫秒数转换成时分秒
     */
    getTimer_GPC:function(millseconds){
        var seconds = Math.floor(millseconds/1000);
        return (Math.floor(seconds%3600/60)<10?"0"+Math.floor(seconds%3600/60):Math.floor(seconds%3600/60))+"分"+
        (seconds%3600%60<10?"0"+seconds%3600%60:seconds%3600%60)+"秒";
    },

    /**
     * 给时间参数加分钟
     */
    addTimer:function(datetime,minutes){
        datetime.setMinutes(datetime.getMinutes() + minutes);
        return datetime.Format("yyyy/MM/dd hh:mm:ss");
    }
}

/**
 * @author Administrator
 * 日期处理(根据毫秒获取时期,获取时分)
 */

Date.prototype.GetTimeFormatByMS = function (ms) { //author: meizz
    var d = new Date(ms);
    var h = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    return h + ":" + d.getMinutes();
}

var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss|ff9/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
            case 'ff9':
                return tf(t.getMilliseconds());
                break;                
        }
    })
}

/*
 * 将某子字符串用指定的字符串来替换
 * oldStr 源字符串
 * beginIndex 所要替换子字符串开始下标
 * endIndex 所要替换的子字符串结束下标（不包括）
 * replaceStr 指定用来替换的字符
 */
function replaceStr(oldStr,beginIndex,endIndex,len,replaceStr){
    if(endIndex < beginIndex || oldStr.length < (endIndex - beginIndex)){
        return oldStr;
    }
    var str = oldStr.substring(beginIndex,endIndex);
    var temp = "";
    for(var i = 0; i<len;i++){
        temp += replaceStr;
    }
    return oldStr.replace(str,temp);
}

/**
 * 随机8位数字
 * [getConid description]
 * @return {[type]} [description]
 */
function getConid(){
    return "" + parseInt(Math.random() * 100000000);
}

/**
 * 获取登录状态
 * [gethd description]
 * @return {[type]} [description]
 */
function getIsLogin(){
  var lg=localStorageUtils.getParam("isLogin")
  return lg;
}

//判断手机横竖屏
var orientation_s;
function orient() {
if (window.orientation == 0 || window.orientation == 180) {
  $("body").attr("class", "portrait");
    if(orientation_s == 'landscape'){
      window.location.reload();
    }
  orientation = 'portrait';
  orientation_s = 'portrait';
  return false;
}else if (window.orientation == 90 || window.orientation == -90) {
  $("body").attr("class", "landscape");
  if(orientation_s == 'portrait'){
      window.location.reload();
    }
  orientation = 'landscape';
  orientation_s = 'landscape';
  return false;
  }
}


$(function(){
   orient();
});


$(window).bind( 'orientationchange', function(e){
   orient();
});