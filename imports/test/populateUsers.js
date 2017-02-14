while (Meteor.users.find().count() < 15) {
  var randomEmail = faker.internet.email();
  var randomName = faker.name.findName();
  var userName = faker.internet.userName();
  
  Accounts.createUser({
    username: userName,
    profile: {
      name: randomName,
    },
    email: randomEmail,
    password: 'password'
  });
}; 