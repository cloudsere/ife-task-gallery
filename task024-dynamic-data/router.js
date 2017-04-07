/*
* @Author: heqingqiu
* @Date:   2017-04-05 16:29:31
* @Last Modified by:   cloudseer
* @Last Modified time: 2017-04-05 20:16:34
*/

'use strict';
function route(handle, pathname, response, postData) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, postData);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}
exports.route = route;