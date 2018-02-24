

// 模拟传统面向对象语言的装饰者模式
/*
var Plane = function () {};
Plane.prototype.fire = function () {
	console.log('发射普通子弹');
};

var MissileDecorator = function (plane) {
	this.plane = plane;
};
MissileDecorator.prototype.fire = function () {
	this.plane.fire();
	console.log('发射导弹');
};

var AtomDecorator = function (plane) {
	this.plane = plane;
};
AtomDecorator.prototype.fire = function () {
	this.plane.fire();
	console.log('发射原子弹');
};

var plane = new Plane();
plane = new MissileDecorator(plane);
plane = new AtomDecorator(plane);
plane.fire();
*/


// 回到JS的装饰者
/*
var plane = {
	fire: function () {
		console.log('发射普通子弹');
	}
};

var missileDecorator = function () {
	console.log('发射导弹');
};

var atomDecorator = function () {
	console.log('发射原子弹');
};

var fire1 = plane.fire;
plane.fire = function () {
	fire1();
	missileDecorator();
};

var fire2 = plane.fire;
plane.fire = function () {
	fire2();
	atomDecorator();
};

plane.fire();
*/



// 装饰函数
/*
var a = function () {
	console.log(1);
};

// 改成： 
var a = function () {
	console.log(1);
	console.log(2);
};
*/


// 保存引用
/*
var a = function () {
	console.log(1);
};

var _a = a;
a = function () {
	_a();
	console.log(2);
};
a();
*/

/*
window.onload = function () {
	console.log(1);
};

var _load = window.onload || function () {};
window.onload = function () {
	_load();
	console.log(2);
};
*/



// this劫持问题
/*
var _getElementById = document.getElementById;
document.getElementById = function (id) {
	console.log(1);
	return _getElementById.apply(document, arguments);
};
var button = document.getElementById('button');
*/


// 用AOP装饰函数
/*
Function.prototype.before = function (beforefn) {
	var _self = this; //保存原函数的引用
//	console.log(this); //a
	return function () { // 返回包含了原函数和新函数的“代理”函数
//		console.log(this); //window
		beforefn.apply(this, arguments); // 执行新函数， 且保证this不被劫持， 新函数接受的参数也会原封不动地传入原函数，新函数在原函数之前执行
		return _self.apply(this, arguments); // 执行原函数并返回原函数的执行结果，并且保证this不被劫持
	};
};

Function.prototype.after = function (afterfn) {
	var _self = this;
//	console.log(this); //function(){console.log(this);beforefn.apply(this, arguments);return _self.apply(this, arguments);}
	return function () {
//		console.log(this); //window
		var ret = _self.apply(this, arguments); //_self.apply(this, arguments); //2,1
//		console.log(ret) //undefined
		afterfn.apply(this, arguments);
		return ret;
	};
};
//
//document.getElementById = document.getElementById.before(function () {
//	console.log(1);
//});
//var button = document.getElementById('button');
//console.log(button);


function a() {
	console.log(1);
}

var fun = a.before(function () {
	console.log(2);
}).after(function () {
	console.log(3);
});
fun();
*/



/*
var before = function (fn, beforefn) {
	return function () {
		beforefn.apply(this, arguments);
		return fn.apply(this, arguments);
	};
};

var a = before(function () {
	console.log(3);
}, function () {
	console.log(2);
});

a = before(a, function () {
	console.log(1);
});
a();
*/


// AOP的应用实例
// 数据统计上报

/*
var showLogin = function () {
	console.log('打开登录浮窗');
	log(this.getAttribute('tag'));
};

var log = function (tag) {
	console.log('上报标签为：' + tag);
};

document.getElementById('button').onclick = showLogin;

*/

// AOP分离
/*
Function.prototype.after = function (afterfn) {
	var _self = this;
	return function () {
		var ret = _self.apply(this, arguments);
		afterfn.apply(this, arguments);
		return ret;
	};
};


var showLogin = function () {
	console.log('打开登录浮窗');
};
var log = function () {
	console.log('上报标签为：' + this.getAttribute('tag'));
};

showLogin = showLogin.after(log);
document.getElementById('button').onclick = showLogin;
*/


// 用AOP动态改变函数的参数
/*
Function.prototype.before = function (beforefn) {
	var _self = this; 
	return function () { 
		beforefn.apply(this, arguments); 
		return _self.apply(this, arguments); 
	};
};

var func = function (param) {
	console.log(param);
};

func = func.before(function (param) {
	param.b = 'b';
});

func({
	a: 'a'
});
*/


// 插件式的表单验证

/*
var username = document.getElementById('username'),
	password = document.getElementById('password'),
	submitBtn = document.getElementById('submitBtn');
	
var formSubmit = function () {
	if (username.value === '') {
		return alert('用户名不能为空');
	}
	
	if (password.value === '') {
		return alert('密码不能为空');
	}
	
	var param = {
		username: username.value,
		password: password.value
	};
	ajax('http://xxx.com/login', param);
};
submitBtn.onclick = function () {
	formSubmit();
};

*/

/*
var validata = function () {
	if (username.value === '') {
		alert('用户名不能为空');
		return false;
	}
	
	if (password.value === '') {
		alert('密码不能为空');
		return false;
	}
};

var formSubmit = function () {
	if (validata() === false) {
		return;
	}
	
	var param = {
		username: username.value,
		password: password.value
	};
	ajax('http://xxx.com/login', param);
};
submitBtn.onclick = function () {
	formSubmit();
};

*/


Function.prototype.before = function (beforefn) {
	var _self = this;
	return function () {
		if (beforefn.apply(this, arguments) === false) {
			return;
		}
		
		return _self.apply(this, arguments);
	};
};

var validata = function () {
	if (username.value === '') {
		alert('用户名不能为空');
		return false;
	}
	
	if (password.value === '') {
		alert('密码不能为空');
		return false;
	}
};

var formSubmit = function () {
	var param = {
		username: username.value,
		password: password.value
	};
	ajax('http://xxx.com/login', param);
};

formSubmit = formSubmit.before(validata);

submitBtn.onclick = function () {
	formSubmit();
};




