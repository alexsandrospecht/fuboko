FlowRouter.route('/', {
  action: function(params) {
    BlazeLayout.render("mainLayout", {content: 'blogHome'});
  }
});

FlowRouter.route('/:action', {
  action: function(params) {
    BlazeLayout.render("mainLayout", {content: params.action});
  }
});