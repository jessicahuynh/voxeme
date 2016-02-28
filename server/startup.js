Meteor.startup(function() {
	if (Voxemes.find().count() == 0) {
		voxjson.forEach(function(vox) {
			Voxemes.insert(vox);
		});
	}
});