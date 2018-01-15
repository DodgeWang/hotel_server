$(function(){
	$('#departmentSelect').change(function(){
		// alert($(this).val())
		$.get(
			"/api/employee/list", 
			{ 
				departmentId: $(this).val()
		    },
            function(data){
              console.log("Data Loaded: " + data);
            }
        );
	})
})