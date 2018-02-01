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


  //添加排班按钮 
  $('#addDateBtn').click(function(){
      $('#dataBox .dataAddBox').fadeToggle(200,"linear");
  })


  //删除排班按钮 
  $('#delDateBtn').click(function(){
      $('#dataBox .delBtn').fadeToggle(200,"linear");
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



  //显示添加工作安排表单框
  $('#dataBox').on('click','.dataAddBox span',function(){
     var name = $(this).attr('data-name');
     var userId = $(this).attr('data-userid');
     var date = $(this).attr('data-date');
     $('#addForm_name').val(name);
     $('#addForm_userId').val(userId);
     $('#addForm_date').val(date);
     $('#addForm_startHours').val('00');
     $('#addForm_startMinutes').val('00');
     $('#addForm_endHours').val('00');
     $('#addForm_endMinutes').val('00');
     $('#addFormModal').modal('show');
  })



  //添加上传新增数据
  $('#addFormSubBtn').click(function(){
      var dateList = $('#addForm_date').val().split("/");
      var startDate = new Date();
      var endDate = new Date();
      
      startDate.setFullYear(parseInt(dateList[0]));
      startDate.setMonth(parseInt(dateList[1])-1);
      startDate.setDate(parseInt(dateList[2]));
      startDate.setHours(parseInt($('#addForm_startHours').val()));
      startDate.setMinutes(parseInt($('#addForm_startMinutes').val()));
      startDate.setSeconds(0);
      startDate.setMilliseconds(0);


      endDate.setFullYear(parseInt(dateList[0]));
      endDate.setMonth(parseInt(dateList[1])-1);
      endDate.setDate(parseInt(dateList[2]));
      endDate.setHours(parseInt($('#addForm_endHours').val()));
      endDate.setMinutes(parseInt($('#addForm_endMinutes').val()));
      endDate.setSeconds(0);
      endDate.setMilliseconds(0);
      
      var employeeId = parseInt($('#addForm_userId').val());
      var paramObj = {
         employeeId: employeeId,
         startTime: Date.parse(startDate)/1000,
         endTime: Date.parse(endDate)/1000
      };

      console.log(paramObj)
      $.post(
        "/api/schedule/create",
        paramObj,
        function(result){
           if(result.state == 1){
              $('#addFormModal').modal('hide');
              changTable(nowDateStamp)

           }else{
              alert(result.msg)
           }
      })
      
  })


  

  //双击显示添加按钮  
  $('#dataBox').on('dblclick','.tdDataBox',function(){
      $('#dataBox .dataAddBox').fadeToggle(200,"linear");
  })


  //鼠标移动到单个安排记录上面显示删除按钮
  $('#dataBox').on('mouseover','.timeBox',function(){
      $(this).find('.delBtn').show();
  })

  //鼠标移开单个安排记录上面隐藏删除按钮
  $('#dataBox').on('mouseout','.timeBox',function(){
      $(this).find('.delBtn').hide();
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
           var weekStr = '';
           switch(i)
            {
            case 0:
              weekStr = 'Sun';
              break;
            case 1:
              weekStr = 'Mon';
              break;
            case 2:
              weekStr = 'Tue';
              break;
            case 3:
              weekStr = 'Wed';
              break;
            case 4:
              weekStr = 'Thu';
              break;
            case 5:
              weekStr = 'Fri';
              break;
            case 6:
              weekStr = 'Sat';
              break;
            }
           var date = new Date((startDateStamp+i*86400)*1000);
           var thisMonth = date.getMonth()+1 >= 10 ? ''+(date.getMonth()+1) : '0'+(date.getMonth()+1);
           var thisDayNum = date.getDate() >= 10 ? ''+date.getDate() : '0'+date.getDate();
           thDom.eq(i).html(weekStr+'  '+thisMonth+'/'+thisDayNum);
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
        if(result.state == 1){
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

                     var date = new Date((startDateStamp+x*86400)*1000);
                     var thisYear = date.getFullYear();
                     var thisMonth = date.getMonth()+1;
                     var thisDayNum = date.getDate();
                     var cdDateStr = thisYear+'/'+thisMonth+'/'+thisDayNum;

               	  	 tdDataBox = '<td class="tdDataBox"'+ (hasData ? 'style="background:#ffffff"' : '') +'>'+ tdDataBox + '\
                                      <div class="dataAddBox">\
                                         <span class="glyphicon glyphicon-plus" data-name="'+result.data[i].name+'" data-userid="'+result.data[i].employeeId+'" data-date="'+cdDateStr+'"></span>\
                                      </div>\
                                  </td>'
                     tdDataList += tdDataBox;
               	  }
               	  trBox = '<tr>' + tdNameBox + tdDataList + '</tr>';
               	  tbodyDom += trBox;
               }
               $('#dataBox').html(tbodyDom);
            }else{
               alert(result.msg)
            }

      });
	}



	//时间戳转换为yyyy-mm-dd格式
	function timeToStr(timeStamp){
		var date = new Date(timeStamp * 1000);
		var year = date.getFullYear();
		var month = date.getMonth() + 1 >= 10 ? ''+(date.getMonth()+1) : '0'+(date.getMonth()+1);
    var dateNum = date.getDate() >= 10 ? ''+date.getDate() : '0'+date.getDate();
    return year+'/'+month+'/'+dateNum;
	}
})

    