import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Times = new Mongo.Collection('times');

if (Meteor.isServer) {
  Meteor.publish('times', function usersPublication(){
    return Times.find({});
  });
}

if(Meteor.isClient){
   Meteor.subscribe("times");
}