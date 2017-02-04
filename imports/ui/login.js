import './login.html';

Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({ requestPermissions: ['email']}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            } else {
            	window.location.href = '/atletas';
            }
        });
    },
 
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    },

    'click #inicio': function(event) {
        window.location.href = '/atletas';
    }
});