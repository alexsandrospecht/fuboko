import './atletas.html';

Template.atletas.onCreated(function atletasOnCreated() {
  Meteor.subscribe('users');
});

Template.atletas.helpers({
  atletas() {
		return Meteor.users.find();	
	},
});

Template.atleta.helpers({
  email() {
  	if (this.services !== undefined) {
  		login = this.services.facebook;
  		return login.name + ' - ' + login.email;
  	}
  	return '';
	},
});