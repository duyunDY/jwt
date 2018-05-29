/*
* @Author: Administrator
* @Date:   2017-08-12 16:49:19
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-18 14:36:32
*
*/
/**
 *网站访问地址
 */
var website = {
    path:"http://www.weather.com.cn/data/sk/",//接口
//    path:"http://192.168.1.175:8080/",//接口
    isLog : true,//是否打印日志
    iconPath : "http://yyadmin.sxyanzhuo.com" //  用户头像地址前缀
};

/**
 * [cpAPIParam 配置接口参数]
 */
var cpAPIParam = {
	/**************     个人中心接口参数配置开始      *******************/
	getUsersIndex : { // 登录--显示会员卡信息
		getUrl : function(){return "101110101.html";},
		title : "加载中..."
	},
	getActivityIndex : { // 会员活动列表
		getUrl : function(){return "activity/index.jhtml";},
		title : "加载中..."
	},
	getOrderIndex : { // 今日订单列表
		getUrl : function(){return "order/index.jhtml";},
		title : "加载中..."
	},
	getOrderSave : { // 充值微信下单接口
		getUrl : function(){return "/order/save.jhtml";},
		title : "订单处理中..."
	}	
};

/**
 * [cpAPI 接口Api]
 */
var cpAPI = {
	/*********************     个人中心接口开始   ************************/
	getUsersIndex : function(params,callBackFn) {//显示会员卡信息
		ajaxUtil.ajaxCodeByAsyncPost(
			cpAPIParam.getUsersIndex.getUrl(),
			params,
			callBackFn,
			cpAPIParam.getUsersIndex.title
		)
	},
	getActivityIndex : function(params,callBackFn) {//会员活动列表
		ajaxUtil.ajaxByAsyncPost(
			cpAPIParam.getActivityIndex.getUrl(),
			params,
			callBackFn,
			cpAPIParam.getActivityIndex.title
		)
	},
	getOrderIndex : function(params,callBackFn) {//今日订单列表
		ajaxUtil.ajaxByAsyncPost(
			cpAPIParam.getOrderIndex.getUrl(),
			params,
			callBackFn,
			cpAPIParam.getOrderIndex.title
		)
	},
	getOrderSave : function(params,callBackFn) {//充值微信下单接口
		ajaxUtil.ajaxByAsyncPost(
			cpAPIParam.getOrderSave.getUrl(),
			params,
			callBackFn,
			cpAPIParam.getOrderSave.title
		)
	}	
	/**************      最新揭晓接口结束     *******************/	
}
