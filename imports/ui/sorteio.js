import './sorteio.html';

import { Grupos } from '../api/grupos.js';
import { Sorteio } from '../core/sorteio.js';

Template.sorteio.onCreated(function atletasOnCreated() {
  Meteor.subscribe('users');
  Meteor.subscribe('grupos');

  times = null;
});

Template.sorteio.helpers({
  times() {
    if (times) {
      return times;
    }

    atletas = Meteor.users.find().fetch();
    grupo = Grupos.findOne();

    if (grupo == undefined || atletas == undefined || atletas.length <= 1) {
      return null;
    }

    times = new Sorteio(atletas, grupo).sortear();
    return times;
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