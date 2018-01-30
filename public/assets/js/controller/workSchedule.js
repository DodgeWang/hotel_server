$(function(){
	//获取当天时间
    var nowDate = new Date();
    //设置nowDate为凌晨零分零秒
    nowDate.setHours(0);
    nowDate.setMinutes(0);
    nowDate.setSeconds(0);
    nowDate.setMilliseconds(0);


    var nowYear = nowDate.getFullYear(); //当天年份
    var nowMonth = nowDate.getMonth()+1; //当前月份 
    var nowDay = nowDate.getDay(); //当天星期几
    var nowDateNum = nowDate.getDate(); //当天一月中的某一天


    var nowDateStamp = Date.parse(nowDate)/1000; //当天凌晨零分零秒时间戳
    
    //初始查询
	changTable(nowDateStamp)


    //跳转至本周
	$('#thisWeekBtn').click(function(){
        nowDateStamp = Date.parse(nowDate)/1000;
        changTable(nowDateStamp)
	})

    //上一周
	$('#previousBtn').click(function(){
        nowDateStamp = nowDateStamp - 86400*7;
        changTable(nowDateStamp)
	})
 

    //下一周
	$('#nextBtn').click(function(){
        nowDateStamp = nowDateStamp + 86400*7;
        changTable(nowDateStamp)
	})

    
    //删除工作安排
	$('#dataBox').on('click','.delBtn',function(){
		if(confirm("是否确认删除?")){  
            var id = parseInt($(this).attr('data-id'));
            var paramObj = {
              id: id
            }
            $.post("/api/schedule/delete",paramObj,function(obj){
                if(obj.state == 1){
                  changTable(nowDateStamp)
                }else{
                  alert(obj.msg)
                }
            }); 
        }
	})




/**
 * 根据条件查询
 * @param  pageNow  Number   当前页数  
 * @return {null}     
 */
    function changTable(nowDateStamp){   	
        var startDateStamp = nowDateStamp-86400*(nowDay-0);  //查询一周起始时间时间戳（上周周末凌晨零时零分）
        var endDateStamp = nowDateStamp+86400*(7-nowDay); //查询一周结束时间时间戳（本周周周末凌晨零时零分）        
        
        
        var thDom = $("#theadBox tr .dateth");
        //循环改变table头部日期信息
        for(var i = 0; i < thDom.length; i++){
           var date = new Date((startDateStamp+i*86400)*1000);
           var thisMonth = date.getMonth()+1 >= 10 ? ''+(date.getMonth()+1) : '0'+(date.getMonth()+1);
           var thisDayNum = date.getDate() >= 10 ? ''+date.getDate() : '0'+date.getDate();
           thDom.eq(i).html(thisMonth+' / '+thisDayNum)
        }

        var dateTitle = timeToStr(startDateStamp)+' -- '+timeToStr(endDateStamp-1);
        $('#dateShowTitle').html(dateTitle);


		var paramObj = {
			startTime: startDateStamp,
			endTime: endDateStamp
		};
		$.get(
			"/api/schedule/list",
			paramObj,
			function(result){
			   var tbodyDom = '';
               for(var i = 0; i < result.data.length; i++){
               	  var trBox = '' 
               	  var tdNameBox = '<td class="nameBox">'+result.data[i].name+'</td>'; 
               	  var scheduleList = result.data[i].scheduleList;
               	  var tdDataList = ''; 
               	  for(var x = 0; x < 7; x++){
               	  	 var tdDataBox = '';
               	  	 var hasData = false;
               	  	 for(var y = 0; y < scheduleList.length; y++){
               	  	 	if(parseInt(scheduleList[y].day) == x){
                           tdDataBox += '<div class="timeBox"><p>'+scheduleList[y].startTimeStr+' - '+scheduleList[y].endTimeStr+'</p><span class="glyphicon glyphicon-remove delBtn" data-id="'+scheduleList[y].id+'"></span></div>';
                           hasData = true;
               	  	 	}
               	  	 }
               	  	 tdDataBox = '<td '+ (hasData ? 'style="background:#ffffff"' : '') +'>'+ tdDataBox + '</td>'
                     tdDataList += tdDataBox;
               	  }
               	  trBox = '<tr>' + tdNameBox + tdDataList + '</tr>';
               	  tbodyDom += trBox;
               }
               $('#dataBox').html(tbodyDom);
            }
        );
	}



	//时间戳转换为yyyy-mm-dd格式
	function timeToStr(timeStamp){
		var date = new Date(timeStamp * 1000);
		let year = date.getFullYear();
		let month = date.getMonth() + 1 >= 10 ? ''+(date.getMonth()+1) : '0'+(date.getMonth()+1);
        let dateNum = date.getDate() >= 10 ? ''+date.getDate() : '0'+date.getDate();
        return year+'/'+month+'/'+dateNum;
	}
})

    