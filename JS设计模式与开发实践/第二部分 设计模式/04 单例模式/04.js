

//实现单例模式

/*
var Singleton = function(name){
	this.name = name;
	this.instance = null;
};
Singleton.instance = null;
Singleton.prototype.getName = function(){
	console.log(this.name);
};
Singleton.getInstance = function(name){
	if(!this.instance){
		this.instance = new Singleton(name);
	}
	return this.instance;
};
var a = Singleton.getInstance("sven1");
var b = Singleton.getInstance("sven2");
console.log(a === b);//true
console.log(a)
console.log(b)
*/


/*
var Singleton = function(name){
	this.name = name;
};
Singleton.prototype.getName = function(){
	console.log(this.name);
};
Singleton.getInstance = (function(){
	var instance = null;
	return function(name){
		if(!instance){
			instance = new Singleton(name);
		}

		return instance;
	}
})();
var a = Singleton.getInstance("sven1");
var b = Singleton.getInstance("sven2");
console.log(a === b);//true
console.log(a)
console.log(b)
*/



// var Singleton = function(name){
// 	this.name = name;
// };
// Singleton.prototype.getName = function(){
// 	console.log(this.name);
// };
// Singleton.getInstance = (function(){
// 	var instance = null;
// 	return function(name){
// 		if(!instance){
// 			instance = new Singleton(name);
// 		}
// 		return instance;
// 	}
// })();



//透明的单例模式
/*
var CreateDiv = (function(){
	var instance;
	var CreateDiv = function(html){
		if(instance){
			console.log(11)
			return instance;
			console.log(22)
		}
		this.html = html;
		this.init();
		return instance = this;
	};

	CreateDiv.prototype.init = function(){
		var div = document.createElement("div");
		div.innerHTML = this.html;
		document.body.appendChild(div);
	};

	return CreateDiv;
})();

var a = new CreateDiv("sven1");
var b = new CreateDiv("sven2");
console.log(a===b);
console.log(a)
console.log(b)
*/








// [4,5,2,3].sort(function(a,b){
// 	return a-b;
// });




// var CreateDiv = (function(){

// 	var instance;
// 	var CreateDiv = function(html){
// 		if(instance){
// 			return instance;
// 		}
// 		this.html = html;
// 		this.init();
// 		return instance = this;
// 	}
// 	CreateDiv.prototype.init = function(){
// 		var div = document.createElement("div");
// 		div.innerHTML = this.html;
// 		document.body.appendChild(div);
// 	};

// 	return CreateDiv;


// })();

// var a = new CreateDiv("sven1");
// var b = new CreateDiv("sven2");
// console.log(a === b);
// console.log(a)



//用代理实现单例模式
/*
var CreateDiv = function(html){
	this.html = html;
	this.init();
};
CreateDiv.prototype.init = function(){
	var div = document.createElement("div");
	div.innerHTML = this.html;
	document.body.appendChild(div);
};

var ProxySingleCreateDiv = (function(){
	var instance;
	return function(html){
		if(!instance){
			instance = new CreateDiv(html);
		}
		return instance;
	}
})();

var a = new ProxySingleCreateDiv("sven1");
var b = new ProxySingleCreateDiv("sven2");
console.log(a === b);
console.log(a);
console.log(b);
*/


/*
var CreateDiv = function(html){
	this.html = html;
	this.init();
};
CreateDiv.prototype.init = function(){
	var div = document.createElement("div");
	div.innerHTML = this.html;
	document.body.appendChild(div);
};

var ProxySingleCreateDiv = (function(){
	var instance;
	return function(html){
		if(!instance){
			instance = new CreateDiv(html);
		}
		return instance;
	}
})();

var a = new ProxySingleCreateDiv("sven1");
var b = new ProxySingleCreateDiv("sven2");
console.log(a === b)
console.log(a)
console.log(b);
*/



//使用命名空间

// var namespace = {
// 	a:function(){
// 		console.log(1);
// 	},
// 	b:function(){
// 		console.log(2);
// 	}
// };



/*
var myApp = {};
myApp.namespace = function(name){
	var parts = name.split('.');
	var current = myApp;
	for(var i in parts){
		if(!current[parts[i]]){
			current[parts[i]] = {};
		}
		current = current[parts[i]];


	}
};

myApp.namespace("event");
myApp.namespace("dom.style");
console.dir(myApp);

myApp = {
	event:{},
	dom:{
		style:{}
	}
};
*/


// var user = (function(){
// 	var _name = "seven",
// 		_age = 29;

// 	return {
// 		getUserInfo:function(){
// 			return _name + "-" + _age;
// 		}
// 	}
// })();
// console.log(user.getUserInfo());


/*
Singleton.getInstance = (function(){
	var instance = null;
	return function(name){
		if(!instance){
			instance = new Singleton(name);
		}
		return instance;
	}
})();
*/


/*
var loginLayer = (function(){
	var div = document.createElement("div");
	div.innerHTML = "我是登录浮窗";
	div.style.display = "none";
	document.body.appendChild(div);
	return div;
})();
document.getElementById("loginBtn").onclick = function(){
	loginLayer.style.display = "block";
}
*/


/*
var createLoginLayer = function(){
	var div = document.createElement("div");
	div.innerHTML = "我是登录浮窗";
	div.style.display = "none";
	document.body.appendChild(div);
	return div;
};

document.getElementById("loginBtn").onclick = function(){
	var loginLayer = createLoginLayer();
	console.log(loginLayer);
	loginLayer.style.display = "block";
};
*/



/*
var createLoginLayer = (function(){
	var div;
	return function(){
		if(!div){
			div = document.createElement("div");
			div.innerHTML = "我是登录浮窗";
			div.style.display = "none";
			document.body.appendChild(div);
		}

		return div;
	}
})();


document.getElementById("loginBtn").onclick = function(){
	var loginLayer = createLoginLayer();
	console.log(loginLayer);
	loginLayer.style.display = "block";
};
*/

/*
var createIframe = (function(){
	var iframe;
	return function(){
		if(!iframe){
			vara iframe = document.createElement("iframe");
			iframe.style.display = "none";
			document.body.appendChild(iframe);
		}
		return iframe;
	}
})();
*/


//通用的惰性单例
/*
var getSingle = function(fn){
	var result;
	return function(){
		return result || (result = fn.apply(this,arguments));
	}
};
*/



/*
var getSingle = function(fn){
	var result;
	return function(){
		return result || (result = fn.apply(this,arguments));
	}
};

var createLoginLayer = function(){
	var div = document.createElement("div");
	div.innerHTML = "我是登录浮窗";
	div.style.display = "none";
	document.body.appendChild(div);
	return div;
};

var crateSingleLoginLayer = getSingle(createLoginLayer);


document.getElementById("loginBtn").onclick = function(){
	var loginLayer = crateSingleLoginLayer();
	loginLayer.style.display = "block";
}

var createSingleIframe = getSingle(function(){
	var iframe = document.createElement("iframe");
	document.body.appendChild(iframe);
	return iframe;
});
document.getElementById("loginBtn").onclick = function(){
	var loginLayer = createSingleIframe();
	loginLayer.src = "http://baidu.com";
}

*/

/*
var bindEvent = function(){
	$('div').on("click",function(){
		console.log("click");
	});
};

var render = function(){
	console.log("开始渲染列表");
	bindEvent();
};
render();
render();
render();
*/

/*
var getSingle = function(fn){
	var result;
	return function(){
		console.log(result)
		return result || (result = fn.apply(this,arguments));
	}
};

var bindEvent = getSingle(function(){
	document.getElementById("div1").onclick = function(){
		console.log("click");
	}

	return true;
});

var render = function(){
	console.log("开始渲染列表");
	bindEvent();
};

render();
render();
render();
*/















