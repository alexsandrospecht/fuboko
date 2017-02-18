FlowRouter.route('/grupos/:grupo_id/atletas', {
  action: function(params) {
    render("atletas", {grupo_id: params.grupo_id});
  }
});

FlowRouter.route('/grupos/:grupo_id/sorteio', {
  action: function(params) {
    render("sorteio", {grupo_id: params.grupo_id});
  }
});

FlowRouter.route('/grupos/:grupo_id/avaliar/:user_id', {
  action: function(params) {
    render("avaliar", {user_id: params.user_id, grupo_id: params.grupo_id});
  }
});

FlowRouter.route('/novoGrupo', {
  action: function(params) {
    BlazeLayout.render("novoGrupo");
  }
});

FlowRouter.route('/grupos/:_id', {
  action: function(params) {
    render("novoGrupo", {_id: params._id});
  }
});

route('/grupos', 'meusGrupos');
route('/', 'meusGrupos');

function route(from, toAction) {
  FlowRouter.route(from, {
    action: function(params) {
      render(toAction);
    }
  });
};

function render(action, ...params) {
  if (Meteor.userId() == null) {
    renderWithoutLogin("login");
    return;
  }
  renderWithoutLogin(action, params);
}

function renderWithoutLogin(action, ...params) {
  BlazeLayout.render(action, params);
}
