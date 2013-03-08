Template.gamecanvas.characters = function(){
	return Characters.find();
}

var move = true;


var moveCharacter = function(offset, facedirection){
	var currentChar = Characters.findOne({owner: Meteor.userId()});

	// check if someone is there
	if(
		Characters.findOne({posX: currentChar.posX+offset[0], posY: currentChar.posY+offset[1]}) || 
		currentChar.posX <= 0 && facedirection == "left" ||  
		currentChar.posX >=1500 && facedirection == "right" ||  
		currentChar.posY <= 0 && facedirection == "up" || 
		currentChar.posY >=1500 && facedirection == "down"  &&
		(currentChar.posY != 30 && currentChar.posX != 30)
	) 
	{
		Characters.update({owner: currentChar.owner}, {$set: {face: facedirection}} );
		return;
	}
	// else move character
	Characters.update({owner: currentChar.owner}, {$inc: {posX: offset[0], posY: offset[1]}, $set: {face: facedirection}} );	
};


$(document).on('keydown', function(e){
	if (!move) return;
	move = false;

	if (e.keyCode == 37) { 	
		moveCharacter([-30, 0], "left");
	}
	if(e.keyCode == 38) {
		// move up
		moveCharacter([0, -30], "up");
	}
	if(e.keyCode == 39) {
		// move right
		moveCharacter([30, 0], "right");
	}
	if(e.keyCode == 40) {
		// down
		moveCharacter([0, 30], "down");
	}


	var user = Characters.findOne({owner: Meteor.userId()});
	console.log(user);

	var windowWidth = $(window).width()/2;
	var windowHeight = $(window).height()/2;

	

	var offset = $("#"+user.owner).offset();

	$(window).scrollTo( {top:offset.top-windowHeight, left: offset.left-windowWidth}, 100 );



});

$(document).on('keyup', function(e){
	move = true;
});







