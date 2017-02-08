import './grupos.html';

import { Template } from 'meteor/templating';
import { Grupos } from '../api/grupos.js';

Template.meusGrupos.helpers({
  meusGrupos() {
		return Grupos.find( {usuario: Meteor.userId()}, { sort: { nome: 1 } });
	},
});

Template.novoGrupo.events({		
  'submit #form-grupo'(event) {
    event.preventDefault();
 
    const target = event.target;
    const text = target.text.value;
 
    Grupos.insert({
      nome: text,
      criadoEm: new Date(),
      usuario: Meteor.userId()
    });

    target.text.value = '';
  },
});

Template.meusGrupos.events({		
  'click #criarGrupo': function(event) {
  	alert(1);
    BlazeLayout.render("novoGrupo");
   },
});
