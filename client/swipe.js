$(document).on('swipeleft', function(event){
	if (!move) return;
	move = false;
 	
		moveCharacter([-30, 0], "left");


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
});