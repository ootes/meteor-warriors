/*############################################
	Zorgt ervoor dat de game geïnitieerd wordt 
	en als je geen character hebt wordt deze 
	aangemaakt.
#############################################*/
Template.gamecanvas.init = function(){

	var hasCharacter = function(){
		return Characters.findOne({owner: user._id});
	};
	
	var user = Meteor.users.findOne({_id: Meteor.userId()}); 
	

	if(!hasCharacter()){
	
			Characters.insert({
				name: user.profile.name,
				owner: Meteor.userId(),
				posX: 30,
				posY: 30,
				face: 'down'
			});

	}
}


/*############################################
	Geeft alle objecten terug van de tabel 
	characters in de MongoDB
#############################################*/
Template.gamecanvas.characters = function(){
	return Characters.find();
}


/*############################################
	Centreert de canvas op basis van je character
#############################################*/
Template.gamecanvas.centerCanvas = function(ownerid){

	// window width and height
	var windowWidth = $(window).width()/2;
	var windowHeight = $(window).height()/2;

	// offset from chat
	var offset = $("#"+ownerid).offset();
	$(window).scrollTo( {top:offset.top-windowHeight, left: offset.left-windowWidth}, 100 );

}


/*############################################
	Verplaatst je character, kijkt ook of er 
	iemand staat en of je nog binnen de canvas zit,
	centreert je canvas als je mag bewegen
#############################################*/
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
			Template.gamecanvas.sayMessage("Move bitch, get out the way!");
		}else{
			Template.gamecanvas.sayMessage("It looks like i can't go further");
		}
		return;
	}
	// else move character
	Characters.update({owner: currentChar.owner}, {$inc: {posX: offset[0], posY: offset[1]}, $set: {face: facedirection}} );

	Template.gamecanvas.centerCanvas(currentChar.owner);
		
}


/*############################################
	Zorg dat er een veldje message bij je character
	erbij komt verdwijnt standaard na 3 sec
#############################################*/
Template.gamecanvas.sayMessage = function(message){

	Characters.update({owner: Meteor.userId()}, {$addToSet: {message: message }});
	
	$('input[type=text]').val('');
	
	Meteor.clearTimeout(msgtimer);
	
	var msgtimer = Meteor.setTimeout(function(){
		Characters.update({owner: Meteor.userId()}, {$unset: {message: ''}});
	}, 3000);
};


/*############################################
	Wanneer het formulier verzonden wordt geeft 
	het de inhoud van de input mee aan de sayMessage method
#############################################*/
Template.form.events({
	'submit form':function(e){
		e.preventDefault();

		if ($('input').val() === "") return;
		
		var user = Characters.findOne({owner: Meteor.userId()});
		
		Template.gamecanvas.sayMessage($('input[type=text]').val());
		
		Template.gamecanvas.centerCanvas(Meteor.userId());
		
	}
});


/*############################################
	Kijkt naar keydown event op je document, 
	veplaatst dan je character met de 
	movecharacter method
#############################################*/
Template.gamecanvas.move = true;

$(document).on('keydown', function(e){
	if (!Template.gamecanvas.move) return;
	
	Template.gamecanvas.move = false;

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
	Template.gamecanvas.move = true;
});


/*############################################
	Voorkom alle touchevents op mobiel
#############################################*/
$(window).on('touchmove', function (ev) { 
  ev.preventDefault();
});


/*############################################
	Voeg touch events toe om je character te bewegen.
#############################################*/
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

