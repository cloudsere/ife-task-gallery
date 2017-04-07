/*
* @Author: heqingqiu
* @Date:   2017-04-04 21:09:04
* @Last Modified by:   cloudseer
* @Last Modified time: 2017-04-05 20:29:54
*/

'use strict';
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');
var handler = {};
handler['/'] = requestHandlers.start;
handler['/start'] = requestHandlers.start;
handler['/upload'] = requestHandlers.upload;
handler['/show'] = requestHandlers.show;
server.start(router.route,handler);