$(function(){
	$('#departmentSelect').change(function(){
		$.get(
			"/api/employee/list", 
			{ 
			  departmentId: $(this).val()
		    },
            function(data){
               var newDom = '';
               for(var i = 0; i < data.datalist.length; i++){
               	  var itermDom = '<tr class="even pointer">\
                                      <td class="a-center ">\
                                        <input type="checkbox" class="flat" name="table_records">\
                                      </td>\
                                      <td>{{EmployeeInfo.name}}</td>\
                                      <td>{{username}}</td>\
                                      <td>{{Department.name}}</td>\
                                      <td>{{Role.name}}</td>\
                                      <td>{{EmployeeInfo.phone}}</td>\
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
                   console.log(newDom)
               }
               $("#datalistBox").html(newDom)
               console.log("Data Loaded: " + data.datalist);
            }
        );
	})
})