import './atletas.html';

import { Template } from 'meteor/templating';

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
		return this.emails[0].address;	
	},
});