if (Meteor.isClient) {
	Session.setDefault("vox",{'xml':"Select an object!"});
	Session.setDefault("obj",{'Voxeme':{'Lex':{'Pred':'none'}}});
	Session.setDefault("event",{'event':'no event selected'});

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
			return Session.get("event").event + ": " + Session.get("obj").Voxeme.Lex.Pred;
		}
	});
	
	Template.browser.events({
		'click .voxemeSelect':function (event) {
			event.preventDefault();
			var voxName = this.Voxeme.Lex.Pred;
			Session.set("vox",VoxML.findOne({'voxeme':voxName}));
			Session.set("obj",this);
			
			$('.objList li a').removeClass('selectedObj');
			$('.objList li a:contains("'+voxName+'")').addClass('selectedObj');
		},
		'click .eButton':function(event) {
			event.preventDefault();
			Session.set("event",this);
		}
	});
	
	Template.browser.rendered = function () {
		$('.objList').height(rwindow.innerHeight());
			
		$('.xml').height(rwindow.innerHeight()*.3);
		
		$('.events').height(rwindow.innerHeight()*.7);
	}
	
	Template.browser.onCreated(function() {
		$(window).resize(function() {
			$('.objList').height(rwindow.innerHeight());
			
			$('.xml').height(rwindow.innerHeight()*.3);
			
			$('.events').height(rwindow.innerHeight()*.7);
		});
	});
	
	Template.browser.onDestroyed(function() {
		$(window).off('resize');
	});


}