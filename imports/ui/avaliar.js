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

Template.campoAvaliacao.helpers({
  estrelas() {
    return [1, 2, 3, 4, 5];
  },
  checked(pos, nota) {
    return pos === nota;
  }
});

Template.avaliar.events({
  'mouseenter .review > label'(event) {
    toggleLabel(event);
  },
  'mouseleave .review > label' (event) {
    untoggleLabels(event);
  },
  'click .review > label' (event) {
    checkRadio(event);
  },
});

function untoggleLabels(event) {
  radioInput = getRadioInput(event.target);
  if (radioInput != null) {
    checkedRadio = radioInput.parent().children('input.toggled');

    radioInput.parent().children('label').removeClass('toggled');
    checkedRadio.prevAll('label').addClass('toggled');
  }
}

function toggleLabel(event) {
  radioInput = getRadioInput(event.target);
  if (radioInput != null) {
    radioInput.parent().children('label').removeClass('toggled');
    radioInput.prevAll('label').addClass('toggled');
  }
}

function checkRadio(event) {
  radioInput = getRadioInput(event.target.parentElement);
  if (radioInput == null) {
    return;
  }

  radioInput.parent().children('input').removeClass('toggled');
  radioInput.addClass('toggled');
  salvar();
}

function salvar() {
  avaliacao = new Object();
  avaliacao.notaPasse = parseInt($('input.toggled[name=notaPasse]')[0].value);
  avaliacao.notaDrible = parseInt($('input.toggled[name=notaDrible]')[0].value);
  avaliacao.notaPreparoFisico = parseInt($('input.toggled[name=notaPreparoFisico]')[0].value);
  avaliacao.notaChute = parseInt($('input.toggled[name=notaChute]')[0].value);
  avaliacao.notaMarcacao = parseInt($('input.toggled[name=notaMarcacao]')[0].value);
  avaliacao.avaliadoId = getAvaliadoId();

  grupoDefault = Grupos.findOne();

  Meteor.call('avaliacoes.insertOrUpdate', grupoDefault._id, avaliacao);
}

function getRadioInput(label) {
  forAttribute = label.attributes["for"];
  if (forAttribute == undefined) {
    return;
  }

  idInput = forAttribute.value;
  return $('#' + idInput);
}

function getAvaliadoId() {
  return FlowRouter.current().params.user_id;
}