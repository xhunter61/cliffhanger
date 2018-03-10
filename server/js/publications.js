Meteor.publishComposite('tweets', function(username) {
  return {
    find: function() {
      // Find the current user's following users
      return Relationships.find({ follower: username });
    },
    children: [{
      find: function(relationship) {
        // Find tweets from followed users
        return Tweets.find({user: relationship.following});
      }
    }]
  }
});

Meteor.publish('ownTweets', function(username) {
  return Tweets.find({user: username});
});

Meteor.publish('followingBooks', function(username) {
  return Bookfollow.find({followername: username});
});

Meteor.publish('ownBooks', function(username) {
  return Booklist.find({user: username});
});

Meteor.publish('hiddenTweets', function(username) {
  return Tweets.find({user: username, visibility: "Unlisted"});
});

Meteor.publish('Books', function() {
  return Booklist.find({});
});

Meteor.publish('Prompts', function() {
  return Prompts.find({});
});

Meteor.publish('Tweets', function() {
  return Tweets.find({visibility:"Public"});
});

Meteor.publish('bookChapters', function(id) {
  return Tweets.find({_id: id});
});

Meteor.publish('bookChaptersAll', function(id) {
  return Tweets.find({});
});

Meteor.publish('UserProfile', function(id) {
  return User.find({});
});

Meteor.publish('Ratings', function(id) {
  return Ratings.find({});
});

Meteor.publish('Comments', function(id) {
  return Comments.find({});
});

Meteor.publish('users', function(username) {
  return Meteor.users.find({username: username}, {
    fields: { profile:true },
    limit: 100
  });
});


  Meteor.publish('Butterfly', function () {
    return Butterfly.find({});
  });




Meteor.publish('bookfollow', function() {
  return Bookfollow.find({});
});

Meteor.publish('followings', function(username) {
  return Relationships.find({ follower: username });
});

Meteor.publish('followers', function(username) {
  return Relationships.find({ following: username });
});



Houston.add_collection(Meteor.users);


