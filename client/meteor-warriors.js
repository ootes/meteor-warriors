  Template.game.message = function () {
    return "Welcome to meteor-warriors.";
  };

Template.gamecanvas.characters = function(){
	return Characters.find();
}


