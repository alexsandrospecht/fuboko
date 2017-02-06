import './avaliar.html';

Template.avaliar.onCreated(function atletasOnCreated() {
  Meteor.subscribe('users');
});

Template.avaliar.helpers({
  atletaAvaliado() {
		return Meteor.users.findOne({_id: FlowRouter.current().params.user_id}).emails[0].address;
	},
});