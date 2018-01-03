
//小明追MM的故事

// 不用代理模式的情况
/*
var Flower = function(){};
var xiaoming = {
	sendFlower:function(target){
		var flower = new Flower();
		target.receiveFlower(flower);
	}
};
var A = {
	receiveFlower:function(flower){
		console.log("收到花 " + flower);
	}
};
xiaoming.sendFlower(A);
*/

// 引入代理B
/*
var Flower = function(){};

var xiaoming = {
	sendFlower:function(target){
		var flower = new Flower();
		target.receiveFlower(flower);
	}
};

var B = {
	receiveFlower:function(flower){
		A.receiveFlower(flower);
	}
};

var A = {
	receiveFlower:function(flower){
		console.log("收到花 " + flower);
	}
};

xiaoming.sendFlower(B);
*/



// B监听A的心情
/*
var Flower = function(){};

var xiaoming = {
	sendFlower:function(target){
		var flower = new Flower();
		target.receiveFlower(flower);
	}
};

var B = {
	receiveFlower:function(flower){
		A.listenGoodMood(function(){ // 监听A的好心情
			A.receiveFlower(flower);
		});
	}
};

var A = {
	receiveFlower:function(flower){
		console.log("收到花 " + flower);
	},
	listenGoodMood:function(fn){
		setTimeout(function(){ //假设10秒之后A的心情变好
			fn();
		},10000);
	}
};

xiaoming.sendFlower(B);
*/





//保护代理与虚拟代理
/*
var Flower = function(){};

var xiaoming = {
	sendFlower:function(target){
		target.receiveFlower();
	}
};

var B = {
	receiveFlower:function(){
		A.listenGoodMood(function(){ // 监听A的好心情
			var flower = new Flower(); //延迟创建flower对象
			A.receiveFlower(flower);
		});
	}
};

var A = {
	receiveFlower:function(flower){
		console.log("收到花 " + flower);
	},
	listenGoodMood:function(fn){
		setTimeout(function(){ //假设10秒之后A的心情变好
			fn();
		},5000);
	}
};

xiaoming.sendFlower(B);
*/



//虚拟代理实现图片预加载
/*
var myImage = (function(){
	var imgNode = document.createElement("img");
	document.body.appendChild(imgNode);
	
	return {
		setSrc:function(src){
			imgNode.src = src;
		}
	}
})();


var proxyImage = (function(){
	var img = new Image;
	img.onload = function(){
		myImage.setSrc(this.src);
	}
	return {
		setSrc:function(src){
			myImage.setSrc("loading.jpg");
			img.src = src;
		}
	}
})();

proxyImage.setSrc("1920.png");
*/



//代理的意义

//不用代理的预加载图片函数实现
/*
var MyImage = (function(){
	var imgNode = document.createElement('img');
	document.body.appendChild(imgNode);
	var img = new Image();
	
	img.onload = function(){
		imgNode.src = img.src;
	};
	
	return {
		setSrc:function(src){
			imgNode.src = "loading.jpg";
			img.src = src;
		}
	}
})();
MyImage.setSrc("1920.png");
*/


//代理和本体接口的一致性
/*
var myImage = (function(){
	var imgNode = document.createElement("img");
	document.body.appendChild(imgNode);
	
	return function(src){
		imgNode.src = src;
	}
})();

var proxyImage = (function(){
	var img = new Image();
	img.onload = function(){
		myImage(this.src);
	}
	
	return function(src){
		myImage("loading.jpg");
		img.src = src;
	}
})();
proxyImage("1920.png");
*/



//虚拟代理合并http请求

//原始
/*
var synchronousFile = function(id){
	console.log("开始同步文件，id为：" + id);
};
var checkbox = document.getElementsByTagName("input");
for(var i=0,c;c=checkbox[i++];){
	c.onclick = function(){
		if(this.checked === true){
			synchronousFile(this.id);
		}
	}
}
*/

/*
var synchronousFile = function(id){
	console.log("开始同步文件，id为：" + id);
};

var proxySynchronousFile = (function(){
	var cache = [], //保存一段时间内需要同步的id
		timer;  //定时器
		
	return function(id){
		cache.push(id);
		if(timer){ //保证不会覆盖已经启动的定时器
			return;
		}
		timer = setTimeout(function(){
			synchronousFile(cache.join(',')); //2秒后向本体发送需要同步的id集合
			clearTimeout(timer); //清空定时器
			timer = null;
			cache.length = 0; //清空ID集合
		},2000);
	}
})();

var checkbox = document.getElementsByTagName("input");
for(var i=0,c;c=checkbox[i++];){
	c.onclick = function(){
		if(this.checked === true){
			proxySynchronousFile(this.id);
		}
	}
}
*/



//虚拟代理在惰性加载中的应用


//未加载真正miniConsole.js之前的代码：
/*
var cache = [];
var miniConsole = {
	log:function(){
		var args = arguments;
		cache.push(function(){
			return miniConsole.log.apply(miniConsole,args);
		});
	}
};
miniConsole.log(1);


var handler = function(ev){
	if(ev.keyCode === 113){
		var script = document.createElement("script");
		script.onload = function(){
			for(var i=0,fn;fn=cache[i++];){
				fn();
			}
		};
		script.src = "miniConsole.js";
		document.getElementsByTagName("head")[0].appendChild(script);
	}
};

document.body.addEventListener("keydown",handler,false);

//miniConsole.js代码

miniConsole = {
	log:function(){
		//真正的代码略
		console.log(Array.prototype.join.call(arguments));
	}
};
*/



/*
var miniConsole = (function(){
	var cache = [];
	var handler = function(ev){
		if(ev.keyCode === 113){
			var script = document.createElement("script");
			script.onload = function(){
				for(var i=0, fn; fn = cache[i++];){
					fn();
				}
			};
			script.src = "miniConsole.js";
			document.getElementsByTagName("head")[0].appendChild(script);
			document.body.removeEventListener("keydown", handler); // 只加载一次miniConsole.js
		}
	};
	document.body.addEventListener("keydown", handler, false);
	
	return {
		log:function(){
			var args = arguments;
			cache.push(function(){
				return miniConsole.log.apply(miniConsole,args);
			})
		}
	}
	
})();


miniConsole.log(11);

//miniConsole.js代码

miniConsole = {
	log:function(){
		console.log(Array.prototype.join.call(arguments));
	}
};

*/



//缓存代理

//缓存代理————计算乘积
/*
var mult = function(){
	console.log("开始计算乘积");
	var a = 1;
	for(var i=0, l = arguments.length; i < l; i++){
		a = a * arguments[i];
	}
	console.log(a);
	return a;
};

mult(2,3);
mult(2,3,4);
*/


//加入缓存代理
/*
var mult = function(){
	console.log("开始计算乘积");
	var a = 1;
	for(var i=0, l = arguments.length; i < l; i++){
		a = a * arguments[i];
	}
	console.log(a);
	return a;
};
var proxyMult = (function(){
	var cache = {};
	return function(){
		var args = Array.prototype.join.call(arguments,",");
		if(args in cache){
			return cache[args];
		}
		return cache[args] = mult.apply(this,arguments);
	}
})();

proxyMult(1,2,3,4);
proxyMult(1,2,3,4);
*/


//用高阶函数动态创建代理

/**************计算乘积*********************/

var mult = function(){
	var a = 1;
	for(var i=0,l=arguments.length;i<l;i++){
		a = a * arguments[i];
	}
	return a;
};

/**************计算加和*********************/
var plus = function(){
	var a = 0;
	for(var i=0,l=arguments.length;i<l;i++){
		a = a + arguments[i];
	}
	return a;
};

/*************创建缓存代理的工厂*********************/

var createProxyFactory = function(fn){
	var cache = {};
	return function(){
		var args = Array.prototype.join.call(arguments,',');
//		console.log(cache)
		if(args in cache){
			return cache[args];
		}
		return cache[args] = fn.apply(this,arguments);
	}
};

var proxyMult = createProxyFactory(mult),
	proxyPlus = createProxyFactory(plus);

console.log(proxyMult(1,2,3,4));
console.log(proxyMult(1,2,3,4));
console.log(proxyPlus(1,2,3,4));
console.log(proxyPlus(1,2,3,4));





















