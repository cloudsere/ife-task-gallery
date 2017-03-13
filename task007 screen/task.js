var system = require('system');
var resourceWait  = 2000,
    maxRenderWait = 500000,
    url           = system.args[1];

var page          = require('webpage').create(),
    count         = 0,
    forcedRenderTimeout,
    renderTimeout;
var scrollNumber = 0;

page.viewportSize = { width: 1280, height : 1024 };

function doRender() {
    page.render('twitter.png');
    console.log('render');
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
            var pos = 0;
            function scroll(){
                if(window.document.body.scrollTop >= document.body.scrollHeight){
                    clearInterval(id);
                    return;
                }
                pos += 250;
                window.document.body.scrollTop = pos
            }
            var id = setInterval(scroll,1000);
        })
        forcedRenderTimeout = setTimeout(function () {
            console.log("forced"+count);
            doRender();
        }, maxRenderWait);
    }
});