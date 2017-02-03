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
		    } else {
		        alert('logado');
		        // Router.go("home");
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
        //alert('Registro realizado com sucesso. Por favor realize o login.')

		$('.modal-wrapper').toggleClass('open');
		$('.page-wrapper').toggleClass('blur');

        //BlazeLayout.render("login");
    }
});