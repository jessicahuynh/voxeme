Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here .... 
});

Router.route('/', {name: 'browser',
	waitOn:function() {
		return Meteor.subscribe("theVoxemes");
	}
});