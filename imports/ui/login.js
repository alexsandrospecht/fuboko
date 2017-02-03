import './login.html';

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=senha]').val();
        
        Meteor.loginWithPassword(email, password, function(error){
		    if(error){
		    	console.log(email +" "+ password);
		        console.log(error.reason);
		        alert(error);
		    } else {
		    	window.location.href = '/atletas';
		    }
		});
    }
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=senha]').val();
        Accounts.createUser({
            email: email,
            password: password
        });

		$('.modal-wrapper').toggleClass('open');
		$('.page-wrapper').toggleClass('blur');

		$('.trigger').on('click', function() {
			window.location.href = '/';
		});
    }
});