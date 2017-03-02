var page = require('webpage').create(),
system = require('system'),
args = system.args,
term = '',
deviceInput = '',
fs = require('fs'),
path = 'result.txt',
t = Date.now();
if(args.length !== 3){
    console.log('请输入想要查找的单词 phantomjs task.js <some word> <iPad Pro Galaxy S5 Nexus 5X Nexus 6P Iphone5 Iphone6 Iphone 6 Plus iPad>')
}else{
    term = system.args[1];
    deviceInput = system.args[2];
}
//这里特别注意是phantom.injectJs而不是page.injectJs
if(phantom.injectJs('config.js')){
    for(var i = 0; i < deviceConfig.length; i++){
            if(deviceConfig[i]['name'] === deviceInput){
                page.viewportSize = {
                    'width':deviceConfig[i]['x'],
                    'height':deviceConfig[i]['y']
                };
                page.clipRect = {
                  top: 0,
                  left: 0,
                  width: deviceConfig[i]['x'],
                  height: deviceConfig[i]['y']
                };
            }
        }
}
console.log("page is loading...");
console.log(page.settings['userAgent']);
var url = encodeURI('https://www.baidu.com/s?wd='+term);
page.open(url, function(status) {
  console.log("Status: " + status);
  if(status === 'success') {
        page.render(term + '.png');
        var resultList = page.evaluate(function(){
            var arrayList = document.getElementsByClassName('result');
            var resultNumber = arrayList.length;
            console.log(resultNumber);
            var dataList = [];
            function getText(node){
                var textContent = '';
                if(!node) return 'No content here';
                for(var i = 0; i < node.childNodes.length; i++){
                    var curNode = node.childNodes[i];
                    if(curNode.nodeName === "#text"){
                        textContent += curNode.nodeValue;
                    }
                }
                return textContent;
            }
            for(var i = 0; i < resultNumber; i++){
                var resultContainer = arrayList[i];
                var title = getText(resultContainer.getElementsByTagName('h3')[0]);

                var abstract = getText(resultContainer.getElementsByClassName('c-abstract')[0]);

                var link = resultContainer.getElementsByTagName('h3')[0].childNodes[0].getAttribute('href');
                
                var cimg = resultContainer.getElementsByClassName('c-img')[0];
                var cimgHref = '';
                if(cimg){
                    cimgHref = cimg.getAttribute('src');
                }else{
                    cimgHref = 'There is no img';
                }

                dataList.push({
                    'title':title,
                    'info':abstract,
                    'link':link,
                    'pic':cimgHref})
            }
            return {
                'code':1,
                'msg':'抓取成功',
                'dataList':dataList
            };
        });
        resultList['time'] = Date.now() - t;
        resultList['device'] = deviceInput;
        fs.write(path, JSON.stringify(resultList), 'w');
        phantom.exit(); 
    
    }else{
    console.log('fail to load page');
    var resultList = {
        'code':0,
        'msg':'抓取失败',
        'time':Date.now() - time
    };
    fs.write(path, JSON.stringify(resultList), 'w'); 
    phantom.exit();
}
});

