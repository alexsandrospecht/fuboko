import './avaliar.html';

import { Grupos } from '../api/grupos.js';

Template.avaliar.onCreated(function avaliarOnCreated() {
  Meteor.subscribe('grupos');
  Meteor.subscribe('users');
});

Template.avaliar.helpers({
  atletaAvaliado() {
  	avaliado = Meteor.users.findOne({_id: getAvaliadoId()});
  	return avaliado && avaliado.services ? avaliado.services.facebook.name : 'Não encontrado';
	},
  avaliacao() {
    avaliacao = Grupos.findOne(
      // {'_id': id}
      {'avaliacoes' : 
        {$elemMatch: {avaliadoId: getAvaliadoId(), ownerId: Meteor.userId()}}}
    );

    if (avaliacao !== undefined && avaliacao.avaliacoes.length > 0) {
      avaliacao = avaliacao.avaliacoes[0];
    }

    return avaliacao;
  },
});

Template.avaliar.events({
  'submit .nova-avaliacao'(event) {
    event.preventDefault();
  
    avaliacao = new Object();

    const target = event.target;

    avaliacao.notaPasse = parseInt(target.notaPasse.value);
    avaliacao.notaDrible = parseInt(target.notaDrible.value);
    avaliacao.notaPreparoFisico = parseInt(target.notaPreparoFisico.value);
    avaliacao.notaChute = parseInt(target.notaChute.value);
    avaliacao.notaMarcacao = parseInt(target.notaMarcacao.value);
    avaliacao.avaliadoId = getAvaliadoId();

    grupoDefault = Grupos.findOne();

    Meteor.call('avaliacoes.insertOrUpdate', grupoDefault._id, avaliacao);

    FlowRouter.go('/atletas');
  },
});

function getAvaliadoId() {
  return FlowRouter.current().params.user_id;
}