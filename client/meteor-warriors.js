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
		if(currentChar.posX > 0){	
			Characters.update({owner: Meteor.userId()}, {$inc: {posX: -30}, $set: {face: 'left'}} );
		}else{
			Characters.update({owner: Meteor.userId()}, {$set: {face: 'left'}} );
		}
	}
	if(e.keyCode == 38) {
		// move up
		if(currentChar.posY > 0){
			Characters.update({owner: Meteor.userId()}, {$inc: {posY : -30}, $set: {face: 'up'}} );
		}else{
			Characters.update({owner: Meteor.userId()}, {$set: {face: 'up'}} );
		}
	}
	if(e.keyCode == 39) {
		// move right
		if(currentChar.posX < 1500){
			Characters.update({owner: Meteor.userId()}, {$inc: {posX : 30}, $set: {face: 'right'}} );
		}else{
			Characters.update({owner: Meteor.userId()}, {$set: {face: 'right'}} );
		}
	}
	if(e.keyCode == 40) {
		// down
		if(currentChar.posY < 1500){
			Characters.update({owner: Meteor.userId()}, {$inc: {posY : 30}, $set: {face: 'down'}} );
		}else{
			Characters.update({owner: Meteor.userId()}, {$set: {face: 'down'}} );
		}
	}
});

$(document).on('keyup', function(e){
	move = true;
});







