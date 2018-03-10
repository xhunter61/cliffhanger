Meteor.startup(function () { 
    

  Relationships._ensureIndex({follower: 1, following: 1}, {unique: 1});

Accounts.onCreateUser(function (options, user) {
    

    if (options.profile) {
      // include the user profile
      user.profile = options.profile
      
    }

    // other user object changes...
    // ...
    
    return user;
  });




});