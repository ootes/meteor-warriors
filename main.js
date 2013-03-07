// add table to the database also for the client
var Characters = new Meteor.Collection("characters");

// insecure package is turned off  so we need to whitelist all permissions
Characters.allow({
	// the user can only insert if there is a value owner wich match his userid
	insert: function( userid, doc ){
		return (userid && doc.owner === userid);
	},

	// the user can only update the documents wich match his userid
	update: function( userid, docs, fields, modifier){
		return _.all(docs, function(doc){
			return doc.owner === userid;	
		});
	},

	// only can remove his own documents
	remove: function(userid, docs, fields, modifier){
		return true;
		return _.all(docs, function(doc){
			return doc.owner === userid;
		});
	}
});



Meteor.methods({
	getUserId: function () {
 		if(this.userId){
 			return this.userId;
 		}else{
 			return false;
 		}
	}
});

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


var query = Characters.find();
var handle = query.observeChanges({
	changed: function(id, fields){

		console.log(id, fields);

		var user = Characters.findOne({_id: id});
		console.log(user);

		var windowWidth = $(window).width() /2;
		var windowHeight = $(window).height() /2;

		$(window).scrollTo( {top:user.posY-100, left: user.posX-100}, 100 );



	
  	}	
});
















