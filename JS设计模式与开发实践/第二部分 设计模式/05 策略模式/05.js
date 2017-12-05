

//原代码
/*
var calculateBonus = function(performanceLevel,salary){
	if(performanceLevel === "S"){
		return salary * 4;
	}
	if(performanceLevel === "A"){
		return salary * 3;
	}
	if(performanceLevel === "B"){
		return salary * 2;
	}
};


var lili = calculateBonus("B",20000);//40000
var lucy = calculateBonus("S",6000);//24000
console.log(lili,lucy);
*/




//使用组合函数重构代码
/*
var performanceS = function(salary){
	return salary * 4;
};
var performanceA = function(salary){
	return salary * 3;
};
var performanceB = function(salary){
	return salary * 2;
};

var calculateBonus = function(performanceLevel,salary){
	if (performanceLevel === "S") {
		return performanceS(salary);
	}
	if(performanceLevel === "A"){
		return performanceA(salary);
	}
	if(performanceLevel === "B"){
		return performanceB(salary);
	}
};

var lili = calculateBonus("A",10000);
console.log(lili);//30000
*/



//使用策略模式重构代码


/*
//①模仿传统面向对象语言中的实现

//策略类 
var performanceS = function(){}
performanceS.prototype.calculate = function(salary){
	return salary * 4;
};

var performanceA = function(){}
performanceA.prototype.calculate = function(salary){
	return salary * 3;
};

var performanceB = function(){}
performanceB.prototype.calculate = function(salary){
	return salary * 2;
};

//奖金类Bonus
var Bonus = function(){
	this.salary = null; //原始工资
	this.strategy = null;//绩效等级对应的策略对象
};
Bonus.prototype.setSalary = function(salary){
	this.salary = salary;//设置员工的原始工资
};
Bonus.prototype.setStrategy = function(strategy){
	this.strategy = strategy;//设置员工绩效等级对应的策略对象
};
Bonus.prototype.getBonus = function(){
	return this.strategy.calculate(this.salary);//把计算奖金的操作委托给对应的策略对象
};


//使用
var bonus = new Bonus();
bonus.setSalary(10000);
bonus.setStrategy(new performanceS());//设置策略对象

console.log(bonus.getBonus());//40000

bonus.setStrategy(new performanceA());
console.log(bonus.getBonus());//30000

*/


/*
//②JS版本的策略模式

var strategies = {
	"S":function(salary){
		return salary * 4;
	},
	"A":function(salary){
		return salary * 3;
	},
	"B":function(salary){
		return salary * 2;
	}
};

var calculateBonus = function(level,salary){
	return strategies[level](salary);
};
console.log(calculateBonus("S",20000));//80000
console.log(calculateBonus("A",10000));//30000
*/



//使用策略模式实现缓动动画

//让小球动起来

/*
//四个参数：动画已消耗的时间，小球原始位置，小球目标位置，动画持续的总时间,返回的值则是动画元素应该处在的当前位置
var tween = {
	linear:function(t,b,c,d){
		return c*t/d + b;
	},
	easeIn:function(t,b,c,d){
		return c*(t/=d)*t + b;
	},
	strongEaseIn:function(t,b,c,d){
		return c*(t/=d)*t*t*t*t + b;
	},
	strongEaseOut:function(t,b,c,d){
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	sineaseIn:function(t,b,c,d){
		return c*(t/=d)*t*t + b;
	},
	sineaseOut:function(t,b,c,d){
		return c*((t=t/d-1)*t*t+1) + b;
	}
};

var Animate = function(dom){
	this.dom = dom; //进行运动的dom节点
	this.startTime = 0; //动画开始时间
	this.startPos = 0; //动画开始时，dom节点的位置，即dom的初始位置
	this.endPos = 0; //动画结束时，dom节点的位置，即dom的目标位置
	this.propertyName = null; //dom节点需要被改变的css属性名
	this.easing = null; //缓动算法
	this.duration = null; //动画持续时间
};

Animate.prototype.start = function(propertyName,endPos,duration,easing){
	this.startTime = +new Date; //动画启动时间
	this.startPos = this.dom.getBoundingClientRect()[propertyName]; //dom节点的初始位置
	this.propertyName = propertyName; //dom节点需要被改变的css属性名
	this.endPos = endPos;//dom节点的目标位置
	this.duration = duration; //动画持续时间
	this.easing = tween[easing]; //缓动算法

	var self = this;
	var timeId = setInterval(function(){//启动定时器开始执行动画
		if(self.step() === false){//如果动画结束，则清楚定时器
			clearInterval(timeId);
		}
	},19);
};


Animate.prototype.step = function(){
	var t = +new Date;//取得当前时间
	if(t >= this.startTime + this.duration){
		this.update(this.endPos);
		return false;
	}
	var pos = this.easing(t - this.startTime,this.startPos,this.endPos-this.startPos,this.duration);//pos为小球当前位置
	this.update(pos);//更新小球的css属性值
};

Animate.prototype.update = function(pos){
	this.dom.style[this.propertyName] = pos + "px";
};

var div = document.getElementById("div");
var animate = new Animate(div);
animate.start("left",500,1000,"strongEaseOut");
// animate.start("top",300,500,"strongEaseIn");

*/



//表单校验

//表单校验的第一个版本
/*
var registerForm = document.getElementById("registerForm");
registerForm.onsubmit = function(){
	if(registerForm.userName.value === ""){
		alert("用户名不能为空");
		return false;
	}

	if(registerForm.password.value.length < 6){
		alert("密码长度不能少于6位");
		return false;
	}

	if(!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.phoneNumber.value)){
		alert("手机号码格式不正确");
		return false;
	}
};
*/


//用策略模式重构表单检验
/*
var strategies = {
	isNonEmpty:function(value,errorMsg){//不为空
		if(value === ''){
			return errorMsg;
		}
	},
	minLength:function(value,length,errorMsg){
		if(value.length < length){
			return errorMsg;
		}
	},
	isMobile:function(value,errorMsg){
		if(!/(^1[3|5|8][0-9]{9}$)/.test(value)){
			return errorMsg;
		}
	}
};


var Validator = function(){
	this.cache = [];//保存校验规则
};
Validator.prototype.add = function(dom,rule,errorMsg){
	var ary = rule.split(':');//把strategy和参数分开         ["minLength","6"]
	this.cache.push(function(){//把校验的步骤用空函数包装起来，并且放入cache
		var strategy = ary.shift(); //用户挑选的strategy
		// console.log(strategy) //"minLength"
		// console.log(ary) //["6"]
		ary.unshift(dom.value); //把input的value添加进参数列表
		ary.push(errorMsg); //把errorMsg添加进参数列表
		return strategies[strategy].apply(dom,ary);
	});
};
Validator.prototype.start = function(){
	for(var i=0,validatorFunc;validatorFunc = this.cache[i++];){
		var msg = validatorFunc();//开始校验，并取得校验后的返回信息
		if(msg){ //如果有确切的返回值，说明校验没有通过
			return msg;
		}
	}
};


var registerForm = document.getElementById("registerForm");

var validataFunc = function(){
	var validator = new Validator();//创建一个validator对象

	//添加一些校验规则
	validator.add(registerForm.userName,"isNonEmpty","用户名不能为空");
	validator.add(registerForm.password,"minLength:6","密码长度不能少于6位");
	validator.add(registerForm.phoneNumber,"isMobile","手机号码格式不正确");
	console.log(validator.cache)

	var errorMsg = validator.start(); //获得校验结果
	return errorMsg; //返回校验结果
};

registerForm.onsubmit = function(){
	var errorMsg = validataFunc(); //如果errorMsg有确切的返回值，说明未通过校验
	if(errorMsg){
		alert(errorMsg);
		return false; //阻止表单提交
	}
};
*/



//给某个文本输入框添加多种校验规则


/*************************策略对象******************************/
var strategies = {
	isNonEmpty:function(value,errorMsg){
		if(value === ''){
			return errorMsg;
		}
	},
	minLength:function(value,length,errorMsg){
		if(value.length < length){
			return errorMsg;
		}
	},
	isMobile:function(value,errorMsg){
		if(!/(^1[3|5|8][0-9]{9}$)/.test(value)){
			return errorMsg;
		}
	}
};


/*************************Validator类******************************/

var Validator = function(){
	this.cache = [];
};
Validator.prototype.add = function(dom,rules){
	var self = this;
	for(var i=0,rule;rule=rules[i++];){
		(function(rule){
			var strategyAry = rule.strategy.split(':');
			var errorMsg = rule.errorMsg;

			self.cache.push(function(){
				var strategy = strategyAry.shift();
				strategyAry.unshift(dom.value);
				strategyAry.push(errorMsg);
				
				return strategies[strategy].apply(dom, strategyAry);
			})
		})(rule);
	}
};
Validator.prototype.start = function(){
	for(var i=0,validatorFunc;validatorFunc = this.cache[i++];){
		var errorMsg = validatorFunc();
		if(errorMsg){
			return errorMsg;
		}
	}
};


/*************************客户调用代码******************************/

var registerForm = document.getElementById("registerForm");
var validataFunc = function(){
	var validator = new Validator();

	validator.add(registerForm.userName,[{
		strategy:"isNonEmpty",
		errorMsg:"用户名不能为空"
	},{
		strategy:"minLength:10",
		errorMsg:"用户名长度不能小于10位"
	}]);

	validator.add(registerForm.password,[{
		strategy:"minLength:6",
		errorMsg:"密码长度不能少于6位"
	}]);

	validator.add(registerForm.password,[{
		strategy:"isMobile",
		errorMsg:"手机号码格式不正确"
	}]);

	var errorMsg = validator.start();
	return errorMsg;
};

var dclick = document.getElementById("click");
dclick.onclick = function(){
	var errorMsg = validataFunc();
	console.log(errorMsg);
}

