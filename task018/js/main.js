var dataRequest = new XMLHttpRequest();
var url = 'data/test.json';
dataRequest.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
		var dataResponse = JSON.parse(this.responseText);
		var chartData = processRawData(dataResponse);
		var option = setOptionWithData(chartData);
		var container = document.getElementById('main');
		var myChart = echarts.init(container);
		myChart.setOption(option);
	}
};
//对数据进行处理，修正日期格式
function processRawData(data){
	var obj = {};
	for(var i = 0; i < data.length;i++){
		var date = data[i]['Date'];
		var pattern = /(\d{4})(\d{2})(\d{2})/;
		var newTypeDate = date.replace(pattern,'$1-$2-$3');
		if(i ==0){
			obj[data[i].Ticker] = {
				categoryData : [],
				values : [],
				volumes : []
			};
		}
		if(i > 0 && data[i].Ticker != data[i-1].Ticker){
			obj[data[i].Ticker] = {
				categoryData : [],
				values : [],
				volumes : []
			};
		}
		obj[data[i].Ticker].categoryData.push(newTypeDate);
		obj[data[i].Ticker].values.push([data[i].Open,
					 data[i].Close,
					 data[i].Low,
					 data[i].High]);
		obj[data[i].Ticker].volumes.push(data[i].Volume);
	}
	return obj;
}
//趋势线
function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += +data.values[i - j][1];
        }
        result.push(+(sum / dayCount).toFixed(3));
    }
    console.log(result)
    return result;
}
//設置echart的配置項
function setOptionWithData(data){
	var legendTitle = (function(){
		var legendArray = [];
		for(value in data){
			legendArray.push(value);
		}
		return legendArray;
	})();
	var option = {
		backgroundColor:'#eee',
		animation:false,
		tooltip:{
			trigger:'axis',
			axisPointer:{
				type:'line'
			}
		},
		toolbox:{
			feature:{
				dataZoom:{
					yAxisIndex:false
				},
				brush:{
					type:['lineX','clear']
				}
			}
		},
		brush:{
			xAxisIndex:'all',
			brushLink:'all',
			outOfBrush:{
				colorAlpha:-.1
			}
		},
		grid:[
			{
				left:'10%',
				right:'8%',
				height:'50%'
			},
			{
				left:'10%',
				right:'8%',
				top:'63%',
				height:'16%'
			}
		],
		xAxis:[
			{
				type:'category',
				data:data['A'].categoryData,
				scale:true,
				boundaryGap:false,
				axisLine:{onZero:false},
				splitLine:{show:false},
				splitNumber:20,
				min:'dataMin',
				max:'dataMax'
			},
			{
				type:'category',
				data:data['A'].categoryData,
				gridIndex:1,
				scale:true,
				boundaryGap:false,
				axisLine:{onZero:false},
				splitLine:{show:false},
				axisLabel:{show:false},
				splitNumber:20,
				min:'dataMin',
				max:'dataMax'

			}
		],
		yAxis:[
			{
				scale:true,
				splitArea:{show:true}
			},
			{
				scale:true,
				gridIndex:1,
				splitNumber:2,
				axisLabel:{show:false},
				axisLine:{show:false},
				axisTick:{show:false},
				splitLine:{show:false}
			}
		],
		dataZoom:[
			{
				type:'inside',
				xAxisIndex:[0,1],
				start:0,
				end:100
			},
			{
				show:true,
				xAxisIndex:[0,1],
				type:'slider',
				top:'85%',
				start:0,
				end:100
			}
		],
		series:[
		{
                name: 'A',
                type: 'candlestick',
                data: data['A'].values,
                itemStyle: {
                    normal: {
                        borderColor: null,
                        borderColor0: null
                    }
                },
                tooltip: {
                    formatter: function (param) {
                        var param = param[0];
                        return [
                            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                            'Open: ' + param.data[0] + '<br/>',
                            'Close: ' + param.data[1] + '<br/>',
                            'Lowest: ' + param.data[2] + '<br/>',
                            'Highest: ' + param.data[3] + '<br/>'
                        ].join('');
                    }
                }
            },
            {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5, data['A']),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
            {
            	name:'Volumn',
            	type:'bar',
            	xAxisIndex:1,
            	yAxisIndex:1,
            	data:data['A'].volumes
            }
		]
	};
	return option;
}
dataRequest.open('GET',url,true);
dataRequest.send();