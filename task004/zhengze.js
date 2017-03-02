/*
* @Author: heqingqiu
* @Date:   2017-02-25 23:21:09
* @Last Modified by:   cloudseer
* @Last Modified time: 2017-02-26 20:16:28
*/

'use strict';
function validate(phone){
	var re = /\b1[3-8]\d{9}\b/;
	var phoneNum = String(phone);
	var textArea = document.getElementsByTagName("input")[0];
	if(re.test(phoneNum)){
		textArea.style.border = "1px solid green";
		document.getElementsByClassName("trueNumber")[0].style.opacity = 1;
		document.getElementsByClassName("wrongNumber")[0].style.opacity = 0;
	}else{
		textArea.style.border = "1px solid red";
		document.getElementsByClassName("wrongNumber")[0].style.opacity = 1;
		document.getElementsByClassName("trueNumber")[0].style.opacity = 0;
	}
}

function repeatWord(phone){
	var re = /\b([a-zA-Z]+) +\1\b/;
	var phoneNum = String(phone);
	var textArea = document.getElementsByTagName("input")[1];
	if(re.test(phoneNum)){
		textArea.style.border = "1px solid green";
		document.getElementsByClassName("trueNumber")[1].style.opacity = 1;
		document.getElementsByClassName("wrongNumber")[1].style.opacity = 0;
	}else{
		textArea.style.border = "1px solid red";
		document.getElementsByClassName("wrongNumber")[1].style.opacity = 1;
		document.getElementsByClassName("trueNumber")[1].style.opacity = 0;
	}
}