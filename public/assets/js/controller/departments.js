$(function(){
	  var pageNow = 1; //当前页
	  var dataAllTotle = 0; //所有符合条件数据总数
    var pageTotle = 0; //总页数
    var pageLiShowNum = 11; //分页栏最大显示个数
	
    
    //初始查询
	changTable(pageNow)


    //条数筛选
    $('#pageSizeSelect').change(function(){
	    pageNow = 1;
	    changTable(pageNow);
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
    	if(pageNow < pageTotle){
    		pageNow += 1;
            changTable(pageNow)
    	}     
    })

    //选择具体页数
    $('#paginationBox').on('click','.paginate_num_btn',function(){
    	pageNow = parseInt($(this).children().text());
    	changTable(pageNow); 
    })


    //删除部门
    $('#datalistBox').on('click','.delInfoBtn',function(){
        if(confirm("是否确认删除?")){  
            var id = parseInt($(this).attr('data-id'));
            var paramObj = {
              id: id
            }
            $.post("/api/department/delete",paramObj,function(obj){
                if(obj.state == 1){
                  window.location.replace("/admin/departments");
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
function changTable(pageNow){
    $('#loadingBox').show(); //显示loading加载动画

		var pageSize = parseInt($('#pageSizeSelect').val()); //已选查询条数
		var paramObj = {
			pageNow: pageNow,
			pageSize: pageSize
		};

		$.get(
			"/api/department/list",
			paramObj,
			function(result){
               if(result.state !== 1){
                 $('#loadingBox').hide(); //显示loading加载动画
                  return alert(result.msg) 
               }
               var newDom = '';
               var dataList = result.data.datalist; //当前页数据
               dataAllTotle = result.data.allDataCount; //所有符合条件数据总数
               pageTotle = Math.ceil(dataAllTotle/pageSize); //总页数

               setTimeout(function(){
               	    //如果总页数大于0
               	    if(pageTotle > 0){
                      
                      for(var i = 0; i < dataList.length; i++){
               	         var itermDate = dataList[i];
               	         var itermDom = '<tr class="even pointer">\
                                           <td class="a-center ">\
                                             <input type="checkbox" class="flat" name="table_records">\
                                           </td>\
                                           <td>'+ itermDate.name +'</td>\
                                           <td style="position: relative;">\
                                             <a href="/admin/departments/edit?id='+ itermDate.id +'" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> 编辑 </a>\
                                             <a class="btn btn-danger btn-xs delInfoBtn" data-id="'+ itermDate.id +'"><i class="fa fa-trash-o"></i> 删除 </a>\
                                           </td>\
                                         </tr>'
                          newDom += itermDom;
                      }
                   
                      //插入分页Dom结构
                      var paginateDom = pagination(pageNow,pageTotle,pageLiShowNum); //获取到分页Dom结构
                      $('#paginationBox').html(paginateDom);  //更新分页选择器DOM 
                      $('#paginationBox').show() //显示分页选择器
                      $('#noDataBox').hide(); //隐藏无数据提示
                   }else{
               	      $('#noDataBox').show(); //显示无数据提示
               	      $('#paginationBox').hide(); //隐藏分页选择器
                   }
                         
                   $('#datalistBox').html(newDom)  //显示查询出的列表
                   $('#dataTotle').text(dataAllTotle); //显示符合条件总条数
                   $('#pageTotle').text(pageTotle)  //显示总页数
                   $('#loadingBox').hide(); //关闭loading加载动画
               },300); 
               
            }
        );
	}




/**
 * 分页选择器处理
 * @param  pageNow  Number   当前页数  
 * @param  pageTotle  Number  总页数
 * @param  pageLiShowNum  Number  分页数限制显示数量
 * @return {null}     
 */
	function pagination(pageNow,pageTotle,pageLiShowNum){

		//判断是不是第一页，如果是就给上一页按钮添加disabled
		var previousDis = pageNow == 1 ? "disabled" : "";

        //判断是不是最后一页，如果是就给下一页按钮添加disabled
		var nextDis = pageNow == pageTotle ? "disabled" : "";

		//上一页按钮DOM
		var previous_li = '<li class="paginate_button previous '+ previousDis +'" id="previous_Btn">\
                                <a href="#">上一页</a>\
                           </li>'
        //下一页按钮DOM
        var next_li = '<li class="paginate_button next '+ nextDis +'" id="next_Btn">\
                                <a href="#">下一页</a>\
                       </li>' 
        var paginateDom = ''
        var startNum = 1; //初始化起始页数
        var endNum = 1; //初始化结束页数
        if(pageTotle <= pageLiShowNum){ 
        	//当总页数 <= 限制显示页数时，显示的起始页数为1，显示的结束页数为总页数
            startNum = 1;
            endNum = pageTotle;
        }else{
        	//判断限制页数是奇数还是偶数,如果为偶数就加1，让其保持奇数
        	if(pageLiShowNum%2 == 0){
                pageLiShowNum += 1; 
        	}
            
            var judgeNum = (pageLiShowNum-1)/2;

            if(pageNow + judgeNum >= pageTotle){
               startNum = pageTotle - pageLiShowNum + 1;
               endNum = pageTotle;
            }else if(pageNow - judgeNum <= 1){
               startNum = 1;
               endNum = pageLiShowNum;
            }else{
               startNum = pageNow - judgeNum;
               endNum = pageNow + judgeNum;
            }
        }
        
        //循环显示要显示的页数DOM
        for(var i = startNum; i <= endNum; i++){
           var liDom = '<li class="paginate_button paginate_num_btn">\
                            <a href="#">'+ i +'</a>\
                        </li>'
           if(pageNow === i){
             liDom = '<li class="paginate_button active">\
                            <a href="#">'+ i +'</a>\
                        </li>'
           }
           paginateDom += liDom;
        }

        //判断起始页是不是第一页,不是的话在前面加一个省略号
        if(startNum > 1){
            var dDom = '<li class="paginate_button">\
                            <a href="#">...</a>\
                        </li>'
            paginateDom = dDom + paginateDom;
        }
        
        //判断结束页是不是最后页,不是的话在后面加一个省略号
        if(endNum < pageTotle){
            var dDom = '<li class="paginate_button">\
                            <a href="#">...</a>\
                        </li>'
            paginateDom += dDom;
        }

        
        paginateDom = previous_li + paginateDom + next_li;

        return paginateDom; //返回dom结构
	}
})

    