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
		return _.all(docs, function(doc){
			return doc.owner === userid;
		});
	}
});


// observe changes on characters
var query = Characters.find();
var handle = query.observeChanges({
	changed: function(id, fields){

		console.log(id, fields);

  	}	
});
















