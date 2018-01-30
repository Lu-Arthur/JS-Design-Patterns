

/*
var order = function (orderType, pay, stock) {
	if (orderType === 1) {
		if (pay === true) {
			console.log('500元定金预购，得到100优惠券');
		} else {
			if (stock > 0) {
				console.log('普通购买，无优惠券');
			} else {
				console.log('手机库存不足');
			}
		}
	} else if (orderType === 2) {
		if (pay === true) {
			console.log('200元定金预购，得到50元优惠券');
		} else {
			if (stock > 0) {
				console.log('普通购买，无优惠券');
			} else {
				console.log('手机库存不足');
			}
		}
	} else if (orderType === 3) {
		if (stock > 0) {
			console.log('普通购买，无优惠券');
		} else {
			console.log('手机库存不足');
		}
	}
};

order(1, true, 500);

*/


// 用职责链重构代码

/*
// 500元订单
var order500 = function (orderType, pay, stock) {
	if (orderType === 1 && pay === true) {
		console.log('500元定金预购，得到100优惠券');
	} else {
		order200(orderType, pay, stock);
	}
};

// 200元订单
var order200 = function (orderType, pay, stock) {
	if (orderType === 2 && pay === true) {
		console.log('200元定金预购，得到50元优惠券');
	} else {
		orderNormal(orderType, pay, stock);
	}
};


// 普通订单购买
var orderNormal = function (orderType, pay, stock) {
	if (stock > 0) {
		console.log('普通购买，无优惠券');
	} else {
		console.log('手机库存不足');
	}
};


order500(1, true, 500);
order500(1, false, 500);
order500(2, true, 500);
order500(3, false, 500);
order500(3, false, 0);

*/



// 灵活可拆分的职责链节点
/*
var order500 = function (orderType, pay, stock) {
	if (orderType === 1 && pay === true) {
		console.log('500元定金预购，得到100优惠券');
	} else {
		return "nextSuccess";
	}
};

var order200 = function (orderType, pay, stock) {
	if (orderType === 2 && pay === true) {
		console.log('200元定金预购，得到50优惠券');
	} else {
		return "nextSuccess";
	}
};

var orderNormal = function (orderType, pay, stock) {
	if (stock > 0) {
		console.log('普通购买，无优惠券');
	} else {
		console.log('手机库存不足');
	}
};



// Chain.prototype.setNextSuccessor  指定在链中的下一个节点
// Chain.prototype.passRequest  传递请求给某个节点


var Chain = function (fn) {
	this.fn = fn;
	this.successor = null;
};

Chain.prototype.setNextSuccessor = function (successor) {
	return this.successor = successor;
};

Chain.prototype.passRequest = function () {
	var ret = this.fn.apply(this, arguments);

	if (ret === "nextSuccess") {
		return this.successor && this.successor.passRequest.apply(this.successor, arguments);
	}
	return ret;
};


var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainNormal = new Chain(orderNormal);

// 指定节点在职责链中的顺序

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainNormal);



chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(2, true, 500);
chainOrder500.passRequest(3, true, 500);
chainOrder500.passRequest(4, false, 0);
*/




/*
var Chain = function (fn) {
	this.fn = fn;
	this.successor = null;
};

Chain.prototype.setNextSuccessor = function (successor) {
	return this.successor = successor;
};

Chain.prototype.passRequest = function () {
	var ret = this.fn.apply(this, arguments);

	if (ret === "nextSuccess") {
		return this.successor && this.successor.passRequest.apply(this.successor, arguments);
	}
	return ret;
};

Chain.prototype.next = function () {
	return this.successor && this.successor.passRequest.apply(this.successor, arguments);
};


var fn1 = new Chain(function () {
	console.log(1);
	return "nextSuccess";
});

var fn2 = new Chain(function () {
	console.log(2);
	var self = this;
	setTimeout(function () {
		self.next();
	}, 1000);
});

var fn3 = new Chain(function () {
	console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();

*/



// 用AOP实现职责链
/*
var order500 = function (orderType, pay, stock) {
	if (orderType === 1 && pay === true) {
		console.log('500元定金预购，得到100优惠券');
	} else {
		return "nextSuccess";
	}
};

var order200 = function (orderType, pay, stock) {
	if (orderType === 2 && pay === true) {
		console.log('200元定金预购，得到50优惠券');
	} else {
		return "nextSuccess";
	}
};

var orderNormal = function (orderType, pay, stock) {
	if (stock > 0) {
		console.log('普通购买，无优惠券');
	} else {
		console.log('手机库存不足');
	}
};


Function.prototype.after = function (fn) {
	var self = this;
	return function () {
		var ret = self.apply(this, arguments);
		if (ret === "nextSuccess") {
			return fn.apply(this, arguments);
		}
		
		return ret;
	}
};

var order = order500.after(order200).after(orderNormal);
order(1, true, 500);
order(2, true, 500);
order(1, false, 500);
*/



// 用职责链模式获取文件上传对象
/*
Function.prototype.after = function (fn) {
	var self = this;
	return function () {
		var ret = self.apply(this, arguments);
		if (ret === "nextSuccess") {
			return fn.apply(this, arguments);
		}
		
		return ret;
	}
};

var getActiveUploadObj = function () {
	try {
		return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE上传控件
	} catch (e) {
		return "nextSuccess";
	}
};

var getFlashUploadObj = function () {
	if (supportFlash()) {
		var str = '<object type="application/x-shockwave-flash"></object>';
		return $(str).appendTo($('body'));
	}
	
	return "nextSuccess";
};

var getFormUploadObje = function () {
	return $('<form><input type="file" name="file"></form>').appendTo($('body'));
};

var getUploadObj = getActiveUploadObj.after(getFlashUploadObj).after(getFormUploadObje);
*/