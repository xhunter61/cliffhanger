Meteor.methods({  
  'findUser': function(username) {
    return Meteor.users.findOne({
      username: username
    }, {
      fields: { 'username': 1 }
    });
  }
});


Meteor.methods({  
  'findUsers': function(username) {
    return Booklist.find({
      booktitle:new RegExp(username,"i")
    }, {
      fields: { 'booktitle': 1, bookid: 1, cover:1, user:1  }
    }).fetch();
  }
});

Meteor.methods({  
  'findUsercount': function(username) {
    return Booklist.find({
      booktitle: new RegExp(username)}, {
      fields: { 'booktitle': 1 , bookid: 1}
    }).count();
  }
});

Meteor.methods({  
  'followUser': function(username) {
    Relationships.insert({
      follower: Meteor.user().username,
      following: username
    });
  }
});

Meteor.methods({  
  'recommendUsers': function() {
    if (Meteor.user()) {
      var currentFollowings = UserUtils.findFollowings(Meteor.user().username);

      var recUsers = Meteor.users.find({
        username: {
          $nin: currentFollowings
        }
      }, {
        fields: { 'username': 1 },
        limit: 5
      }).fetch();

      return recUsers;
    }
  }
});