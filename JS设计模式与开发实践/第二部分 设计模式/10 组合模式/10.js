

//回顾宏命令
/*
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

var openQQCommand = {
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
macroCommand.add(openQQCommand);

macroCommand.execute();
*/




//更强大的宏命令
/*
var MacroCommand = function(){
	return {
		commandList:[],
		add:function(command){
			this.commandList.push(command);
		},
		execute:function(){
			for (var i = 0, command; command = this.commandList[i++];) {
				command.execute();
			}
		}
	}
};


var openAcCommand = {
	execute:function(){
		console.log("打开空调");
	}
};


//电视和音响是连接在一起的，所以可以用一个宏命令来组合打开电视和打开音响的命令

var openTvCommand = {
	execute:function(){
		console.log("打开电视");
	}
};

var openSoundCommand = {
	execute:function(){
		console.log("打开音响");
	}
};

var macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);

//关门，打开电脑和登录QQ命令
var closeDoorCommand = {
	execute: function() {
		console.log("关门");
	}
};

var openPCCommand = {
	execute: function() {
		console.log("开电脑");
	}
};

var openQQCommand = {
	execute: function() {
		console.log("登录QQ");
	}
};

var macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPCCommand);
macroCommand2.add(openQQCommand);


//现在把所有命令组合成一个超级命令
var macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);


//最后给遥控器绑定"超级命令"

var setCommand = (function(command) {
	document.getElementById("button").onclick = function() {
		command.execute();
	}
})(macroCommand);

*/

//透明性带来的安全问题
/*
var MacroCommand = function() {
	return {
		commandList: [],
		add: function(command) {
			this.commandList.push(command);
		},
		execute: function() {
			for (var i = 0, command; command = this.commandList[i++];) {
				command.execute();
			}
		}
	}
};

var openTvCommand = {
	execute: function() {
		console.log("打开电视");
	},
	add: function() {
		throw new Error("叶对象不能添加子节点");
	}
};

var macroCommand = MacroCommand();
macroCommand.add(openTvCommand);
openTvCommand.add(macroCommand);//Uncaught Error: 叶对象不能添加子节点

*/


// 组合模式的例子，扫描文件夹

/*
//文件夹Folder类
var Folder = function(name) {
	this.name = name;
	this.files = [];
};
Folder.prototype.add = function(file) {
	this.files.push(file);
};
Folder.prototype.scan = function() {
	console.log("开始扫描文件夹：" + this.name);
	for (var i = 0, file, files = this.files; file = files[i++];) {
		file.scan();
	}
};


//文件类File
var File = function(name) {
	this.name = name;
};

File.prototype.add = function() {
	throw new Error("文件下面不能再添加文件");
};
File.prototype.scan = function() {
	console.log("开始扫描文件：" + this.name);
};


//创建一些文件夹和文件对象，并且让他们组合成一棵树，这棵树就是我们磁盘里现有的文件目录结构

var folder = new Folder("学习资料");
var folder1 = new Folder("JavaScript");
var folder2 = new Folder("JQuery");

var file1 = new File("JavaScript设计模式与开发实践");
var file2 = new File("精通Jquery");
var file3 = new File("重构与模式");

folder1.add(file1);
folder2.add(file2);

folder.add(folder1);
folder.add(folder2);
folder.add(file3);



var folder3 = new Folder("Node.js");
var file4 = new File("深入浅出Node.js");
folder3.add(file4);
var file5 = new File("JavaScript语言精髓与编程实践");

folder.add(folder3);
folder.add(file5);

folder.scan();
*/


//引用父对象

/*
var Folder = function(name) {
	this.name = name;
	this.parent = null;
	this.files = [];
};

Folder.prototype.add =  function(file) {
	file.parent = this; // 设置父对象
	this.files.push(file);
};

Folder.prototype.scan = function() {
	console.log("开始扫描文件夹：" + this.name);
	for (var i = 0, file, files = this.files; file = files[i++];) {
		file.scan();
	}
};

Folder.prototype.remove = function() {
	if (!this.parent) {  // 根节点或者树外的游离节点
		return;
	}
	for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
		var file = files[l];
		if (file === this) {
			files.splice(l, 1);
		}
	}
};


var File = function (name) {
	this.name = name;
	this.parent = null;
};

File.prototype.add = function () {
	throw new Error("不能添加在文件下面");
};

File.prototype.scan = function () {
	console.log("开始扫描文件：" + this.name);
};

File.prototype.remove = function () {
	if (!this.parent) { // 根节点或树外的游离节点
		return; 
	}
	for (var files = this.parent.files, l = files.length - 1; l >=0; l--) {
		var file = files[l];
		if (file === this) {
			files.splice(l, 1);
		}
	}
};


var folder = new Folder("学习资料");
var folder1 = new Folder("JS");
var file1 = new Folder("深入浅出Node.js");

folder1.add(new File("JS设计模式与开发实践"));
folder.add(folder1);
folder.add(file1);

folder1.remove();//移除文件夹

folder.scan();

*/

































