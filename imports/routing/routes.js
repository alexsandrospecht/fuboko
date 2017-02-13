FlowRouter.route('/', {
  action: function(params) {
    BlazeLayout.render("login");
  }
});

FlowRouter.route('/avaliar/:user_id', {
  action: function(params) {
    BlazeLayout.render("avaliar", {user_id: params.user_id});
  }
});

FlowRouter.route('/grupos', {
  action: function(params) {
    BlazeLayout.render("meusGrupos");
  }
});

FlowRouter.route('/grupo/:_id', {
  action: function(params) {
    BlazeLayout.render("novoGrupo", {_id: params._id});
  }
});

FlowRouter.route('/:action', {
  action: function(params) {
    if (Meteor.userId() == null)
      BlazeLayout.render("login");
    else
      BlazeLayout.render(params.action);
  }
});