import './grupos.html';

import { Grupos } from '../api/grupos.js';

Template.meusGrupos.helpers({
	meusGrupos() {
		return Grupos.find({}, { sort: { nome: 1 } });
	},
});

Template.novoGrupo.onRendered(function () {
	$('#grupoPublico').prop('checked', true);
});

Template.novoGrupo.helpers({
  grupo() {
    grupo = Grupos.findOne({_id: FlowRouter.current().params._id});
    return grupo ? grupo : 'Não encontrado';
  },
});

Template.detalharGrupo.helpers({
  grupo() {
    grupo = Grupos.findOne({_id: FlowRouter.current().params._id});

		if (grupo.atletas === undefined) {
			Grupos.update(
			   { _id: grupo._id },
			   { $addToSet: {atletas: [ Meteor.userId() ] } }
			)
		} else if (Meteor.userId() in grupo.atletas) {
			Grupos.update(
			   { _id: grupo._id },
			   { $addToSet: {atletas: [ Meteor.userId() ] } }
			)
		}
    return grupo ? grupo : 'Não encontrado';
  },
});

Template.novoGrupo.events({
	'submit #form-grupo'(event) {
		event.preventDefault();

		var public = $("#grupoPublico").is(":checked");

		const target = event.target;
		const text = target.text.value;

		if (text === '') {
			return;
		}

    if (grupo != null) {
       Grupos.update(grupo._id, {
        $set: { nome: text, publico: public },
				$addToSet: {atletas: [ Meteor.userId() ] },
      });

      target.text.value = '';
      alert('Grupo Alterado Com Sucesso!');
      FlowRouter.go('/grupos');
      return;
    }

		Grupos.insert({
		  nome: text,
		  criadoEm: new Date(),
		  publico: public,
		  usuario: Meteor.userId()
		});

		target.text.value = '';

		alert('Novo Grupo Cadastrado Com Sucesso!');
		FlowRouter.go('/grupos');
	},
	'click #cancelarGrupo' (event) {
	    BlazeLayout.render("meusGrupos");
	},
	'change #grupoPrivado' (event) {
		$('#grupoPublico').prop('checked', false);
	},
	'change #grupoPublico' (event) {
		$('#grupoPrivado').prop('checked', false);
	},
});

Template.meusGrupos.events({
	'click #criarGrupo': function(event) {
		FlowRouter.go("/novoGrupo");
	}
});
