/*
* @Author: heqingqiu
* @Date:   2017-03-20 20:16:35
* @Last Modified by:   cloudseer
* @Last Modified time: 2017-03-20 20:36:15
*/

//定义一个对象
let data = {
	user:{
		name:'lesley',
		age:'22'
	},
	school:{
		schoolName:'sysu',
		major:'UX'
	}
}
//使用一个函数去watch一个对象的变化
function Observer(data){
	this.data = data;
	this.walk(data)
}
//使用new Observer(data)创建一个构造函数的实例时，this会指向新创造的对象
//此时用函数参数来设置新对象的data属性
//为新的变量定义walk方法

let p = Observer.prototype;

p.walk = function(obj){
	var value;
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			value = obj[key];
			if(typeof value === 'object'){
				new Observer(value);
			}
			this.convert(key,value);//在这里为属性设置get set
		}
	}
}

p.convert = function(key,val){
	//使用Object.defineProperty(obj,prop,descriptor)
	//The Object.defineProperty() method defines a new property directly on an object, or modifies an existing property on an object, and returns the object.
	Object.defineProperty(this.data,key,{
		enumerable:true,
		configurable:true,
		get: function(){
			console.log('你访问了' + key);
			return val;
		},
		set:function(newVal){
			console.log('你在设置' + key);
			console.log('新的' + key + ' = ' + newVal)
            if (newVal === val) return;
            val = newVal
		}
	})
}
var app = new Observer(data);
