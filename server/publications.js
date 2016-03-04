Meteor.publish("theVoxemes", function(){return Voxemes.find()});

Meteor.publish("theEvents",function(){return Events.find()});