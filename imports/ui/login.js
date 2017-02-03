import './login.html';

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=senha]').val();
        
        // Remover
        if (Meteor.users.find().count() === 0) {
		  seedUserId = Accounts.createUser({
		    email: 'teste@teste.com',
		    password: '123456'
		  });
		}

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
        alert('Registro realizado com sucesso. Por favor realize o login.')
        BlazeLayout.render("login");
    }
});