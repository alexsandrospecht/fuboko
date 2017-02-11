import './grupos.html';

import { Template } from 'meteor/templating';
import { Grupos } from '../api/grupos.js';

Template.meusGrupos.helpers({
	meusGrupos() {
		return Grupos.find( {usuario: Meteor.userId()}, { sort: { nome: 1 } });
	},
});

Template.novoGrupo.onRendered(function () {
	$('#grupoPublico').prop('checked', true);
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

		Grupos.insert({
		  nome: text,
		  criadoEm: new Date(),
		  publico: public,
		  usuario: Meteor.userId()
		});

		target.text.value = '';
		alert('Novo Grupo Cadastrado Com Sucesso!');
		BlazeLayout.render("meusGrupos");
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
		BlazeLayout.render("novoGrupo");
	},
});