var system = require('system');
var resourceWait  = 300,
    maxRenderWait = 50000,
    url           = system.args[1];

var page          = require('webpage').create(),
    count         = 0,
    number        = 0,
    forcedRenderTimeout,
    renderTimeout;

page.viewportSize = { width: 1280, height : 1024 };

function doRender() {
    page.render('twitter.png');
    phantom.exit();
}

page.onResourceRequested = function (req) {
    count += 1;
    console.log('> ' + req.id + ' - ' + req.url);
    clearTimeout(renderTimeout);
};

page.onResourceReceived = function (res) {
    if (!res.stage || res.stage === 'end') {
        count -= 1;
        console.log(res.id + ' ' + res.status + ' - ' + res.url);
        number = page.evaluate(function(){
          return document.images.length;
        })
        if (count === 0) {
            renderTimeout = setTimeout(doRender, resourceWait);
        }
    }
};

page.open(url, function (status) {
    if (status !== "success") {
        console.log('Unable to load url');
        phantom.exit();
    } else {
      page.evaluate(function(){
        window.document.body.scrollTop = document.body.scrollHeight;
      });
        forcedRenderTimeout = setTimeout(function () {
            console.log(count);
            doRender();
        }, maxRenderWait);
    }
});