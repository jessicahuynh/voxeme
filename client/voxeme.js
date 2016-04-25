if (Meteor.isClient) {
	
	Template.browser.helpers({
		objectListData: function() {
			return Voxemes.find();
		},
		events: function() {
			return Events.find();
		},
		relations: function() {
			return Relations.find();
		},
		attributes: function() {
			return Attributes.find();
		},
		functions: function() {
			return Functions.find();
		},
		obj: function() {
			return Session.get("obj");
		},
		ev: function() {
			return Session.get("event");
		},
		func: function() {
			return Session.get("function");
		},
		test:function() {			
			Session.setDefault("obj",Voxemes.find().fetch()[0]);
			Session.setDefault("event",Events.find().fetch()[0]);
			Session.setDefault("relation",Relations.find().fetch()[0]);
			Session.setDefault("attribute",Attributes.find().fetch()[0]);
			Session.setDefault("function",Functions.find().fetch()[0]);
			
			return Session.get("event").event + ": " + Session.get("obj").VoxML.Lex.Pred + ": " + Session.get("relation").relation+ ": " + Session.get("attribute").attribute + ": " + Session.get("function").function;
		}
	});
	
	Template.objectXML.helpers({
		pred: function() {
			return this.VoxML.Lex.Pred;
		},
		type: function() {
			return this.VoxML.Lex.Type;
		},
		head: function() {
			return this.VoxML.Type.Head;
		},
		components_null: function() {
			return (this.VoxML.Type.Components == null);
		},
		concavity: function() {
			return this.VoxML.Type.Concavity;
		},
		intrinsic_null: function() {
			return (this.VoxML.Habitat.Intrinsic == null);
		},
		extrinsic_null: function() {
			return (this.VoxML.Habitat.Extrinsic == null);
		},
		affordances_null: function() {
			return (this.VoxML.Afford_Str.Affordances == null);
		},
		scale: function() {
			return this.VoxML.Embodiment.Scale;
		},
		movable: function() {
			return this.VoxML.Embodiment.Movable;
		}
	});
	
	Template.eventXML.helpers({
		pred: function() {
			return this.VoxML.Lex.Pred;
		},
		head: function() {
			return this.VoxML.Type.Head;
		},
		args_null: function() {
			return (this.VoxML.Type.Args == null);
		},
		body_null: function() {
			return (this.VoxML.Type.Body == null);
		}
	});
	
	Template.functionXML.helpers({
		pred: function() {
			return this.VoxML.Lex.Pred;
		},
		arg: function() {
			return this.VoxML.Type.Arg;
		},
		map_dimension: function() {
			var m = this.VoxML.Type.Mapping;
			return m['@Name'];
		},
		n: function() {
			var m = this.VoxML.Type.Mapping;
			return m['@Value'];
		},
		space: function() {
			return this.VoxML.Type.Orientation.Space;
		},
		axis: function() {
			return this.VoxML.Type.Orientation.Axis;
		},
		arity_description: function() {
			var a = this.VoxML.Type.Orientation.Arity;
			return a['@Type'];
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
	
	Template.separated.helpers({
		splitList:function() {
			if (this.list != null) {
				return this.list.split(this.sep);
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
		},
		equals: function(t1,t2) {
			return (t1 == t2);
		},
	});
	
	Template.arrow_list.helpers({
		R1exists:function() {
			if (this.list.R1 != null) {
				return this.list.R1;
			}
			else {
				return 'none';
			}
		},
		R2exists:function() {
			if (this.list.R2 != null) {
				return true;
			}
			else {
				return false;
			}
		},
		R3exists:function() {
			if (this.list.R3 != null) {
				return true;
			}
			else {
				return false;
			}
		}
	});
	
	Template.separated.events({
		'click a': function(event) {
			if (event.target.text == 'X') {
				var val = Transfer.findOne({cmd:'showAxisX'}).val;
				Meteor.call("setTransferVariable","showAxisX",!val);
			}
			else
			if (event.target.text == 'Y') {
				var val = Transfer.findOne({cmd:'showAxisY'}).val;
				Meteor.call("setTransferVariable","showAxisY",!val);
			}
			else
			if (event.target.text == 'Z') {
				var val = Transfer.findOne({cmd:'showAxisZ'}).val;
				Meteor.call("setTransferVariable","showAxisZ",!val);
			}
			else
			if (event.target.text == 'XY') {
				var val = Transfer.findOne({cmd:'showPlaneXY'}).val;
				Meteor.call("setTransferVariable","showPlaneXY",!val);
			}
			else
			if (event.target.text == 'XZ') {
				var val = Transfer.findOne({cmd:'showPlaneXZ'}).val;
				Meteor.call("setTransferVariable","showPlaneXZ",!val);
			}
			else
			if (event.target.text == 'YZ') {
				var val = Transfer.findOne({cmd:'showPlaneYZ'}).val;
				Meteor.call("setTransferVariable","showPlaneYZ",!val);
			}
		}
	});
	
	Template.browser.events({
		'change #objectSelect':function (event) {
			event.preventDefault();
			
			var chosen = event.target.value;
			Session.set("obj",Voxemes.findOne({'name':chosen}));
			
			Meteor.call("setTransferVariable","showAxisX",false);
			Meteor.call("setTransferVariable","showAxisY",false);
			Meteor.call("setTransferVariable","showAxisZ",false);
			Meteor.call("setTransferVariable","showPlaneXY",false);
			Meteor.call("setTransferVariable","showPlaneXZ",false);
			Meteor.call("setTransferVariable","showPlaneYZ",false);
			
			Meteor.call("setTransferVariable","dispObj",Session.get("obj").VoxML.Lex.Pred);
		},
		'change #eventSelect':function(event) {
			event.preventDefault();
			
			var chosen = event.target.value;
			Session.set("event",Events.findOne({'event':chosen}));
		},
		'change #relationSelect':function(event) {
			event.preventDefault();
			
			var chosen = event.target.value;
			Session.set("relation",Relations.findOne({'relation':chosen}));
		},
		'change #attributeSelect':function(event) {
			event.preventDefault();
			
			var chosen = event.target.value;
			Session.set("attribute",Attributes.findOne({'attribute':chosen}));
		},
		'change #functionSelect':function(event) {
			event.preventDefault();
			
			var chosen = event.target.value;
			Session.set("function",Functions.findOne({'function':chosen}));
		},
		'click .expand':function(event) {
			event.preventDefault();
			
			$(event.currentTarget).next('.hidden').slideToggle(400);
			
			var toggle = $(event.currentTarget).children('.toggle');
			if (toggle.html() == '+') {
				toggle.html('-');
			}
			else {
				toggle.html('+');
			}
		}
	});
	
	Template.browser.onRendered(function () {	
		$('.xml').height((rwindow.innerHeight()-25)/3);
		
		$(".expand").each(function() {
    		var link = $(this);
    		link.html('<span class="toggle">+</span>&nbsp;'+link.html());
		});
		
		$(".hidden").hide();
	});
	
	
	Template.browser.onCreated(function() {
		$(window).resize(function() {
			$('.xml').height((rwindow.innerHeight()-25)/3);
		});
	});
	
	Template.browser.onDestroyed(function() {
		$(window).off('resize');
	});



}