import './avaliar.html';

import { Avaliacoes } from '../api/avaliacoes.js';

Template.avaliar.onCreated(function avaliarOnCreated() {
  Meteor.subscribe('users');
});

Template.avaliar.helpers({
  atletaAvaliado() {
  	avaliado = Meteor.users.findOne({_id: FlowRouter.current().params.user_id});
  	return avaliado ? avaliado.emails[0].address : 'Não encontrado';
	},
});

Template.avaliar.events({
  'submit .nova-avaliacao'(event) {
    event.preventDefault();
 
    const target = event.target;

    const notaPasse = parseInt(target.notaPasse.value);
    const notaDrible = parseInt(target.notaDrible.value);
    const notaPreparoFisico = parseInt(target.notaPreparoFisico.value);
    const notaChute = parseInt(target.notaChute.value);
    const notaMarcacao = parseInt(target.notaMarcacao.value);
    const avaliado = FlowRouter.current().params.user_id;

    Meteor.call('avaliacoes.insert', notaPasse, notaDrible, notaPreparoFisico, notaChute, notaMarcacao, avaliado);

    target.notaPasse.value = '';
    target.notaDrible.value = '';
    target.notaPreparoFisico.value = '';
    target.notaChute.value = '';
    target.notaMarcacao.value = '';
  },
});