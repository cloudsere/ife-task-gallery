    var page = require('webpage').create(),
    system = require('system'),
    args = system.args,
    term = '',
    fs = require('fs'),
    resultList = {},
    path = 'result.txt';
    console.log("page is loading...")
    if(args.length === 1){
        console.log('请输入想要查找的单词 phantomjs task.js <some word>')
    }else{
        term = system.args[1];
    }
    var url = encodeURI('https://www.baidu.com/s?wd='+term)
    page.open(url, function(status) {
      console.log("Status: " + status);
      if(status === 'success') {
        page.render('example.png');
        var resultList = page.evaluate(function(word){
            var t = Date.now();
            var resultArray = document.getElementsByClassName('result');
            var resultNumber = resultArray.length;
            var dataList = [];
            for(var i = 0; i < resultNumber; i++){
                var resultContainer = document.getElementsByClassName('result')[i];
                var title = resultContainer.getElementsByTagName('h3')[0].childNodes[0].innerText;
                var abstract = resultContainer.getElementsByClassName('c-abstract')[0].innerText;
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
                'word': word,
                'time':Date.now() - t,
                'dataList':dataList
            };
        },term)
    fs.write(path, JSON.stringify(resultList), 'w'); 
}else{
    console.log('fail to load page');
    phantom.exit(1);
}
phantom.exit();
});