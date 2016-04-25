Meteor.startup(function() {
	if (Voxemes.find().count() == 0) {
		objects.forEach(function(vox) {
			Voxemes.insert(vox);
		});
	}
	
	if (Events.find().count() == 0) {
		events.forEach(function(event) {
			Events.insert(event);
		});
	}
	
	if (Relations.find().count() == 0) {
		relations.forEach(function(relation) {
			Relations.insert(relation);
		});
	}
	
	if (Attributes.find().count() == 0) {
		attributes.forEach(function(attribute) {
			Attributes.insert(attribute);
		});
	}
	
	if (Functions.find().count() == 0) {
		functions.forEach(function(f) {
			Functions.insert(f);
		});
	}
	
	Transfer.remove({});
	Transfer.insert({cmd:'dispObj', val:''});
	Transfer.insert({cmd:'showAxisX', val:false});
	Transfer.insert({cmd:'showAxisY', val:false});
	Transfer.insert({cmd:'showAxisZ', val:false});
	Transfer.insert({cmd:'showPlaneXY', val:false});
	Transfer.insert({cmd:'showPlaneXZ', val:false});
	Transfer.insert({cmd:'showPlaneYZ', val:false});
});