Template.gamecanvas.init = function(){


	console.log("game init")

	Meteor.call('getUserId', function(error, Id){
		if(Id){
			var user = Meteor.users.findOne({_id: Id});

			var hasCharacter = function(){
				return Characters.findOne({owner: Id});
			};

			if(!hasCharacter()){

				Characters.insert({
					name: user.profile.name,
					owner: user._id,
					posX: 30,
					posY: 30,
					face: 'down'
				});

			}
		}
	});
}

Template.gamecanvas.characters = function(){
	return Characters.find();
}




var move = true;


Template.gamecanvas.moveCharacter = function(offset, facedirection){
	var currentChar = Characters.findOne({owner: Meteor.userId()});

	var posOccupied = Characters.findOne({posX: currentChar.posX+offset[0], posY: currentChar.posY+offset[1]});

	// check if someone is there
	if(
		posOccupied || 
		currentChar.posX <= 0 && facedirection == "left" ||  
		currentChar.posX >=1500 && facedirection == "right" ||  
		currentChar.posY <= 0 && facedirection == "up" || 
		currentChar.posY >=1500 && facedirection == "down"  &&
		(currentChar.posY != 30 && currentChar.posX != 30)
	) 
	{
		Characters.update({owner: currentChar.owner}, {$set: {face: facedirection}} );

		if(posOccupied){
			Template.gamecanvas.sayMessage("Move bitch, get out my way!");
		}else{
			Template.gamecanvas.sayMessage("It looks like i can't go further");
		}
		return;
	}
	// else move character
	Characters.update({owner: currentChar.owner}, {$inc: {posX: offset[0], posY: offset[1]}, $set: {face: facedirection}} );

	// window width and height
	var windowWidth = $(window).width()/2;
	var windowHeight = $(window).height()/2;

	// offset from chat
	var offset = $("#"+currentChar.owner).offset();
	$(window).scrollTo( {top:offset.top-windowHeight, left: offset.left-windowWidth}, 100 );	
};


$(document).on('keydown', function(e){
	if (!move) return;
	move = false;

	if (e.keyCode == 37) { 	
		Template.gamecanvas.moveCharacter([-30, 0], "left");
	}
	if(e.keyCode == 38) {
		// move up
		Template.gamecanvas.moveCharacter([0, -30], "up");
	}
	if(e.keyCode == 39) {
		// move right
		Template.gamecanvas.moveCharacter([30, 0], "right");
	}
	if(e.keyCode == 40) {
		// down
		Template.gamecanvas.moveCharacter([0, 30], "down");
	}
});

$(document).on('keyup', function(e){
	move = true;
});







