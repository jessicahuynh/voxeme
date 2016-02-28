Meteor.publish("theVoxemes", function(){return Voxemes.find()});
Meteor.publish("theVoxML",function(){return VoxML.find()});