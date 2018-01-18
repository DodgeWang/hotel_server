$(function(){	
	$('#submitBtn').click(function(){
		var name = $('#formBox input[name="name"]').val();
		var describe = $('#formBox input[name="describe"]').val();
		var powers = [];
		$('#formBox input[name="powers"]:checked').each(function(){
		   powers.push($(this).val());//将选中的值添加value中，以逗号分开     
        });

        var powerList = powers.join('_&_');
		
		var paramObj = {
			name: name,
			describe: describe,
			powerList: powerList
		};
		$.post("/api/role/add",paramObj,function(obj){
            if(obj.state == 1){
            	alert(obj.msg);
            	window.location.replace("/admin/roles");
            }else{
            	alert(obj.msg)
            }
		});
	})
})