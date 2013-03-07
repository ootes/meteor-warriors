Template.form.events({
	'submit form':function(e){
		e.preventDefault();

		if ($('input').val() === "") return;
		

		Characters.update({owner: Meteor.userId()}, {$addToSet: {message: $('input[type=text]').val() }});
		
		$('input[type=text]').val('');
		
		Meteor.setTimeout(function(){
			Characters.update({owner: Meteor.userId()}, {$unset: {message: ''}});
		}, 3000)
	}
});

// Template..Characters = function(){
// 	characters.find({})
// };