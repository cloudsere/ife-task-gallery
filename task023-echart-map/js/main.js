/*
* @Author: heqingqiu
* @Date:   2017-04-04 15:36:48
* @Last Modified by:   cloudseer
* @Last Modified time: 2017-04-04 16:35:04
*/

'use strict';
var chart = echarts.init(document.getElementById('main'));
chart.showLoading();
var request = new XMLHttpRequest();
var url = 'geo/world.json';
request.onreadystatechange = function(){
	if(this.status == 200 && this.readyState == 4){
		var riverJson = this.responseText;
		chart.hideLoading();
		echarts.registerMap('river',riverJson);
		chart.setOption({
			series:[{
				type:'map',
				map:'river',
				data:[]
			}]
		});
	}
};
request.open('GET',url,true);
request.send(null);