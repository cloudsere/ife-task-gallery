/*
* @Author: heqingqiu
* @Date:   2017-03-16 10:23:35
* @Last Modified by:   cloudseer
* @Last Modified time: 2017-03-16 11:59:51
*/

'use strict';

/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {
  function getTextInsideNode(el){
  	var txt = '';
  	if(el.nodeType == 3){
  		txt+=el.nodeValue;
  	}else{
  		if(el.childNodes){
  			for(var i = 0; i< el.childNodes.length; i++){
  				txt += getTextInsideNode(el.childNodes[i]);
  			}
  		}
  	}
  	return txt;
  }
  var sourceList = document.getElementById('source');
  var childrenList = sourceList.childNodes;
  var childrenListLength = childrenList.length;
  var data = [];
  for(var i = 0; i < childrenListLength; i++){
  	if(childrenList[i].nodeType == 1){
  		data.push(getTextInsideNode(childrenList[i]));
  	}
  }
  var newData = data.map(function(num){
  	var cityAndWeather = [];
  	var city = num.substr(0,2);
  	cityAndWeather.push(city);
  	var weatherIndex = num.substr(num.length-2,2);
  	cityAndWeather.push(+weatherIndex);
  	return cityAndWeather;
  })
  return newData;
}
/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
	var dataLength = data.length;
	for(var j = 1 ; j < dataLength; j++){
		for(var i = 0 ; i < dataLength-j; i++){
			if(data[i][1] > data[i+1][1]){
				var temp = data[i+1];
				data[i+1] = data[i];
				data[i] = temp;
			}
		}
	}
	return data;
}
/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
	var dataLength = data.length;
	var resortList = document.getElementById('resort');
	if(resortList.childNodes.length >= 7){
		alert('数据没有更新');
		return;
	}
	for(var i = dataLength - 1; i >= 0;i--){
		var newList = document.createElement('li');
		newList.innerHTML = '第'+(dataLength-i)+'名：'+data[i][0]+'空气质量：<b>'+data[i][1]+'</b>';
		resortList.appendChild(newList);
	}
	console.log(resortList)
}
function btnHandle() {
  var aqiData = getData();
  aqiData = sortAqiData(aqiData);
  render(aqiData);
}
function init() {
	var button = document.getElementById('sort-btn');
	button.addEventListener('click',btnHandle,false);
}
init();

