FlowRouter.route('/', {
  action: function(params) {
    //BlazeLayout.render("blogHome");
    BlazeLayout.render("login");
  }
});

FlowRouter.route('/register', {
  action: function(params) {
    BlazeLayout.render("register");
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