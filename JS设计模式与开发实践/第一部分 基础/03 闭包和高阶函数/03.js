


// var func = function(){
// 	var a = 1;
// 	console.log(a);//1
// };
// func();
// console.log(a);//报错  ReferenceError




// var a = 1;
// var func1 = function(){
// 	var b = 2;
// 	var func2 = function(){
// 		var c = 3;
// 		console.log(b);//2
// 		console.log(a);//1
// 	};
// 	func2();
// 	console.log(c);//报错  ReferenceError
// };
// func1();


// var a = 3;
// function b(){
// 	console.log(a);
// }
// b();


// function a(){
// 	var b = 3;
// 	function b(){
// 		console.log(b);
// 	}
// 	b();
// }
// a();




// console.log(a);//undefined
// var a = 3;


// var a;
// console.log(a);
// a = 3;



// var a = 3;
// function a(){
// 	console.log(4);
// }
// a();


// function a(){
// 	console.log(4);
// }
// a = 3;
// a();

// foo();
// var foo = function(){
// 	console.log(111);
// };



// var func = function(){
// 	var a = 1;
// 	return function(){
// 		a++;
// 		console.log(a);
// 	};
// };
// var f = func();
// f();//2
// f();//3
// f();//4
// f();//5


// var div = document.getElementsByTagName("div");
// for(var i=0;i<div.length;i++){
// 	(function(j){
// 		div[i].onclick = function(){
// 			console.log(j);
// 		};
// 	})(i);
	
// }


// var div = document.getElementsByTagName("div");
// for(let i=0;i<div.length;i++){
// 	div[i].onclick = function(){
// 		console.log(i);
// 	};
// }



// var Type = {};
// for(var i=0,type;type=['String','Array','Number'][i++];){
// 	(function(type){
// 		Type['is'+type] = function(obj){
// 			return Object.prototype.toString.call(obj) === '[object '+type+']';
// 		}
// 	})(type);
// }
// var c = Type.isArray([]);
// Type.isString("abc");

// console.log(c)




// var mult = function(){
// 	var a = 1;
// 	for(var i=0,l=arguments.length;i<l;i++){
// 		a = a * arguments[i];
// 	}

// 	return a;
// };

// var result = mult(2,3,4);
// console.log(result);




// var cache = {};
// var mult = function(){
// 	var args = Array.prototype.join.call(arguments,',');
// 	// console.log(args);//1,2,3
// 	// console.log(cache[args]);//undefined
// 	if(cache[args]){
// 		return cache[args];
// 	}

// 	var a = 1;
// 	for(var i=0,l=arguments.length;i<l;i++){
// 		a *= arguments[i];
// 	}

// 	return cache[args] = a;

// };
// console.log(mult(1,2,3));
// console.log(mult(1,2,3));



// var mult = (function(){
// 	var cache = {};
// 	return function(){
// 		var args = Array.prototype.join.call(arguments,',');
// 		if(args in cache){
// 			return cache[args];
// 		}
// 		var a = 1;
// 		for(var i=0,l=arguments.length;i<l;i++){
// 			a = a*arguments[i];
// 		}
// 		return cache[args] = a;
// 	}
// })();
// console.log(mult(1,2,3));
// console.log(mult(1,2,3));



// var mult = (function(){
// 	var cache = {};
// 	var c = 0;
// 	var calculate = function(){
// 		var a = 1;
// 		c++;
// 		for(var i=0,l=arguments.length;i<l;i++){
// 			a *= arguments[i];
// 		}
// 		return a;
// 	};

// 	return function(){
// 		var args = Array.prototype.join.call(arguments,',');
// 		if(args in cache){
// 			return cache[args];
// 		}

// 		return cache[args] = calculate.apply(null,arguments);
// 	}
// })();

// console.log(mult(1,2,3));
// console.log(mult(1,2,3,4));
// console.log(mult(1,2,3));



// var report = function(src){
// 	var img = new Image();
// 	img.src = src;
// };
// report("http://xxx.com/getUserInfo");




// var report = (function(){
// 	var imgs = [];
// 	return function(src){
// 		var img = new Image();
// 		imgs.push(img);
// 		img.src = src;
// 	}
// })();




// var extent = function(){
// 	var value = 0;
// 	return {
// 		call:function(){
// 			value++;
// 			console.log(value);
// 		}
// 	}
// };

// var extent = extent();
// extent.call();//1
// extent.call();//2
// extent.call();//3



// var extent = {
// 	value:0,
// 	call:function(){
// 		this.value++;
// 		console.log(this.value);
// 	}
// };
// extent.call();//1
// extent.call();//2
// extent.call();//3



// var Extent = function(){
// 	this.value = 0;
// };
// Extent.prototype.call = function(){
// 	this.value++;
// 	console.log(this.value);
// };

// var extent = new Extent();
// extent.call();//1
// extent.call();//2
// extent.call();//3



/*
//用闭包实现命令模式
var Tv = {
	open:function(){
		console.log("打开电视");
	},
	close:function(){
		console.log("关闭电视");
	}
};

var OpenTvCommand = function(receiver){
	this.receiver = receiver;
};
OpenTvCommand.prototype.execute = function(){
	this.receiver.open();//执行命令，打开电视
};

OpenTvCommand.prototype.undo = function(){
	this.receiver.close();//撤销命令，关闭电视
};

var setCommand = function(command){
	document.getElementById('execute').onclick = function(){
		command.execute();//输出：打开电视
	}
	document.getElementById('undo').onclick = function(){
		command.undo();//输出：关闭电视
	}
};

setCommand(new OpenTvCommand(Tv));
*/



/*
var Tv = {
	open:function(){
		console.log('打开电视');
	},
	close:function(){
		console.log('关掉电视');
	}
};

var createCommand = function(receiver){
	var execute = function(){
		return receiver.open();	//执行命令，打开电视
	};

	var undo = function(){
		return receiver.close();//撤销命令，关闭电视
	};


	return {
		execute:execute,
		undo:undo
	}
};


var setCommand = function(command){
	document.getElementById('execute').onclick = function(){
		command.execute();
	};
	document.getElementById('undo').onclick = function(){
		command.undo();
	};
};

setCommand(createCommand(Tv));
*/








// var getUserInfo = function(userId,callback){
// 	$.ajax("http://xx.com/getUserInfo?"+userId,function(data){
// 		if(typeof callback==='function'){
// 			callback(data);
// 		}
// 	});
// };

// getUserInfo(12157,function(data){
// 	console.log(data.userName);
// });




// var appendDiv = function(){
// 	for(var i=0;i<100;i++){
// 		var div = document.createElement("div");
// 		div.innerHTML = i;
// 		document.body.appendChild(div);
// 		div.style.display = "none";
// 	}
// };
// appendDiv();




// var appendDiv = function(callback){
// 	for(var i=0;i<100;i++){
// 		var div = document.createElement("div");
// 		div.innerHTML = i;
// 		document.body.appendChild(div);
// 		if(typeof callback === 'function'){
// 			callback(div);
// 		}
// 	}
// };

// appendDiv(function(node){
// 	node.style.display = 'none';
// });




// console.log([1,4,3].sort(function(a,b){
// 	return a-b;
// }));


// console.log([1,4,3].sort(function(a,b){
// 	return b-a;
// }));



/*
//判断数据的类型

var isString = function(obj){
	return Object.prototype.toString.call(obj) === '[object String]';
};

var isArray = function(obj){
	return Object.prototype.toString.call(obj) === '[object Array]';
};

var isNumber = function(obj){
	return Object.prototype.toString.call(obj) === '[object Number]';
};

console.log(isString('abc'));//true
console.log(isArray([]));//true
console.log(isNumber(123));//true
*/


/*
// 变形
var isType = function(type){
	return function(obj){
		return Object.prototype.toString.call(obj) === '[object '+type+']'
	}
};

console.log(isType('String')('abc'))//true
var isString = isType('String');
var isArray = isType('Array');
var isNumber = isType('Number');
console.log(isArray([]));//true
*/



// var Type = {};
// for(var i=0,type;type=['String','Array','Number'][i++];){
// 	(function(type){
// 		Type['is'+type] = function(obj){
// 			return Object.prototype.toString.call(obj) === '[object '+type+']'
// 		}
// 	})(type);
// }

// console.log(Type.isArray([]));//true
// console.log(Type.isString('abc'))//true



/*
//单例模式
var getSingle = function(fn){
	var ret;
	return function(){
		return ret || (ret = fn.apply(this,arguments));
	};
};

var a = {};
var getScript = getSingle(function(){
	return document.createElement('script');
});
var script1 = getScript();
var script2 = getScript();

console.log(script1 === script2);//true
*/


/*
//高阶函数实现AOP
Function.prototype.before = function(beforefn){
	var _self = this;//保存原函数的引用
	return function(){//返回包含了原函数和新函数的“代理”函数
		beforefn.apply(this,arguments);//执行新函数，修正this
		return _self.apply(this,arguments);//执行原函数
	}
};

Function.prototype.after = function(afterfn){
	var _self = this;
	return function(){
		var ret = _self.apply(this,arguments);
		afterfn.apply(this,arguments);
		return ret;
	}
};

var func = function(){
	console.log(2);
};

func = func.before(function(){
	console.log(1);
}).after(function(){
	console.log(3)
})

func();//1  2   3
*/




// Function.prototype.before = function(beforefn){
// 	return function(){
// 		beforefn.apply(this,arguments);
// 		return this();
// 	}.bind(this);
// };

// Function.prototype.after = function(afterfn){
// 	return function(){
// 		var ret = this.apply(this,arguments);
// 		afterfn.apply(this,arguments);
// 		return ret;
// 	}.bind(this);
// };

// var func = function(){
// 	console.log(2);
// };

// func = func.before(function(){
// 	console.log(1);
// }).after(function(){
// 	console.log(3);
// });
// func();//1  2   3






// var a = {};
// var func = function(){
// 	console.log(11)
// }
// var c = func.call(a);//undefined





//柯里化 currying


// var monthlyCost = 0;
// var cost = function(money){
// 	monthlyCost += money;
// };

// cost(100);
// cost(200);
// cost(300);
// console.log(monthlyCost);




// var cost = (function(){
// 	var args = [];
// 	return function(){
// 		if(arguments.length === 0){
// 			var money = 0;
// 			for(var i=0,l=args.length;i<l;i++){
// 				money += args[i];
// 			}
// 			return money;
// 		}else{
// 			[].push.apply(args,arguments);
// 		}
// 	}
// })();

// cost(100);
// cost(200);
// cost(300);
// console.log(cost());




// var currying = function(fn){
// 	var args = [];
// 	return function(){
// 		if(arguments.length === 0){
// 			return fn.apply(this,args);
// 		}else{
// 			[].push.apply(args,arguments);
// 			return arguments.callee;
// 		}
// 	}
// };

// var cost = (function(){
// 	var money = 0;
// 	return function(){
// 		for(var i=0,l=arguments.length;i<l;i++){
// 			money += arguments[i];
// 		}
// 		return money;
// 	}
// })();

// var a = {};
// var cost = currying(cost);
// cost.call(a,100);
// cost.call(a,200);
// console.log(cost.call(a));








// var obj1 = {
// 	name:"sven"
// };

// var obj2 = {
// 	getName:function(){
// 		return this.name;
// 	}
// };

// console.log(obj2.getName.call(obj1));//sven




// (function(){
// 	Array.prototype.push.call(arguments,4);
// 	console.log(arguments);
// })(1,2,3);



//uncurrying
/*
Function.prototype.uncurrying = function(){
	var self = this;
	return function(){
		var obj = Array.prototype.shift.call(arguments);
		return self.apply(obj,arguments);
	}
};

var push = Array.prototype.push.uncurrying();
(function(){
	push(arguments,4);
	console.log(arguments);
})(1,2,3,4,5);

*/





/*
Function.prototype.uncurrying = function(){
	var self = this;
	// console.log(this===Array.prototype['push'])//true
	return function(){
		var obj = Array.prototype.shift.call(arguments);
		return self.apply(obj,arguments);
	}
};

for(var i=0,fn,ary=['push','shift','forEach'];fn=ary[i++];){
	Array[fn] = Array.prototype[fn].uncurrying();
}

var obj = {
	length:3,
	'0':1,
	'1':2,
	'2':3
};
Array.push(obj,4);
console.log(obj.length);//4

var first = Array.shift(obj);
console.log(first);//1
console.log(obj);//{0: 2, 1: 3, 2: 4, length: 3}

Array.forEach(obj,function(i,n){
	console.log(i,n);//2 0  3 1   4 2
});
*/	


/*
Function.prototype.uncurrying = function(){
	var self = this;
	// console.log(this===Array.prototype['push'])//true
	return function(){
		var obj = Array.prototype.shift.call(arguments);
		return self.apply(obj,arguments);
	}
};

var call = Function.prototype.call.uncurrying();
var fn = function(name){
	console.log(name);
};
call(fn,window,'sven');

var apply = Function.prototype.apply.uncurrying();
var fn = function(name){
	console.log(this.name);
	console.log(arguments);
};

apply(fn,{name:'sven'},[1,2,3]);
*/



/*
Function.prototype.uncurrying = function(){
	var self = this;
	// console.log(this===Array.prototype.push])//true
	return function(){
		var obj = Array.prototype.shift.call(arguments);
		// console.log(obj);
		// obj是{
		// 	'length':1,
		// 	'0':1
		// }
		//arguments对象的第一个元素被截去，剩下[2]
		return self.apply(obj,arguments);
		//相当于Array.prototype.push.apply(obj,2);
	}
};

var push = Array.prototype.push.uncurrying();
var obj = {
	'length':1,
	'0':1
};
push(obj,2);
console.log(obj);
*/



/*
//函数节流
var throttle = function(fn,interval){
	var _self = fn,//保存需要被延迟执行的函数引用
		timer, //定时器
		firstTime = true;  //是否是第一次调用
	return function(){
		var args = arguments,
			_me = this;

		if(firstTime){ //如果是第一次调用，不需要延迟
			_self.apply(_me,args);
			return firstTime = false;
		}

		if(timer){ //如果定时器还在，说明前一次延迟执行还没有完成
			return false;
		}

		timer = setTimeout(function(){ //延迟一段时间执行
			clearTimeout(timer);
			timemr = null;
			_self.apply(_me,args);
		},interval || 500);

	};
};

window.onresize = throttle(function(){
	console.log(1);
},500);
*/




//分时函数
/*
//原函数
var ary = [];
for(var i=1;i<1000;i++){
	ary.push(i);
}

var renderFriendList = function(data){
	for(var i=0,len=data.length;i<len;i++){
		var div = document.createElement("div");
		div.innerHTML = i;
		document.body.appendChild(div);
	}
};

renderFriendList(ary);
*/

/*
//完整版
var timeChunk = function(ary,fn,count){
	var obj,
		t;

	var len = ary.length;
	var start = function(){
		for(var i=0;i<Math.min(count || 1,ary.length);i++){
			var obj = ary.shift();
			fn(obj);
		}
	};


	return function(){
		t = setInterval(function(){
			if(ary.length === 0){ //如果全部节点都已经被创建好
				return clearInterval(t);
			}
			start();
		},1000); //分批执行的时间间隔，也可以用参数的形式传入
	};

};



var ary = [];
for(var i=0;i<100;i++){
	ary.push(i);
}

var renderFriendList = timeChunk(ary,function(n){
	var div = document.createElement("div");
	div.innerHTML = n;
	document.body.appendChild(div);
},8);

renderFriendList();
*/



/*
var timeChunk = function(arr,fn,count){
	var start = function(){
		for(var i=0;i<Math.min(count||1,arr.length);i++){
			var obj = arr.shift();
			fn(obj);
		}
	}
	return function(){
		var t = setInterval(function(){
			if(arr.length === 0){
				return clearInterval(t);
			}

			start();

		},1000);
	}
}


var ary = [];
for(var i=0;i<100;i++){
	ary.push(i);
}

var renderFriendList = timeChunk(ary,function(n){
	var div = document.createElement("div");
	div.innerHTML = n;
	document.body.appendChild(div);
},8);

renderFriendList();
*/




// var addEvent = function(elem,type,handler){
// 	if(window.addEventListener){
// 		return elem.addEventListener(type,handler,false);
// 	}
// 	if(window.attachEvent){
// 		return elem.attachEvent('on'+type,handler);
// 	}
// };



// var addEvent = (function(){
// 	if(window.addEventListener){
// 		return function(elem,type,handler){
// 			elem.addEventListener(type,handler,false);
// 		}
// 	}
// 	if(window.attachEvent){
// 		return function(elem,type,handler){
// 			elem.attachEvent('on'+type,handler);
// 		}
// 	}


// })();

/*
//惰性加载函数
var addEvent = function(elem,type,handler){
	if(window.addEventListener){
		addEvent = function(elem,type,handler){
			elem.addEventListener(type,handler,false);
		}
	}else if(window.attachEvent){
		addEvent = function(elem,type,handler){
			elem.attachEvent('on'+type,handler);
		}
	}

	addEvent(elem,type,handler);
};

var div = document.getElementById("div1");
addEvent(div,'click',function(){
	console.log(1);
});

addEvent(div,'click',function(){
	console.log(2);
});
*/














