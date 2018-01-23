$(function(){ 
  $('#submitBtn').click(function(){
    var id = $('#formBox input[name="roomId"]').val();
    var number = $('#formBox input[name="number"]').val();
    var typeId = $('#roomTypeSelect').val();
    var articleList = [];
    $('#formBox input[name="articleCheck"]:checked').each(function(){
       articleList.push($(this).val());//将选中的值添加value中，以逗号分开     
        });
    
    var paramObj = {
      id: id,
      number: number,
      typeId: typeId,
      articleList: articleList.join('_&_')
    };
    $.post("/api/room/edit",paramObj,function(obj){
            if(obj.state == 1){
              alert(obj.msg);
              window.location.replace("/admin/rooms");
            }else{
              alert(obj.msg)
            }
    });
  })
})