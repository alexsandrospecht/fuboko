import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if (Meteor.isServer) {
	Meteor.publish('users', function usersPublication(){
		console.log("Trying to publish: " + Meteor.users.find().count() + " users");
		return Meteor.users.find({});
	});
}