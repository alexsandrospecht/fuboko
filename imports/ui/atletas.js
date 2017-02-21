import './atletas.html';

Template.atletas.onCreated(function atletasOnCreated() {
  Meteor.subscribe('users');
});

Template.atletas.helpers({
  atletas() {
    // FlowRouter.current().params.grupo_id;
		return Meteor.users.find();	
	},
  pathParaSorteio() {
    var params = {
      grupo: FlowRouter.current().params.grupo_id
    };
    return FlowRouter.path('/grupos/:grupo/sorteio', params);
  }
});

Template.atleta.helpers({
  name() {
  	if (this.profile !== undefined) {
  		return this.profile.name;
  	}
  	return '';
	},
  pathParaAvaliar() {
    var atleta = this;
    var params = {
      grupo: FlowRouter.current().params.grupo_id,
      atleta: atleta._id
    };
    return FlowRouter.path('/grupos/:grupo/avaliar/:atleta', params);
  }
});

Template.atleta.events({
  'click .atleta'(event) {
    var atleta = this;
    var params = {
      grupoId: FlowRouter.current().params.grupo_id,
      atletaId: atleta._id
    };
    $('.avaliacao').remove();
    Blaze.renderWithData(Template.avaliar, params, event.currentTarget.parentElement);
  }
});