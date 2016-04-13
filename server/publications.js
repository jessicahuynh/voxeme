Meteor.publish("theVoxemes", function(){return Voxemes.find()});

Meteor.publish("theEvents",function(){return Events.find()});

Meteor.publish("theRelations",function(){return Relations.find()});

Meteor.publish("theAttributes",function(){return Attributes.find()});

Meteor.publish("theFunctions",function(){return Functions.find()});

Meteor.publish("transferVars", function(){return Transfer.find()});