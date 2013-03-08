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
	 			moveCharacter([-30, 0], "left");
	 		}
	 		if (event.gesture.direction === "up") {
	 			moveCharacter([0, -30], "up");
	 		}
	 		if (event.gesture.direction === "right") {
	 			moveCharacter([30, 0], "right");
	 		}
	 		if (event.gesture.direction === "down") {
	 			moveCharacter([0, 30], "down");
	 		};
			// moveCharacter([-30, 0], "left");
	  //     	console.log("Type: " + event.type + ", Fingers: " + event.touches.length + ", Direction: " + event.direction + "<br/>");
	    });
	});
};

	// if(e.keyCode == 38) {
	// 	// move up
	// 	moveCharacter([0, -30], "up");
	// }
	// if(e.keyCode == 39) {
	// 	// move right
	// 	moveCharacter([30, 0], "right");
	// }
	// if(e.keyCode == 40) {
	// 	// down
	// 	moveCharacter([0, 30], "down");
	// }



	$(window).on('touchmove', function (ev) { 
	  ev.preventDefault();
	});
