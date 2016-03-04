Meteor.startup(function() {
	if (Voxemes.find().count() == 0) {
		voxjson.forEach(function(vox) {
			Voxemes.insert(vox);
		});
	}
	
	if (Events.find().count() == 0) {
		events.forEach(function(event) {
			Events.insert(event);
		});
	}
});