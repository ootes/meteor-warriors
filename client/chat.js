Template.gamecanvas.sayMessage = function(message){
	Characters.update({owner: Meteor.userId()}, {$addToSet: {message: message }});
	$('input[type=text]').val('');
	Meteor.setTimeout(function(){
		Characters.update({owner: Meteor.userId()}, {$unset: {message: ''}});
	}, 3000);
}

Template.form.events({
	'submit form':function(e){
		e.preventDefault();

		if ($('input').val() === "") return;
		
		Template.gamecanvas.sayMessage($('input[type=text]').val());
		
	}
});

// Template..Characters = function(){
// 	characters.find({})
// };