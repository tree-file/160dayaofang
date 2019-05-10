/*
 	公共函数库：自己封装各种常用的函数，以后直接调用即可，提高开发效率

 */

/*
 randomNum() : 该函数的功能是随机生成四位数字的验证码
 
 参数：无
 返回值：返回四位数随机数
 
 */

//function randomNum() { //2.声明体
//	//3.执行代码
//	var html = ''; //拼接验证码
//	for(var i = 0; i < 4; i++) {
//		html += parseInt(Math.random() * 10); //0-9
//	}
//	return html; //把我们的随机数返回到入口   4.将结果返回到入口
//}

/*
 	随机颜色
 	randomColor(type)
 	参数：
 		type ：
 			16 返回16进制颜色
 			rgb：返回rbg颜色
 		
 */

function randomColor(type) {
	if(type == 16) {
		//当传过来的实参是16，就生成16进制的随机颜色返回
		var str = '0123456789abcdef';
		var color = '#';
		for(var i = 0; i < 6; i++) {
			var num = randomNum(0, 15);
			color += str[num];
		}

		return color; // #162743
	} else if(type == 'rgb') {
		//如果传过来的实参是；rgb，就返回rgb颜色
		var r = randomNum(0, 255);
		var g = randomNum(0, 255);
		var b = randomNum(0, 255);

		return 'rgb(' + r + ',' + g + ',' + b + ')';
	}
}

/*
 randomCode() : 该函数的功能是随机生成四位数验证码，字母数字的组合
 
 参数：无
 返回值：返回四位数随机数
 
 */
function randomCode() {
	//随机验证码
	var html = '0987654321zxcvbnmkjhgfdsaqwertyuioplZXCVBNMLKJHGFDSAQWERTYUIOP';
	var num = ''; //存四位数的
	for(var i = 0; i < 4; i++) {
		//随机数范围：0-html.length-1
		var now = parseInt(Math.random() * html.length); //0-html.length-1
		num += html[now];
	}

	return num; //返回
}

/*
 	封装一个函数：传两个参数  min  max。就能生成一个min到max之间的随机整数
	 randomNum(min,max)
	 randomNum(100,999)
 */

function randomNum(min, max) {
	//了解随机数
	//	Math.random() + min // 0-1
	//	parseInt(Math.random() * (max - min)) + min;//Math.random()等于0的时候最小：min
	return parseInt(Math.random() * (max - min) + 1) + min; //Math.random()等于1的时候最大：max
}

/*
 filter(str)过滤敏感词
*/

function filter(str) {
	//过滤敏感词
	var arr = ['fuck', '妈蛋', '操', '法轮功', '反清复明', '金三胖', '去死', 'MMP'];
	arr.forEach(function(item) { //item指的是敏感词
		var reg = new RegExp(item, 'gi');
		str = str.replace(reg, '***');
	});
	return str;
}

/*
  getid(id) ：通过id查找元素
*/

function getid(id) {
	return document.getElementById(id);
}

//toDb() 补零函数
function toDb(num) {
	if(num < 10) {
		return '0' + num;
	} else {
		return '' + num;
	}
}

//毫秒数->xx天xx时xx分xx秒
function setTime(time) {
	var sec = time % 60; //秒
	var min = parseInt(time / 60) % 60; //分
	var hour = parseInt(time / 60 / 60) % 24; //小时
	var day = parseInt(time / 60 / 60 / 24); //天数
	//					console.log(day,hour,min,sec);
	//xx天xx时xx分xx秒   xx:xx:xx:xx
	return {
		secs: sec,
		mins: min,
		hours: hour,
		days: day
	}
}
//strToObj() 提取url参数变成对象
function strToObj(str) {
	//name=malin&psw=456123
	var obj = {};
	var arr = str.split('&'); //['name=malin','psw=456123']
	arr.forEach(function(item) {
		var innerarr = item.split('='); //['name','malin']
		obj[innerarr[0]] = innerarr[1]; //生成的数据马上存起来，否则下一轮循环会清空该数组
		//obj['name'] = 'malin';
	});
	return obj;
}

//objToStr() 将对象转成参数
function objToStr(obj) {
	var html = ''; //用于存拼接好的参数
	//遍历：for in
	for(var key in obj) {
		//key属性名，obj[key]属性值
		html += key + '=' + obj[key] + '&';
	}
	//				console.log(html);
	return html.slice(0, -1); //去掉最后的这个&号
}

//获取样式的方法

function getStyle(ele, cls) {
	//ele节点  cls：属性名
	if(getComputedStyle(ele, false)) {
		//高级浏览器
		return getComputedStyle(ele, false)[cls];
	} else {
		//低版本的IE8-
		return ele.currentStyle[cls];
	}
}

//firstChild()

function firstChild(ele) { //测试：安装虚拟机 vm 安装操作系统，xp  IEtest
	if(ele.firstElementChild) {
		//代表在高级浏览器：IE9+
		return ele.firstElementChild;
	} else {
		//低版本浏览器  IE8-
		return ele.firstChild;
	}
}

//var fisc = ele.firstElementChild || ele.firstChild;

//封装函数：绑定事件    jq  bind()  on()
function bind(ele, type, fn) { //用来绑定事件的方法

	//type ：不带on事件名；  ele：元素  fn：回调函数
	if(ele.addEventListener) {
		//高级浏览器
		ele.addEventListener(type, fn, false);
	} else {
		//IE8-
		els.attachEvent('on' + type, fn);
	}
}

/*
 	表单验证的方法： 调用里面的子功能  (json对象里面有很多子功能)
 	var checkReg = {
 		tel : function() {}
 	}
 	
 	调用方法：
 	checkReg.tel();
 	
*/

var checkReg = {
	trim: function(str) { //去掉前后空格
		var reg = /^\s+|\s+$/g;
		return str.replace(reg, '');
	},
	tel: function(str) { //号码
		var reg = /^1[3-9]\d{9}$/
		return reg.test(str);
	},
	email: function(str) { //邮箱正则:a_a2-+.s @ a_a+2-.s  .s_a2
		var reg = /^\w+([\-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //网上推荐
		return reg.test(str);
	},
	idcard: function(str) { //身份证
		var reg = /^(\d{17}|\d{14})[\dX]$/;
		return reg.test(str);
	},
	psweasy: function(str) { //6-18位首字母开头
		var reg = /^[a-zA-Z]\w{5,17}$/;
		return reg.test(str);
	},
	pwwagain: function(str1, str2) { //确认密码
		return str1 === str2; //全等 恒等
	},
	urladr: function(str) { //路径：网址规则
		var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
		return reg.test(str);
	},
	name: function(str) { //账号字母开头,6-20位
		var reg = /^[a-zA-Z][\w\-]{5,19}$/;
		return reg.test(str);
	},
	chinese: function(str) { //中文
		var reg = /^[\u2E80-\u9FFF]+$/;
		return reg.test(str);
	},
	birthday: function(str) { //生日
		var reg = /^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;
		return reg.test(str);
	}
}

/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

	clearInterval(obj.timer); //防止定时器叠加
	obj.timer = setInterval(function() {

		var istrue = true;

		//1.获取属性名，获取键名：属性名->初始值
		for(var key in json) { //key:键名   json[key] :键值
			//			console.log(key); //width heigth opacity
			var cur = 0; //存初始值

			if(key == 'opacity') { //初始值
				cur = getStyle(obj, key) * 100; //透明度
			} else {
				cur = parseInt(getStyle(obj, key)); // 300px  300  width heigth borderwidth px为单位的

			}

			//2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
			//距离越大，速度越大,下面的公式具备方向
			var speed = (json[key] - cur) / 6; //出现小数
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

			//保证上一个属性全部都达到目标值了
			if(cur != json[key]) { //width 200 heigth 400
				istrue = false; //如果没有达到目标值，开关false
			} else {
				istrue = true; //true true
			}

			//3、运动
			if(key == 'opacity') {
				obj.style.opacity = (cur + speed) / 100; //0-1
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
			} else {
				obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
			}

		}

		//4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
		if(istrue) { //如果为true,证明以上属性都达到目标值了
			clearInterval(obj.timer);
			if(fnend) { //可选参数的由来
				fnend();
			}
		}

	}, 30); //obj.timer 每个对象都有自己定时器

}

function css() {
	//getComputedStyle(ele, false)[cls]; 可以获取内联和非内联的样式
	if(arguments.length == 2) {
		//获取
		return getComputedStyle(arguments[0], false)[arguments[1]];
	} else if(arguments.length == 3) {
		//设置样式  box.style.display = 'none'
		arguments[0].style[arguments[1]] = arguments[2];
	}

}

/*
 	ajax()
 	参数一：请求方式  get  post
 	参数二：url接口路径不同
 	参数三：传输给后台的数据不同data
	参数四：回调函数
*/

function ajax(type, url, data, fn) {

	//1.创建对象
	var xhr = new XMLHttpRequest();

	//2.参数设置  open('')
	if(type.toLowerCase() == 'get') {
		if(data) {
			//如果是get方式并且有数据
			url = url + '?' + data;
		}
		xhr.open(type, url, true);
		xhr.send(null);
	} else {
		//post方式
		xhr.open(type, url, true);
		//请求头设置
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}

	//接收数据
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				//成功接收数据
				//				var str = xhr.responseText;
				if(fn) {
					//把数据传到外部使用
					fn(xhr.responseText);
				}
			} else {
				//如果出错给个提示
				alert('出错了，状态码是：' + xhr.status);
			}
		}
	}
}

/*
 ajax2({
	type : 'get',//传输方式
	url : 'api/02checkname_get.php',//接口的路径
	data : 'name=' + username.value,//传输给后台的数据，选填的
//	async : true,//选填的，默认是异步 true
	success : function(str) {//成功的回调，能够拿到后端的数据

	}
});
*/

function ajax2(opt) {
	function extend(obj1, obj2) { //配置参数：obj1 默认参数：obj2
		for(var key in obj1) {
			obj2[key] = obj1[key];
		}
	}

	var defaults = { //默认参数
		async: true,
		data: ''
	}

	extend(opt, defaults); //用默认参数

	//创建对象
	var xhr = new XMLHttpRequest();

	if(defaults.type.toLowerCase() == 'get') {
		//get方式传输
		defaults.url += '?' + defaults.data; //url?data
		xhr.open('get', defaults.url, defaults.async);
		xhr.send(null);
	} else {
		//post方式传输
		xhr.open('post', defaults.url, defaults.async);
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded'); //设置请求头：使用post方式传输的时候需要设置请求头
		xhr.send(defaults.data);
	}

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				defaults.success(xhr.responseText);
			} else {
				alert('错误是：' + xhr.status);
			}
		}
	}
}

function setCookie(key, val, iday) {
	//key:键名  val:键值  iday：失效时间
	//document.cookie = 'name=malin;expires=date;path=/';
	var now = new Date();
	now.setDate(now.getDate() + iday); //iday==5:5天后失效，-1：立即失效
	document.cookie = key + '=' + val + ';expires=' + now + ';path=/';
}

function getCookie(key) {
	var str = document.cookie; //name=malin; psw=123456
	var arr = str.split('; '); //[name=malin,psw=123456]
	for(var ele of arr) {
		var arr2 = ele.split('='); //[name,malin]
		if(key == arr2[0]) {
			return arr2[1];
		}
	}
}

function removeCookie(key) {
	setCookie(key, '', -1);
}