var dataRequest = new XMLHttpRequest();
var url = 'data/test.json';

dataRequest.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
		var dataResponse = JSON.parse(this.responseText);
	}
};

dataRequest.open('GET',url,true);
dataRequest.send();