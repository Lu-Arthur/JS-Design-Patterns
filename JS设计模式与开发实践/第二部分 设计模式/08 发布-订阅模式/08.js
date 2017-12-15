

//Dom事件
/*
document.body.addEventListener("click",function(){
	console.log(2);
},false);


document.body.addEventListener("click",function(){
	console.log(3);
},false);


document.body.addEventListener("click",function(){
	console.log(4);
},false);


document.body.click();//模拟用户点击
*/



//自定义事件
/*
//如何一步步实现发布订阅模式
1、首先要指定好谁充当发布者（比如售楼处）。
2、然后给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者（售楼处的花名册）。
3、最后发布消息的时候，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数（遍历花名册，挨个发信息）。
*/

/*
//简单的发布-订阅模式
var salesOffices = {};//定义售楼处
salesOffices.clientList = []; //缓存列表，存放订阅者的回调函数
salesOffices.listen = function(fn){ //增加订阅者
	this.clientList.push(fn); //订阅的消息添加进缓存列表
};
salesOffices.trigger = function(){ //发布消息
	for(var i=0,fn;fn=this.clientList[i++];){
		fn.apply(this,arguments); //auguments是发布消息时带上的参数
	}
}

//测试
salesOffices.listen(function(price,squareMeter){ //小明订阅消息
	console.log("价格 = " + price);
	console.log("squareMeter = " + squareMeter);
});

salesOffices.listen(function(price,squareMeter){ //小红订阅消息
	console.log("价格 = " + price);
	console.log("squareMeter = " + squareMeter);
});

salesOffices.trigger(2000000,88);

salesOffices.trigger(3000000,110);
*/

/*
//带标识的发布订阅模式

var salesOffices = {}; //定义售楼处
salesOffices.clientList = {}; //缓存列表，存放订阅者的回调函数
salesOffices.listen = function(key,fn){
	if(!this.clientList[key]){ //如果还没有订阅过此类消息，给该类消息创建一个缓存列表
		this.clientList[key] = [];
	}
	this.clientList[key].push(fn); //订阅的消息添加进消息缓存列表
};
salesOffices.trigger = function(){ //发布消息
	var key = Array.prototype.shift.call(arguments), //取出消息类型
		fns = this.clientList[key]; //取出该消息对应的回调函数合集

	if(!fns || fns.length === 0){ //如果没有订阅该消息，则返回
		return false;
	}

	for(var i=0,fn;fn=fns[i++];){
		fn.apply(this,arguments); //arguments是发布消息时附送的参数
	}
};


//测试
salesOffices.listen("squareMeter88",function(price){ //小明订阅消息
	console.log("价格 = " + price);
});

salesOffices.listen("squareMeter110",function(price){ //小红订阅消息
	console.log("价格 = " + price);
});

salesOffices.trigger("squareMeter88",2000000);

salesOffices.trigger("squareMeter110",3000000);

console.log(salesOffices.clientList);

*/


/*
//发布-订阅的通用实现

//把发布-订阅的功能提取出来，放在一个单独的对象内:

var event = {
	clientList:[],
	listen:function(key,fn){
		if(!this.clientList[key]){
			this.clientList[key] = [];
		}
		this.clientList[key].push(fn);//订阅的消息添加进缓存列表
	},
	trigger:function(){
		var key = Array.prototype.shift.call(arguments),
			fns = this.clientList[key];

		if(!fns || fns.length === 0){
			return false;
		}

		for(var i=0,fn;fn=fns[i++];){
			fn.apply(this,arguments); //arguments是trigger时带上的参数
		}
	}
};

//再定义一个installEvent函数，这个函数可以给所有的对象都动态安装发布-订阅功能：
var installEvent = function(obj){
	for(var i in event){
		obj[i] = event[i];
	}
};


//测试
var salesOffices = {};
installEvent(salesOffices);


salesOffices.listen("squareMeter88",function(price){ //小明订阅消息
	console.log("价格 = " + price);
});

salesOffices.listen("squareMeter110",function(price){ //小红订阅消息
	console.log("价格 = " + price);
});

salesOffices.trigger("squareMeter88",2000000);

salesOffices.trigger("squareMeter110",3000000);

console.log(salesOffices.clientList)
*/




/*
//取消订阅的事件

var event = {
	clientList:[],
	listen:function(key,fn){
		if(!this.clientList[key]){
			this.clientList[key] = [];
		}
		this.clientList[key].push(fn);//订阅的消息添加进缓存列表
	},
	trigger:function(){
		var key = Array.prototype.shift.call(arguments),
			fns = this.clientList[key];

		if(!fns || fns.length === 0){
			return false;
		}

		for(var i=0,fn;fn=fns[i++];){
			fn.apply(this,arguments); //arguments是trigger时带上的参数
		}
	}
};

event.remove = function(key,fn){
	var fns = this.clientList[key];
	if(!fns){
		return false; //如果key对应的消息没有被人订阅，则直接返回
	}
	if(!fn){ //如果灭有传入具体的回调函数，表示需要取消key对应消息的所有订阅
		fns && (fns.length = 0);
	}else{
		for(var l=fns.length-1;l>=0;l--){ //反向遍历订阅的回调函数列表
			var _fn = fns[l];
			if(_fn === fn){
				fns.splice(l,1);//删除订阅者的回调函数
			}
		}
	}

};

var installEvent = function(obj){
	for(var i in event){
		obj[i] = event[i];
	}
};

var salesOffices = {};
installEvent(salesOffices);




salesOffices.listen("squareMeter88",fn1 = function(price){ //小明订阅消息
	console.log("价格 = " + price);
});

salesOffices.listen("squareMeter88",fn2 = function(price){ //小红订阅消息
	console.log("价格 = " + price);
});

salesOffices.remove("squareMeter88",fn1);

salesOffices.trigger("squareMeter88",2000000);
*/




/*
//真实的例子————网站登录

var event = {
	clientList:[],
	listen:function(key,fn){
		if(!this.clientList[key]){
			this.clientList[key] = [];
		}
		this.clientList[key].push(fn);//订阅的消息添加进缓存列表
	},
	trigger:function(){
		var key = Array.prototype.shift.call(arguments),
			fns = this.clientList[key];

		if(!fns || fns.length === 0){
			return false;
		}

		for(var i=0,fn;fn=fns[i++];){
			fn.apply(this,arguments); //arguments是trigger时带上的参数
		}
	}
};


var installEvent = function(obj){
	for(var i in event){
		obj[i] = event[i];
	}
};

var login = {};

installEvent(login);

// $.ajax("http://xxx.com?login",function(data){ //登录成功
	// login.trigger("loginSucc",data);  //发布登录成功的消息
// });

//各模块监听登录成功的消息：

var header = (function(){ //header模块
	login.listen("loginSucc",function(data){
		header.setAvatar(data.avatar);
	});

	return {
		setAvatar:function(data){
			// console.log(data)//123
			console.log("设置header模块的头像");
		}
	}
})();

var nav = (function(){ //nav模块
	login.listen("loginSucc",function(data){
		nav.setAvatar(data.avatar);
	});
	return {
		setAvatar:function(avatar){
			console.log("设置nav模块的头像");
		}
	}
})();


var address = (function(){ //nav模块
	login.listen("loginSucc",function(obj){
		address.refresh(obj);
	});
	return {
		refresh:function(avatar){
			console.log("刷新收货地址");
		}
	}

})();

login.trigger("loginSucc",{avatar:"123"});  //发布登录成功的消息

// console.log(login.clientList["loginSucc"][0])
*/
/*
login:{
	clientList:[
		"loginSucc":[
			function(data){
				header.setAvatar(data.avatar);
			},
			function(data){
				nav.setAvatar(data.avatar);
			},
			function(obj){
				address.refresh(obj);
			}
		]
	]
}
*/



//全局的发布-订阅对象
/*
var Event = (function(){

	var clientList = {},
		listen,
		trigger,
		remove;

	listen = function(key,fn){
		if(!clientList[key]){
			clientList[key] = [];
		}

		clientList[key].push(fn);
	};

	trigger = function(){
		var key = Array.prototype.shift.call(arguments),
			fns = clientList[key];

		if(!fns || fns.length === 0){
			return false;
		}

		for(var i=0,fn;fn=fns[i++];){
			fn.apply(this,arguments);
		}
	};

	remove = function(key,fn){
		var fns = clientList[key];
		if(!fns){
			return false;
		}
		if(!fn){
			fns && (fns.length = 0);
		}else{
			for(var l=fns.length-1;l>=0;l--){
				var _fn = fns[l];
				if(_fn === fn){
					fns.splice(l,1);
				}
			}
		}
	};

	return {
		listen:listen,
		trigger:trigger,
		remove:remove
	}


})();


Event.listen("squareMeter88",function(price){ //小红订阅消息
	console.log("价格 = " + price);
});

Event.trigger("squareMeter88",2000000);//售楼处发布消息

*/



//模块间通信
/*
var Event = (function(){

	var clientList = {},
		listen,
		trigger,
		remove;

	listen = function(key,fn){
		if(!clientList[key]){
			clientList[key] = [];
		}

		clientList[key].push(fn);
	};

	trigger = function(){
		var key = Array.prototype.shift.call(arguments),
			fns = clientList[key];

		if(!fns || fns.length === 0){
			return false;
		}

		for(var i=0,fn;fn=fns[i++];){
			fn.apply(this,arguments);
		}
	};

	remove = function(key,fn){
		var fns = clientList[key];
		if(!fns){
			return false;
		}
		if(!fn){
			fns && (fns.length = 0);
		}else{
			for(var l=fns.length-1;l>=0;l--){
				var _fn = fns[l];
				if(_fn === fn){
					fns.splice(l,1);
				}
			}
		}
	};

	return {
		listen:listen,
		trigger:trigger,
		remove:remove
	}

})();


var a = (function(){
	var count = 0;
	var button = document.getElementById("count");
	button.onclick = function(){
		Event.trigger("add",count++);
	};
})();

var b = (function(){
	var div = document.getElementById("show");
	Event.listen("add",function(count){
		div.innerHTML = count;
	});
})();

*/



//全局事件的命名冲突

var Event = (function(){
	var global = this,
		Event,
		_default = 'default';

	Event = function(){
		var _listen,
			_trigger,
			_remove,
			_slice = Array.prototype.slice,
			_shift = Array.prototype.shift,
			_unshift = Array.prototype.unshift,
			namespaceCache = {},
			_create,
			find,
			each = function(ary,fn){
				var ret;
				for(var i=0,l=ary.length;i<l;i++){
					var n = ary[i];
					ret = fn.call(n,i,n);
				}

				return ret;
			};

		_listen = function(key,fn,cache){
			if(!cache[key]){
				cache[key] = [];
			}
			cache[key].push(fn);
		};

		_remove = function(key,cache,fn){
			if(cache[key]){
				if(fn){
					for(var i=cache[key].length-1;i>=0;i--){
						if(cache[key][i]===fn){
							cache[key].splice(i,1);
						}
					}
				}else{
					cache[key] = [];
				}
			}
		};

		_trigger = function(){
			var cache = _shift.call(arguments),
				key = _shift.call(arguments),
				args = arguments,
				_self = this,
				ret,
				stack = cache[key];

			if(!stack || !stack.length){
				return;
			}

			return each(stack,function(){
				return this.apply(_self,args);
			});
		};

		_create = function(namespace){
			var namespace = namespace || _default;
			var cache = {},
				offlineStack = [], //离线事件
				ret = {
					listen:function(key,fn,last){
						_listen(key,fn,cache);
						if(offlineStack === null){
							return;
						}
						if(last === 'last'){
							offlineStack.length && offlineStack.pop()();
						}else{
							each(offlineStack,function(){
								this();
							});
						}
						offlineStack = null;
					},

					one:function(key,fn,last){
						_remove(key,cache);
						this.listen(key,fn,last);
					},
					remove:function(key,fn){
						_remove(key,cache,fn);
					},
					trigger:function(){
						var fn,
							args,
							_self = this;

						_unshift.call(arguments,cache);
						args = arguments;
						fn = function(){
							return _trigger.apply(_self,args);
						};
						if(offlineStack){
							return offlineStack.push(fn);
						}
						return fn();
					}
				};

				return namespace?(namespaceCache[namespace]?namespaceCache[namespace]:namespaceCache[namespace]=ret):ret;

		};

		return {
			create:_create,
			one:function(key,fn,last){
				var event = this.create();
				event.one(key,fn,last);
			},
			remove:function(key,fn){
				var event = this.create();
				event.remove(key,fn);
			},
			listen:function(key,fn,last){
				var event = this.create();
				event.listen(key,fn,last);
			},
			trigger:function(){
				var event = this.create();
				event.trigger.apply(this,arguments);
			}
		};

	}();
	return Event;

})();



/*******************先发布后订阅********************/

// Event.trigger("click",1);
// Event.listen("click",function(a){
// 	console.log(a); //1
// });

/*************************使用命名空间***********************/

Event.create("namespace1").listen("click",function(a){
	console.log(a);//1
});
Event.create("namespace1").trigger("click",1);

Event.create("namespace2").listen("click",function(a){
	console.log(a);//2
});
Event.create("namespace2").trigger("click",2);













