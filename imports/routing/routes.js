FlowRouter.route('/', {
  action: function(params) {
    BlazeLayout.render("blogHome");
  }
});

FlowRouter.route('/avaliar/:user_id', {
  action: function(params) {
    BlazeLayout.render("avaliar", {user_id: params.user_id});
  }
});

FlowRouter.route('/:action', {
  action: function(params) {
    BlazeLayout.render(params.action);
  }
});