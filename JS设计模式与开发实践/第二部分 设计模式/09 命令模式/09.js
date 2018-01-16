
//var button1 = document.getElementById("button1");
//var button2 = document.getElementById("button2");
//var button3 = document.getElementById("button3");


 /*
//传统实现命令模式
var setCommand = function(button, command){
	button.onclick = function(){
		command.execute();
	};
};


var MenuBar = {
	refresh:function(){
		console.log("刷新菜单目录");
	}
};

var SubMenu = {
	add:function(){
		console.log("增加子菜单");
	},
	del:function(){
		console.log("删除子菜单");
	}
};



var RefreshMenuBarCommand = function(receiver){
	this.receiver = receiver;
};

RefreshMenuBarCommand.prototype.execute = function(){
	this.receiver.refresh();
};

var AddSubMenuCommand = function(receiver){
	this.receiver = receiver;
};
AddSubMenuCommand.prototype.execute = function(){
	this.receiver.add();
};

var DelSubMenuCommand = function(receiver){
	this.receiver = receiver;
};
DelSubMenuCommand.prototype.execute = function(){
	console.log("删除子菜单")
};



var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);

setCommand(button1, refreshMenuBarCommand);
setCommand(button2, addSubMenuCommand);
setCommand(button3, delSubMenuCommand);

*/

/*
//闭包实现命令模式

var setCommand = function(button, func){
	button.onclick = function(){
		func();
	};
};

var MenuBar = {
	refresh: function(){
		console.log("刷新菜单界面");
	}
};
var RefreshMenuBarCommand = function(receiver){
	return function(){
		receiver.refresh();
	}
};

var refreshMenucBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand(button1, refreshMenucBarCommand);
*/
/*
var MenuBar = {
	refresh: function(){
		console.log("刷新菜单界面");
	}
};

var RefreshMenuBarCommand = function(receiver){
	return {
		execute:function(){
			receiver.refresh();
		}
	}
};

var setCommand = function(button, command){
	button.onclick = function(){
		command.execute();
	}
};

var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand(button1, refreshMenuBarCommand);
*/




//小球动画
/*
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

*/

//var ball = document.getElementById("ball");
//var pos = document.getElementById("pos");
//var moveBtn = document.getElementById("moveBtn");
//var cancelBtn = document.getElementById("cancelBtn");

/*
//原始
moveBtn.onclick = function(){
	var animate = new Animate(ball);
	animate.start('left', pos.value, 1000, 'strongEaseOut');
}
 */

/*
//命令模式修改

var MoveCommand = function(receiver, pos){
	this.receiver = receiver;
	this.pos = pos;
	this.oldPos = null;
};
MoveCommand.prototype.execute = function(){
	this.receiver.start('left', this.pos, 1000, 'strongEaseOut');
	this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName];
	//记录小球开始移动前的位置
};
MoveCommand.prototype.undo = function(){
	this.receiver.start('left', this.oldPos, 1000, 'strongEaseOut');
	//回到小球移动前记录的位置
}

var moveCommand;
moveBtn.onclick = function(){
	var animate = new Animate(ball);
	moveCommand = new MoveCommand(animate, pos.value);
	moveCommand.execute();
};
cancelBtn.onclick = function(){
	moveCommand.undo(); // 撤销命令
}

*/

/*
//撤销和重做
var Ryu = {
	attack:function(){
		console.log("攻击");
	},
	defense:function(){
		console.log("防御");
	},
	jump:function(){
		console.log("跳跃");
	},
	crouch:function(){
		console.log("蹲下");
	}
};

var makeCommand = function(receiver, state){
	return function(){
		receiver[state]();
	}
};

var commands = {
	"119":"jump", //w
	"115":"crouch",//s
	"97":"defense",//a
	"100":"attack"//d
};

var commandStack = [];// 保存命令的堆栈

document.onkeypress = function(ev){
	var keyCode = ev.keyCode,
		command = makeCommand(Ryu, commands[keyCode]);
	
	if (command) {
		command(); //执行命令
		commandStack.push(command); //将刚刚执行过的命令保存进堆栈
	}
};
document.getElementById('replay').onclick = function(){ // 点击播放录像
	var command;
	while (command = commandStack.shift()) {
		command();
	}
};

*/


//宏命令

var closeDoorCommand = {
	execute: function(){
		console.log("关门");
	}
};

var openPcCommand = {
	execute: function(){
		console.log("开电脑");
	}
};

var openQQcommand = {
	execute: function(){
		console.log("登录QQ");
	}
};


var MacroCommand = function(){
	return {
		commandList: [],
		add: function(command){
			this.commandList.push(command);
		},
		execute: function(){
			for (var i = 0, command; command = this.commandList[i++];) {
				command.execute();
			}
		}
	}
};

var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQcommand);

macroCommand.execute();






