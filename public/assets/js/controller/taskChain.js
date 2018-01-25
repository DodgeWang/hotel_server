$(function(){
	
    
    //初始查询
	changTable()



/**
 * 根据条件查询
 * @param  pageNow  Number   当前页数  
 * @return {null}     
 */
function changTable(){
    $('#loadingBox').show(); //显示loading加载动画
		var paramObj = {};

		$.get(
			"/api/taskchain/list",
			paramObj,
			function(result){
				console.log(result)
               var newDom = '';
               var dataList = result.data.datalist; //当前页数据

               setTimeout(function(){
                      
                      for(var i = 0; i < dataList.length; i++){
               	         var itermDate = dataList[i];
               	         var itermDom = '<tr class="even pointer">\
                                           <td class="a-center ">\
                                             <input type="checkbox" class="flat" name="table_records">\
                                           </td>\
                                           <td>'+ itermDate.name +'</td>\
                                           <td>'+ itermDate.allocatorRole +'</td>\
                                           <td>'+ itermDate.executorRole +'</td>\
                                           <td>'+ itermDate.examinerRole +'</td>\
                                           <td style="position: relative;">\
                                             <a href="/admin/roomtypes/edit?id='+ itermDate.id +'" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> 编辑 </a>\
                                             <a class="btn btn-danger btn-xs delInfoBtn" data-id="'+ itermDate.id +'"><i class="fa fa-trash-o"></i> 删除 </a>\
                                           </td>\
                                         </tr>'
                          newDom += itermDom;
                      }
                   
                      
                      $('#noDataBox').hide(); //隐藏无数据提示
                   
                         
                   $('#datalistBox').html(newDom)  //显示查询出的列表
                   $('#loadingBox').hide(); //关闭loading加载动画
               },300); 
               
            }
        );
	}
})

    