$(function(){	
	$('#submitBtn').click(function(){
		var name = $('#formBox input[name="name"]').val();
		var isCheck = $('#formBox input[name="isCheck"]:checked').val();
		var isClean = $('#formBox input[name="isClean"]:checked').val();

		var paramObj = {
			name: name,
			isCheck: isCheck,
			isClean: isClean
		};
		$.post("/api/roomarticle/add",paramObj,function(obj){
            if(obj.state == 1){
            	window.location.replace("/admin/articles");
            }else{
            	alert(obj.msg)
            }
		});
	})
})