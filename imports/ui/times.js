import './times.html';

import { Template } from 'meteor/templating';
import { Times } from '../api/times.js';


Template.times.helpers({
  times() {
		return Times.find();	
	},
});

Template.times.events({
  'submit #form-time'(event) {
    event.preventDefault();
 
 	console.log(Times.find())
    const target = event.target;
    const text = target.text.value;
 
    Times.insert({
      nome: text,
      criadoEm: new Date(),
    });

    target.text.value = '';
  },
});