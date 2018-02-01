$(function(){	
	$('#submitBtn').click(function(){
		var id = $('#formBox input[name="roomTypeId"]').val();
		var name = $('#formBox input[name="name"]').val();
		var paramObj = {
			id: id,
			name: name
		};
		$.post("/api/eventtype/edit",paramObj,function(obj){
            if(obj.state == 1){
            	alert(obj.msg);
            	window.location.replace("/admin/eventtypes");
            }else{
            	alert(obj.msg)
            }
		});
	})
})