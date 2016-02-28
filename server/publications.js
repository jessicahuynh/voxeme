Meteor.publish("theVoxemes", function(){return Voxemes.find()});
Meteor.publish("theVoxML",function(){return VoxML.find()});
Meteor.publish("theEvents",function(){return Events.find()});