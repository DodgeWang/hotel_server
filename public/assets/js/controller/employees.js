$(function(){
	var pageNow = 1; //当前页
	var dataAllTotle = 0; //所有符合条件数据总数
    var pageTotle = 0; //总页数
    var pageLiShowNum = 5; //分页栏最大显示个数
	
    
    //初始查询
	changTable(pageNow)

	//部门筛选
	$('#departmentSelect').change(function(){
	    changTable(1)
    })

    //角色筛选
    $('#roleSelect').change(function(){
	    changTable(1)
    })

    //条数筛选
    $('#pageSizeSelect').change(function(){
	    changTable(1)
    })


    //上一页
    $('#paginationBox').on('click','#previous_Btn',function(){
    	if(pageNow > 1){
    	   pageNow -= 1;
           changTable(pageNow)
    	}   
    })

    //下一页
    $('#paginationBox').on('click','#next_Btn',function(){
        pageNow += 1;
        changTable(pageNow)
    })


    function changTable(pageNow){
		var departmentId = parseInt($('#departmentSelect').val()); //已选部门id
		var roleId = parseInt($('#roleSelect').val()); //已选角色id
		var pageSize = parseInt($('#pageSizeSelect').val()); //已选查询条数
		var paramObj = {
			pageNow: pageNow,
			pageSize: pageSize
		};
		if(departmentId !== 0){
           paramObj.departmentId = departmentId;
		}

		if(roleId !== 0){
		   paramObj.roleId = roleId;
		}
		$.get(
			"/api/employee/list",
			paramObj,
			function(result){
               var newDom = '';
               var dataList = result.data.datalist; //当前页数据
               dataAllTotle = result.data.allEmployeeCount; //所有符合条件数据总数
               pageTotle = Math.ceil(dataAllTotle/pageSize); //总页数
               for(var i = 0; i < dataList.length; i++){
               	  var itermDate = dataList[i];
               	  var itermDom = '<tr class="even pointer">\
                                      <td class="a-center ">\
                                        <input type="checkbox" class="flat" name="table_records">\
                                      </td>\
                                      <td>'+ itermDate.EmployeeInfo.name +'</td>\
                                      <td>'+ itermDate.username +'</td>\
                                      <td>'+ itermDate.Department.name +'</td>\
                                      <td>'+ itermDate.Role.name +'</td>\
                                      <td>'+ itermDate.EmployeeInfo.phone +'</td>\
                                      <td>\
                                        <button type="button" class="btn btn-success btn-xs">正常</button>\
                                      </td>\
                                      <td style="position: relative;">\
                                          <a href="editEmployee.html" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> 编辑 </a>\
                                          <a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> 删除 </a>\
                                          <a href="#" class="btn btn-primary btn-xs"><i class="fa fa-key"></i> 重置密码 </a>\
                                      </td>\
                                    </tr>'
                   newDom += itermDom;
               }
            
               //插入分页Dom结构
               var previous_li = '<li class="paginate_button previous disabled" id="previous_Btn">\
                                       <a href="#">Previous</a>\
                                  </li>'
               var next_li = '<li class="paginate_button next" id="next_Btn">\
                                       <a href="#">Next</a>\
                              </li>' 
               
               var paginateDom = ''
               if(pageTotle <= pageLiShowNum){
                   for(var i = 0; i < pageTotle; i++){
                   	  var liDom = '<li class="paginate_button">\
                                       <a href="#">'+ (i+1) +'</a>\
                                   </li>'
                   	  if(pageNow === i + 1){
                   	  	 liDom = '<li class="paginate_button active">\
                                       <a href="#">'+ (i+1) +'</a>\
                                   </li>'
                   	  }
                      paginateDom += liDom;
                   }
               }else{
               	   // var startNum = 0; //起始数
               	   // var endNum = startNum + pageLiShowNum; //结束数
                   // if(pageNow - pageLiShowNum < 0){
                   // 	  endNum = pageLiShowNum;
                   // }
                   // if(pageTotle - pageNow <= (pageLiShowNum-1)/2+1){
                   // 	  startNum = 
                   // 	  endNum = pageTotle;
                   // }
               }

               paginateDom = previous_li + paginateDom + next_li;


               $('#paginationBox').html(paginateDom);

               $('#datalistBox').html(newDom)  //显示查询出的列表
               $('#dataTotle').text(dataAllTotle); //显示符合条件总条数
               $('#pageTotle').text(pageTotle)

            }
        );
	}
})

    