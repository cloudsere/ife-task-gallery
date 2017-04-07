/*
* @Author: heqingqiu
* @Date:   2017-04-05 16:42:02
* @Last Modified by:   cloudseer
* @Last Modified time: 2017-04-05 20:31:23
*/

'use strict';
var exec = require('child_process').exec;
var fs = require('fs');

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

/*function start() {
  console.log("接收到请求了");
  function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }

  sleep(10000);
  return "Hello Start";
}*/

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: "+
  querystring.parse(postData).text);
  response.end();
}

function show(response, postData){
	console.log('request handler show was called');
	fs.readFile('tmp/test.jpg','binary', function(error,file){
		if(error){
			response.writeHead(500,{'Content-Type':'text/plain'});
			response.write(error + '\n');
			response.end();
		}else{
			response.writeHead(200,{'Content-Type':'image/png'});
			response.write(file, 'binary');
			response.end();
		}
	})
}

exports.start = start;
exports.upload = upload;
exports.show = show;