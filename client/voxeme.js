if (Meteor.isClient) {

	Template.welcome.helpers({
		objectListData: function() {
			console.log(Voxemes.find().fetch());
			return Voxemes.find();
		}
	});
	
	Template.objectListing.helpers({
		
	});

}