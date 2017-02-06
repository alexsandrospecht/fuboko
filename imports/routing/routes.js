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

FlowRouter.route('/:action', {
  action: function(params) {
    if (Meteor.userId() == null)
      BlazeLayout.render("login");
    else
      BlazeLayout.render(params.action);
  }
});