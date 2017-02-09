import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Grupos = new Mongo.Collection('grupos');

if (Meteor.isServer) {
  Meteor.publish('grupos.all', function usersPublication(){
    return Grupos.find({});
  });
}

if (Meteor.isClient){
  Meteor.subscribe("grupos");
}

Meteor.methods({
	'grupos.findAll'() {
		console.log(Grupos.findOne({}));
		return Grupos.find({}).fetch();
	}, 

	'grupos.findById'(grupoId) {
		return Grupos.findOne(grupoId);
	}
});