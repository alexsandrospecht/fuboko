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

		if (grupo.usuario !== Meteor.userId())
			alert(1); //inserir usuario no grupo

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
