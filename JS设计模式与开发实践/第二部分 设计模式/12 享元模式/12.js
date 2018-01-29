


// 初识享元模式
/*
var Model = function (sex, underwear) {
	this.sex = sex;
	this.underwear = underwear;
};

Model.prototype.takePhoto = function () {
	console.log('sex = ' + this.sex + 'underwear = ' + this.underwear);
};

for (var i = 1; i <=50; i++) {
	var maleModel = new Model('male', 'underwear' + i);
	maleModel.takePhoto();
}

for (var j = 1; j <= 50; j++) {
	var femaleModel = new Model('female', 'underwear' + i);
	femaleModel.takePhoto();
}
*/


/*
var Model = function (sex) {
	this.sex = sex;
};
Model.prototype.takePhoto = function () {
	console.log('sex = ' + this.sex + ', ' + 'underwear = ' + this.underwear);
};

var maleModel = new Model("male"),
	femalModel = new Model("femal");

for (var i = 1; i <=50; i++) {
	maleModel.underwear = "underwear" + i;
	maleModel.takePhoto();
}

for (var j = 1; j<=50; j++) {
	femalModel.underwear = "underwear" + j;
	femalModel.takePhoto();
};
*/



// 文件上传的例子

/*
var id = 0;

window.startUpload = function (uploadType, files) {
	for (var i = 0, file; file = files[i++];) {
		var uploadObj = new Upload(uploadType, file.fileName, file.fileSize);
		uploadObj.init(id++);
	}
};

var Upload = function (uploadType, fileName, fileSize) {
	this.uploadType = uploadType;
	this.fileName = fileName;
	this.fileSize = fileSize;
	this.dom = null;
};

Upload.prototype.init = function (id) {
	var that = this;
	this.id = id;
	this.dom = document.createElement('div');
	this.dom.innerHTML = '<span>文件名称：' + this.fileName + '，文件大小：' + this.fileSize + '</span>' +
						'<button class="delFile">删除</button>';
	this.dom.querySelector('.delFile').onclick = function () {
		that.delFile();
	};
	document.body.appendChild(this.dom);
};
Upload.prototype.delFile = function () {
	if (this.fileSize < 3000) {
		return this.dom.parentNode.removeChild(this.dom);
	}
	
	if (window.confirm('确定要删除该文件吗？' + this.fileName)) {
		return this.dom.parentNode.removeChild(this.dom);
	}
	
};


startUpload('plugin', [{
	fileName: '1.txt',
	fileSize: 1000
}, {
	fileName: '2.html',
	fileSize: 3000
}, {
	fileName: '3.txt',
	fileSize: 5000
}]);


startUpload('flash', [{
	fileName: '4.txt',
	fileSize: 1000
}, {
	fileName: '5.html',
	fileSize: 3000
}, {
	fileName: '6.txt',
	fileSize: 5000
}]);

*/


// 享元模式重构文件上传
/*
//剥离外部状态
var Upload = function (uploadType) {
	this.uploadType = uploadType;
};
Upload.prototype.delFile = function (id) {
	uploadManager.setExternalState(id, this);
	
	if (this.fileSize < 3000) {
		return this.dom.parentNode.removeChild(this.dom);
	}
	
	if (window.confirm('确定要删除该文件吗？' + this.fileName)) {
		return this.dom.parentNode.removeChild(this.dom);
	}
};

// 工厂进行对象实例化
var UploadFactory = (function () {
	var createdFlyWeightObjs = {};
	
	return {
		create: function (uploadType) {  // plugin
			if (createdFlyWeightObjs[uploadType]) {
				return createdFlyWeightObjs[uploadType];
			}
			
			return createdFlyWeightObjs[uploadType] = new Upload(uploadType);
		}
	};
})();


// 管理器封装外部状态

var uploadManager = (function () {
	var uploadDatabase = {};
	
	return {           // 1， plugin， '1.txt'， 1000
		add: function (id, uploadType, fileName, fileSize) { 
			var flyWeightObj = UploadFactory.create(uploadType);
			var dom = document.createElement('div');
			dom.innerHTML = '<span>文件名称：' + fileName + '，文件大小：' + fileSize + '</span>' +
						'<button class="delFile">删除</button>';
			dom.querySelector('.delFile').onclick = function () {
				flyWeightObj.delFile(id);
			};
			document.body.appendChild(dom);
			uploadDatabase[id] = {
				fileName: fileName,
				fileSize: fileSize,
				dom: dom
			};
			
			return flyWeightObj;
		},
		setExternalState: function (id, flyWeightObj) {
			var uploadData = uploadDatabase[id];
			for (var i in uploadData) {
				flyWeightObj[i] = uploadData[i];
			}
		}
	};
	
})();


var id = 0;
window.startUpload = function (uploadType, files) {  // plugin，  [{fileName: '1.txt',fileSize: 1000}]
	for (var i = 0, file; file = files[i++];) {
		var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
	}
};



startUpload('plugin', [{
	fileName: '1.txt',
	fileSize: 1000
}, {
	fileName: '2.html',
	fileSize: 3000
}, {
	fileName: '3.txt',
	fileSize: 5000
}]);

startUpload('flash', [{
	fileName: '4.txt',
	fileSize: 1000
}, {
	fileName: '5.html',
	fileSize: 3000
}, {
	fileName: '6.txt',
	fileSize: 5000
}]);


*/



// 对象池
/*
var toolTipFactory = (function () {
	var toolTipPool = []; // toolTip对象池
	
	return {
		create: function () {
			if (toolTipPool.length === 0) { //如果对象池为空
				var div = document.createElement("div"); // 创建一个dom
				document.body.appendChild(div);
				return div;
			} else { // 如果对象池不为空
				return toolTipPool.shift();  // 则从对象池中取出一个dom
			}
		},
		recover: function (tooltipDom) {
			return toolTipPool.push(tooltipDom);
		},
		toolTipPool: toolTipPool
	};
	
})();



var ary = [];
for (var i = 0, str; str = ['A', 'B'][i++];) {
	var toolTip = toolTipFactory.create();
	toolTip.innerHTML = str;
	ary.push(toolTip);
}

for (var j = 0, toolTip; toolTip = ary[j++];) {
	toolTipFactory.recover(toolTip);
}

for (var k = 0, str; str = ['A', 'B', 'C', 'D', 'E', 'F'][k++];) {
	var toolTip = toolTipFactory.create();
	toolTip.innerHTML = str;
}

*/



// 通用对象池的实现

var objectPoolFactory = function (createObjFn) {
	var objectPool = [];
	
	return {
		create: function () {
			var obj = objectPool.length === 0 ? createObjFn.apply(this, arguments) : objectPool.shift();
			
			return obj;
		},
		recover: function (obj) {
			objectPool.push(obj);
		},
	};
	
};


var iframeFactory = objectPoolFactory(function () {
	var iframe = document.createElement('iframe');
	document.body.appendChild(iframe);
	
	iframe.onload = function () {
		iframe.onload = null; // 防止iframe重复加载的bug
		iframeFactory.recover(iframe); // iframe加载完成之后回收节点
	}
	
	return iframe;
});


var iframe1 = iframeFactory.create();
iframe1.src = 'http://www.baidu.com';

var iframe2 = iframeFactory.create();
iframe2.src = 'http://www.QQ.com';

setTimeout(function () {
	var iframe3 = iframeFactory.create();
	iframe3.src = 'http://www.163.com';
}, 3000);





























