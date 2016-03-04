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
		this: function() {
			return this;
		},
		name_item: function() {
			if (this != null) {
				return this['@Name'];
			}
		},
		value_item: function() {
			if (this != null) {
				return this['@Value'];
			}
		},
		formula_item: function() {
			if (this != null) {
				return this['@Formula'];
			}
		},
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
		components: function() {
			return this.Voxeme.Type.Components.Component;
		},
		concavity: function() {
			return this.Voxeme.Type.Concavity;
		},
		rotatsym_null: function() {
			return (this.Voxeme.Type.RotatSym == null);
		},
		rotatsym_first: function() {
			return (this.Voxeme.Type.RotatSym.split(',')[0]);
		},
		rotatsym: function() {
			return (this.Voxeme.Type.RotatSym.split(',').slice(1));
		},
		reflsym_null: function() {
			return (this.Voxeme.Type.ReflSym == null);
		},
		reflsym_first: function() {
			return (this.Voxeme.Type.ReflSym.split(',')[0]);
		},
		reflsym: function() {
			return (this.Voxeme.Type.ReflSym.split(',').slice(1));
		},
		intrinsic_null: function() {
			return (this.Voxeme.Habitat.Intrinsic == null);
		},
		intrinsic: function() {
			return this.Voxeme.Habitat.Intrinsic.Intr;
		},
		extrinsic_null: function() {
			return (this.Voxeme.Habitat.Extrinsic == null);
		},
		extrinsic: function() {
			return this.Voxeme.Habitat.Extrinsic.Extr;
		},
		affordances_null: function() {
			return (this.Voxeme.Afford_Str.Affordances == null);
		},
		affordances: function() {
			return this.Voxeme.Afford_Str.Affordances.Affordance;
		},
		scale: function() {
			return this.Voxeme.Embodiment.Scale;
		},
		movable: function() {
			return this.Voxeme.Embodiment.Movable;
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
			
			$(event.currentTarget).next('.hidden').slideToggle(600);
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