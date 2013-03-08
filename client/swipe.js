// $(document).on('swipeleft', function(event){
// 	if (!move) return;
// 	move = false;
 	
// 		moveCharacter([-30, 0], "left");
// });

Template.gamecanvas.swipeme = function () {
	Meteor.defer(function() {
	    var $sw = $('#gamecanvas');
	    $sw.hammer().on('swipe', function (event) {
	    	event.preventDefault();
	  //     if (!move) return;
			// move = false;
	 		console.log(event);	

	 		if (event.gesture.direction === "left") {
	 			Template.gamecanvas.moveCharacter([-30, 0], "left");
	 		}
	 		if (event.gesture.direction === "up") {
	 			Template.gamecanvas.moveCharacter([0, -30], "up");
	 		}
	 		if (event.gesture.direction === "right") {
	 			Template.gamecanvas.moveCharacter([30, 0], "right");
	 		}
	 		if (event.gesture.direction === "down") {
	 			Template.gamecanvas.moveCharacter([0, 30], "down");
	 		};
	    });
	});
};

$(window).on('touchmove', function (ev) { 
  ev.preventDefault();
});
