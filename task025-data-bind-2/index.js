/*
* @Author: heqingqiu
* @Date:   2017-04-06 20:10:59
* @Last Modified by:   cloudseer
* @Last Modified time: 2017-04-07 16:32:46
*/

'use strict';
let data = {
	user: {
		name: 'lesley',
		age: '22'
	},
	education: {
		college: 'cuc',
		master: 'sysu'
	}
};

function Observer(data){
	this.data = data;
	this.walk(data);
	this.handlers = {};
}

let p = Observer.prototype;

p.walk = function(data){
	var value;
	for(var item in data){
		if(data.hasOwnProperty(item)){
			value = data[item];
			if(typeof value === 'object'){
				new Observer(value);
			}
			this.convert(item, value);
		}
	}
}

p.convert = function(item, value){
	var self = this;
	Object.defineProperty(this.data, item, {
		enumerable: true,
		configurable: true,
		get: function(){
			console.log('我被点啦！我是 ' + item);
			
		},
		set: function(newValue){
			console.log('小心一点，我要被改了,我是 ' + item);
			console.log('你把我改成了 ' + newValue);
			value = newValue;
			if(item in self.handlers){
				for(var i = 0; i < self.handlers[item].length; i++){
					self.handlers[item][i](newValue);
				}
			}
		}
	})
}
p.$watch = function(eventType, callback){
	var self = this;
	if(!(eventType in self.handlers)){
		self.handlers[eventType] = [];
	}
	self.handlers[eventType].push(callback);
}
