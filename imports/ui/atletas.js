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
  name() {
  	if (this.profile !== undefined) {
  		return this.profile.name;
  	}
  	return '';
	},
});