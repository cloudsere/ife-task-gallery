/*
* @Author: heqingqiu
* @Date:   2017-04-04 20:58:26
* @Last Modified by:   cloudseer
* @Last Modified time: 2017-04-06 10:20:59
*/

'use strict';
var http = require('http');
var url = require('url');
var formidable = require('formidable');
function start(route,handle){
	function onRequest(request,response){
		var postData = '';
		var pathname = url.parse(request.url).pathname;
		console.log("Request" + pathname + " received.");
		//当收到请求时，使用 response.writeHead() 函数发送一个HTTP状态200和HTTP头的内容类型（content-type
		request.setEncoding('utf8');
		//将data和end事件的回调函数直接放在服务器中，在data事件回调中收集所有的POST数据，当接收到所有数据，触发end事件后，其回调函数调用请求路由，并将数据传递给它，然后，请求路由再将该数据传递给请求处理程序。
		request.addListener('data',function(postDataChunk){
			postData += postDataChunk;
			console.log('received post data chunk ' + postDataChunk)
		})
		request.addListener('end',function(){
			route(handle, pathname, response, postData);
		})
	}
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;