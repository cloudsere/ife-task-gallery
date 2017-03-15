var mainDiv = document.getElementById('main');
mainDiv.style.height = window.innerHeight + 'px';
mainDiv.style.width = window.innerWidth + 'px';
var myChart = echarts.init(mainDiv);

var option = {
	title:{
		text:"2016年在中国能看多少电影？",
		textStyle:{
			color:'#4c4d51'
		},
		top:'20',
		left:'20',
		subtext:'基于2016年中国电影的数据'
	},
    tooltip: {
        trigger: 'axis'
    },
    
    legend: {
    	top:80,
    	left:25,
        data:['排片量','单月最高票房电影']
    },
    grid:{
    	left: '3%',
        right: '100',
        top:'120',
        bottom: '80',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            axisLine:{
                lineStyle:{
                    color:"#f34b47",
                    width:'3'
                }
            },
            axisTick:{
                show:true,
                alignWithLabel:true
            },
            axisLabel:{
                textStyle:{
                    color:'#000000'
                }
            },
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        }
    ],
    yAxis: [
        {
            type: 'value',
            inverse:true,
            min: 0,
            max: 60,
            interval:15,
            axisLabel: {
                formatter: '{value} 部'
            },
            axisTick:{
                show:false
            },
            axisLine:{
                show:false
            },
            splitLine:{
                lineStyle:{
                    color:'#ffffff',
                    width:'3'
                }
            },
            position:'right'
        }
    ],
    backgroundColor:'#d7e5ec',
    series: [//同一坐标系增加多个图表直接在series数组中添加成员
        {
            name:'排片量',
            type:'bar',
            itemStyle:{
            	normal:{
            		color:'#33758a'
            	}
            },
            barGap:'0',
            data:[38.0, 23.0, 29.0, 39.0, 28.0, 29.0, 46.0, 42.0, 48.0, 37.0, 50.0, 55.0]
        },
        {
            name:'单月最高票房电影',
            type:'bar',
            itemStyle:{
            	normal:{
            		color:'#33b6e3'
            	}
            },
            data:[10.0, 33.9, 15.3, 
            9.8, 12.5, 14.7, 
            8.89, 10.0, 11.8, 
            3.34, 7.5, 11.7]
        }
    ]
};
myChart.setOption(option);
window.onresize = function(){
	mainDiv.style.height = window.innerHeight + 'px';
	mainDiv.style.width = window.innerWidth + 'px';
	myChart.resize();
}