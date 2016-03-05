if (Meteor.isClient) {

	Template.browser.helpers({
		objectListData: function() {
			return Voxemes.find();
		},
		events: function() {
			return Events.find();
		},
		obj: function() {
			return Session.get("obj");
		},
		test:function() {
			Session.setDefault("obj",Voxemes.find().fetch()[0]);
			Session.setDefault("event",Events.find().fetch()[0]);
			
			return Session.get("event").event + ": " + Session.get("obj").Voxeme.Lex.Pred;
		}
	});
	
	Template.objectXML.helpers({
		pred: function() {
			return this.Voxeme.Lex.Pred;
		},
		type: function() {
			return this.Voxeme.Lex.Type;
		},
		head: function() {
			return this.Voxeme.Type.Head;
		},
		components_null: function() {
			return (this.Voxeme.Type.Components == null);
		},
		concavity: function() {
			return this.Voxeme.Type.Concavity;
		},
		intrinsic_null: function() {
			return (this.Voxeme.Habitat.Intrinsic == null);
		},
		extrinsic_null: function() {
			return (this.Voxeme.Habitat.Extrinsic == null);
		},
		affordances_null: function() {
			return (this.Voxeme.Afford_Str.Affordances == null);
		},
		scale: function() {
			return this.Voxeme.Embodiment.Scale;
		},
		movable: function() {
			return this.Voxeme.Embodiment.Movable;
		}
	});
	
	Template.listItems.helpers({
		item: function() {
			if (this != null) {
				if (this['@Value'] != null) {
					return this['@Value'];
				}
				else {
					return this['@Formula'];
				}
			}
		},
	});
	
	Template.commaSeparated.helpers({
		splitList:function() {
			if (this.list != null) {
				return this.list.split(',');
			}
			else {
				return ['none'];
			}
		},
		lenZero: function() {
			return (this[0] == 'none');
		},
		comma: function() {
			return this.splice(0,this.length-1);
		},
		last: function() {
			return this[this.length-1];
		}
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
		},
		'click .expand':function(event) {
			event.preventDefault();
			
			$(event.currentTarget).next('.hidden').slideToggle(400);
		}
	});
	
	Template.browser.onRendered(function () {
		$('.objList').height(rwindow.innerHeight());
			
		$('.xml').height(rwindow.innerHeight()*.7);
		
		$('.events').height(rwindow.innerHeight()*.3);
		
		
		$(".expand").each(function() {
    		var link = $(this);
    		link.html('+ '+link.html());
		});
		
		$(".hidden").hide();
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