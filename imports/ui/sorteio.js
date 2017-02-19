import './sorteio.html';

import { Grupos } from '../api/grupos.js';
import { Sorteio } from '../core/sorteio.js';
import { ReactiveDict } from 'meteor/reactive-dict';

Template.sorteio.onCreated(function atletasOnCreated() {
  Meteor.subscribe('users');
  Meteor.subscribe('grupos');

  this.times = new ReactiveDict();
});

Template.sorteio.helpers({
  times() {
    if (this.times) {
      return this.times;
    }

    return this.times = buildTimes();
	},
  pathParaSorteio() {
    var params = {
      grupo: FlowRouter.current().params.grupo_id
    };
    return FlowRouter.path('/grupos/:grupo/sorteio', params);
  }
});

Template.atletaSorteio.helpers({
  nome() {
  	if (this.profile !== undefined) {
  		return this.profile.name;
  	}
  	return '';
	},
});

Template.sorteio.events({
    'click #resortear': function(event) {
      this.times = null;

      BlazeLayout.reset(); // this will remove the current template.
      BlazeLayout.render('sorteio');
    },
});

function buildTimes() {
  atletas = Meteor.users.find().fetch();
  grupo = Grupos.findOne();

  if (grupo == undefined || atletas == undefined || atletas.length <= 1) {
    return null;
  }

  return new Sorteio(atletas, grupo).sortear();
}