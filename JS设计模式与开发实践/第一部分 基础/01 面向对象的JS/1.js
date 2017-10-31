
/*
//鸭子类型

var duck = {
	duckSinging:function() {
		console.log("嘎嘎嘎");
	}
};

var chicken = {
	duckSinging:function(){
		console.log("嘎嘎嘎");
	}
};

var choir = [];//合唱团

var joinChoir = function(animal){
	if(animal && typeof animal.duckSinging === "function"){
		choir.push(animal);
		console.log("恭喜加入合唱团 ");
		console.log("合唱团已有成员数量："+choir.length);
	}
};

joinChoir(duck);//恭喜加入合唱团  合唱团已有成员数量: 1
joinChoir(chicken);//恭喜加入合唱团  合唱团已有成员数量: 2
*/


/*
//多态

var makeSound = function(animal){
	if(animal instanceof Duck){
		console.log("嘎嘎嘎");
	}else if(animal instanceof Chicken){
		console.log("咯咯咯");
	}
};

var Duck = function(){}
var Chicken = function(){}

makeSound(new Duck());//嘎嘎嘎
makeSound(new Chicken());//咯咯咯


//对象的多态性
var makeSound = function(animal){
	animal.sound();
};

var Duck = function(){}
Duck.prototype.sound = function(){
	console.log("嘎嘎嘎");
};

var Chicken = function(){}
Chicken.prototype.sound = function(){
	console.log("咯咯咯");
};

makeSound(new Duck());//嘎嘎嘎
makeSound(new Chicken());//咯咯咯
*/




/*

//多态在面向对象程序设计中的作用
var googleMap = {
	show:function(){
		console.log("开始渲染谷歌地图");
	}
};

var renderMap = function(){
	googleMap.show();
};

renderMap();//开始渲染谷歌地图


//增加百度地图

var googleMap = {
	show:function(){
		console.log("开始渲染谷歌地图");
	}
};

var baiduMap = {
	show:function(){
		console.log("开始渲染百度地图");
	}
};

var renderMap = function(type){
	if(type === "google"){
		googleMap.show();
	}else if(type === "baidu"){
		baiduMap.show();
	}
};

renderMap("google");//开始渲染谷歌地图
renderMap("baidu");//开始渲染百度地图




//优化
//把程序相同的部分抽象出来
var googleMap = {
	show:function(){
		console.log("开始渲染谷歌地图");
	}
};

var baiduMap = {
	show:function(){
		console.log("开始渲染百度地图");
	}
};

//增加搜搜地图
var sosoMap = {
	show:function(){
		console.log("开始渲染搜搜地图");
	}
};

var renderMap = function(map){
	if(map.show instanceof Function){
		map.show();
	}
};

renderMap(googleMap);//开始渲染谷歌地图
renderMap(baiduMap);//开始渲染百度地图
renderMap(sosoMap);//开始渲染搜搜地图
*/



/*
var myobj = (function(){
	var _name = "sven";   //私有变量(private)变量
	return {
		getName:function(){  //公开(public)方法
			return _name;
		}
	}
})();
console.log(myobj.getName()); //sven
console.log(myobj._name);  //undefined
*/



















