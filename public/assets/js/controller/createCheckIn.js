$(function(){	
	$('#submitBtn').click(function(){
		var guestName = $('#formBox input[name="guestName"]').val();
		var guestPhone = $('#formBox input[name="guestPhone"]').val();
		var roomId = $('#roomSelect').val();
		var checkTime = $('#reservation-time').val();

        var timeCode = [];
		var timeList = checkTime.split(' - ');
		for(var i = 0; i<timeList.length; i++){
			var timeItem = timeList[i].split(" ");
			var date = timeItem[0].split('/');
			var time = timeItem[1].split(':');
			var newDate = new Date();
			var year = parseInt(date[2]);
			var month = parseInt(date[0]);
			var day = parseInt(date[1]);
			var hours = timeItem[2] == 'PM' ? parseInt(time[0])+12 : parseInt(time[0]);
			console.log(hours)
			var minutes = parseInt(time[1]);
			newDate.setFullYear(year);
			newDate.setMonth(month-1);
			newDate.setDate(day);
			newDate.setHours(hours);
			newDate.setMinutes(minutes);
			newDate.setSeconds(0);
			newDate.setMilliseconds(0);
            var dateStamp = Date.parse(newDate)/1000;
            timeCode.push(dateStamp)
		}

		var paramObj = {
			guestName: guestName,
			guestPhone: guestPhone,
			roomId: roomId,
			checkInTime: timeCode[0],
			checkOutTime: timeCode[1]
		};

		// console.log(paramObj)
		$.post("/api/checkin/add",paramObj,function(obj){
            if(obj.state == 1){
            	alert(obj.msg);
            	window.location.replace("/admin/checkin");
            }else{
            	alert(obj.msg)
            }
		});
	})
})