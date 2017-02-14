import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if (Meteor.isServer) {
	Meteor.publish('users', function usersPublication(){
		return Meteor.users.find({});
	});
}

if (Meteor.isServer) {
  if(Meteor.users.find().count() < 10){
    _.each(_.range(10), function(){
      var randomEmail = faker.internet.email();
      var randomName = faker.name.findName();
      var userName = faker.internet.userName();
      
      Accounts.createUser({
        username: userName,
        profile: {
          name: randomName,
        },
        email: randomEmail,
        password: 'password'
      });
    });
  } 
}