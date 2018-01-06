
//JQ中的迭代器
/*
$.each([1,2,3], function(i, n) {
	console.log(i + ":" + n);
});
*/


//实现自己的迭代器
/*
var each = function(ary, callback){
	for (var i = 0, l = ary.length; i < l; i++){
		callback.call(ary[i], i, ary[i]);
	}
};

each([1, 2, 3], function(i, n){
	console.log(i + ":" + n);
})
*/


//内部迭代器和外部迭代器

//内部迭代器
/*
var each = function(ary, callback){
	for (var i = 0, l = ary.length; i < l; i++){
		callback.call(ary[i], i, ary[i]);
	}
};
var compare = function(ary1, ary2){
	if(ary1.length !== ary2.length){
		throw new Error("ary1和ary2不相等");
	}
	
	each(ary1, function(i, n){
		if(n !== ary2[i]){
			throw new Error("ary1和ary2不相等");
		}
	});
	console.log("ary1和ary2相等")
};

compare([1, 2, 3], [1, 2, 3]);
*/


//外部迭代器

/*
var Iterator = function(obj){
	var current = 0;
	var next = function(){
		current += 1;
	};
	var isDone = function(){
		return current >= obj.length;
	};
	var getCurrItem = function(){
		return obj[current];
	};
	return {
		next:next,
		isDone:isDone,
		getCurrItem:getCurrItem
	}
};

var compare = function(iterator1,iterator2){
	while(!iterator1.isDone() && !iterator2.isDone()){
		if(iterator1.getCurrItem() !== iterator2.getCurrItem()){
			throw new Error("iterator1和iterator2不相等");
		}
		iterator1.next();
		iterator2.next();
	}
	console.log("iterator1和iterator2相等")
};

var iterator1 = Iterator([1, 2, 3]);
var iterator2 = Iterator([1, 2, 3]);
compare(iterator1, iterator2);
*/


//迭代类数组对象和字面量对象
/*
var each = function(obj, callback){
	var value,
		i = 0,
		length = obj.length,
		isArray = isArray(obj);
		
	if(isArray){ // 迭代类数组
		for (; i < length; i++) {
			value = callback.call(obj[i], i, obj[i]);
			if (value === false){
				break;
			}
		}
	} else {
		for (i in obj) { // 迭代obj对象
			value = callback.call(obj[i], i, obj[i]);
			if (value === false) {
				break;
			}
		}
	}
	
	return obj;
};
*/


//倒序迭代器
/*
var reverseEach = function(ary, callback){
	for (var l = ary.length - 1; l >= 0; l--) {
		callback(l, ary[l]);
	}
};
reverseEach([0, 1, 2], function(i, n){
	console.log(n);
});
*/



//中止迭代器
/*
var each = function(ary, callback){
	for (var i = 0, l = ary.length; i < l; i++) {
		if (callback(i, ary[i]) === false) { // callback的执行结果返回false,提前终止迭代
			break;
		}
	}
};

each([1, 2, 3, 4, 5], function(i, n){
	if (n > 3){
		return false;
	}
	console.log(n)
});
*/


//迭代器模式的应用举例
/*
var getActiveUploadObj = function(){
	try {
		return new ActiveXObject("TXFNActiveX.FTNUpload"); //IE上传控件
	} catch(e) {
		return false;
	}
};

var getFlashUploadObj = function(){
	if (supportFlash()) {
		var str = '<object type="application/x-shockwave-flash"></object>';
		return $(str).appendTo($("body"));
	}
	return false;
};

var getFormUploadObj = function(){
	var str = '<input name="file" type="file" class="ui-file">'; //表单上传
	return $(str).appendTo($("body"));
};

//迭代器代码
var iteratorUploadObj = function(){
	for (var i = 0, fn; fn = arguments[i++];) {
		var uploadObj = fn();
		if (uploadObj !==false) {
			return uploadObj;
		}
	}
};

var uploadObj = getFormUploadObj(getFlashUploadObj, getFormUploadObj, iteratorUploadObj);
*/




//var arr = [1, 5, 2, 3, 4, 2, 3, 1, 3, 4];
//
//function unique(array){
//	var temp = []; 
//	for(var i = 0; i < array.length; i++){
//	    if (temp.indexOf(array[i]) == -1){
//	    	temp.push(array[i]);
//	    } 
//	}
//	return temp;
//}
//console.log(unique(arr))

//function unique(array){
//var n = {}, r = [], len = array.length, val, type;
//  for (var i = 0; i < array.length; i++) {
//      val = array[i];
//      type = typeof val;
//      if (!n[val]) {
//          n[val] = [type];
//          r.push(val);
//      } else if (n[val].indexOf(type) < 0) {
//          n[val].push(type);
//          r.push(val);
//      }
//  }
//  return r;
//}
//console.log(unique(arr))














































