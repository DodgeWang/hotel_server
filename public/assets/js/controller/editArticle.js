$(function(){	
	$('#submitBtn').click(function(){
		var id = $('#formBox input[name="articleId"]').val();
		var name = $('#formBox input[name="name"]').val();
		var isCheck = $('#formBox input[name="isCheck"]:checked').val();
		var isClean = $('#formBox input[name="isClean"]:checked').val();

		var paramObj = {
			id: id,
			name: name,
			isCheck: isCheck,
			isClean: isClean
		};
		$.post("/api/roomarticle/edit",paramObj,function(obj){
            if(obj.state == 1){
            	window.location.replace("/admin/articles");
            }else{
            	alert(obj.msg)
            }
		});
	})
})