import './avaliar.html';

import { Grupos } from '../api/grupos.js';

Template.avaliar.onCreated(function avaliarOnCreated() {
  Meteor.subscribe('grupos');
  Meteor.subscribe('users');
});

Template.avaliar.helpers({
  atletaAvaliado() {
  	avaliado = Meteor.users.findOne({_id: getAvaliadoId()});
  	return avaliado && avaliado.profile ? avaliado.profile.name : 'Não encontrado';
	},
  avaliacao() {    
    grupo = Grupos.findOne({});
    if (grupo == undefined) {
      return null;
    }

    avaliacoes = grupo.avaliacoes.filter(function(chain) {
      return chain.avaliadoId == getAvaliadoId() && chain.ownerId == Meteor.userId();
    });

    if (avaliacoes.length > 0) {
      return avaliacoes[0];
    }

    return null;
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

    params = {
      grupo: FlowRouter.current().params.grupo_id,
    };

    FlowRouter.go('/grupos/:grupo/atletas', params);
  },
});

function getAvaliadoId() {
  return FlowRouter.current().params.user_id;
}