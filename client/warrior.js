$(document).keydown(function(e){
    if (e.keyCode == 37) { 
       $('#character').css('background-position', '0px 90px');
    }if(e.keyCode == 38) {
    	$('#character').css('background-position', '0px 30px');
    }if(e.keyCode == 39) {
    	$('#character').css('background-position', '0px 60px');
    }if(e.keyCode == 40) {
    	$('#character').css('background-position', '0px 0px');
    }
});