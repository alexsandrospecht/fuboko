import './grupos.html';

import { Template } from 'meteor/templating';
import { Grupos } from '../api/grupos.js';

Template.grupos.helpers({
  grupos() {
		return Grupos.find();
	},
});

Template.grupos.events({
  'submit #form-grupo'(event) {
    event.preventDefault();
 
    const target = event.target;
    const text = target.text.value;
 
    Grupos.insert({
      nome: text,
      criadoEm: new Date(),
    });

    target.text.value = '';
  },
});