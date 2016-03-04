if (Meteor.isClient) {

	Template.browser.helpers({
		objectListData: function() {
			return Voxemes.find();
		},
		vox: function() {
			return Session.get("vox");
		},
		events: function() {
			return Events.find();
		},
		test:function() {
			Session.setDefault("obj",Voxemes.find().fetch()[0]);
			Session.setDefault("event",Events.find().fetch()[0]);
			
			return Session.get("event").event + ": " + Session.get("obj").Voxeme.Lex.Pred;
		}
	});
	
	Template.objectXML.helpers({
		
	});
	
	Template.browser.events({
		'click .voxemeSelect':function (event) {
			event.preventDefault();
			var voxName = this.Voxeme.Lex.Pred;
			Session.set("obj",this);
			
			$('.objList li a').removeClass('selectedObj');
			$('.objList li a:contains("'+voxName+'")').addClass('selectedObj');
		},
		'click .eButton':function(event) {
			event.preventDefault();
			Session.set("event",this);
		}
	});
	
	Template.browser.onRendered(function () {
		$('.objList').height(rwindow.innerHeight());
			
		$('.xml').height(rwindow.innerHeight()*.7);
		
		$('.events').height(rwindow.innerHeight()*.3);
	});
	
	Template.browser.onCreated(function() {
		$(window).resize(function() {
			$('.objList').height(rwindow.innerHeight());
			
			$('.xml').height(rwindow.innerHeight()*.7);
			
			$('.events').height(rwindow.innerHeight()*.3);
		});
	});
	
	Template.browser.onDestroyed(function() {
		$(window).off('resize');
	});


}