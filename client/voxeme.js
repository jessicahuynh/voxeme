if (Meteor.isClient) {
	Session.setDefault("vox","Select an object!");

	Template.browser.helpers({
		objectListData: function() {
			return Voxemes.find();
		},
		vox: function() {
			return Session.get("vox");
		}
	});
	
	Template.browser.events({
		'click .voxemeSelect':function (event) {
			event.preventDefault();
			var voxName = this.Voxeme.Lex.Pred;
			Session.set("vox",VoxML.findOne({'voxeme':voxName}));
		}
	});
	
	Template.objectListing.helpers({
		
	});

}