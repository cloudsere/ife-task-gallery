var page = require('webpage').create(),
system = require('system'),
args = system.args,
url = '',
fs = require('fs'),
path = 'result.txt',
t = Date.now();
if(args.length !== 2){
    console.log('请输入网址 phantomjs task.js <some url> ')
}else{
    url = system.args[1];
}

console.log("page is loading...");
page.open(url, function(status) {
  console.log("Status: " + status);
  if(status === 'success') {
       setTimeout(function(){
         page.render('bilibili.png');
         phantom.exit(); 
     },20000);
    
    }else{
    console.log('fail to load page');
    phantom.exit();
}
});

