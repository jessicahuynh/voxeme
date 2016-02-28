Meteor.startup(function() {
	if (Voxemes.find().count() == 0) {
		voxjson.forEach(function(vox) {
			Voxemes.insert(vox);
		});
	}
	
	if (VoxML.find().count() == 0) {
		voxxml.forEach(function(vox) {
			VoxML.insert(vox);
		});
	}
});