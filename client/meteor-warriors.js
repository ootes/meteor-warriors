  Template.game.message = function () {
    return "Welcome to meteor-warriors.";
  };

Template.gamecanvas.characters = function(){
	return Characters.find();
}


var move = true;

$(document).on('keydown', function(e){
	if (!move) return;
	move = false;

	var currentChar = Characters.findOne({owner: Meteor.userId()});

	if (e.keyCode == 37) { 
		// move left		
		Characters.update({owner: Meteor.userId()}, {$inc: {posX: -30}, $set: {face: 'left'}} );
	}
	if(e.keyCode == 38) {
		// move up
		Characters.update({owner: Meteor.userId()}, {$inc: {posY : -30}, $set: {face: 'up'}} );
	}
	if(e.keyCode == 39) {
		// move right
		console.log(Meteor.userId());
		Characters.update({owner: Meteor.userId()}, {$inc: {posX : 30}, $set: {face: 'right'}} );
	}
	if(e.keyCode == 40) {
		// down
		Characters.update({owner: Meteor.userId()}, {$inc: {posY : 30}, $set: {face: 'down'}} );
	}
});

$(document).on('keyup', function(e){
	move = true;
});

