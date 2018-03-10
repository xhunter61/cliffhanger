Template.dashboard.helpers({
 'newComments': function() {
    return Tweets.find({user:Meteor.user().username, newcomments:{$gt:0}}, {limit: 2500 });
  },
    'listcolor': function(index){
        if(index%2==0){
        return '#ffffff';
        }else{
         return '#f6f6f6';   
        }
    }
    
});

Template.dashboard.events({


  
});

Template.dashboard.onCreated(function() {
  if (Meteor.user()) {
    this.subscribe('tweets', Meteor.user().username);
    this.subscribe('ownTweets', Meteor.user().username);
    this.subscribe('bookChapters', Router.current().params._id);
    this.subscribe('bookfollow', Meteor.user().username);
    this.subscribe('followingBooks', Meteor.user().username);
    this.subscribe('bookChaptersAll');
    this.subscribe('Comments',Router.current().params._id);
    this.subscribe('Ratings');
      this.subscribe('Butterfly');
      
  }
});




//fix das nicht löschen von notificationen wenn der user auf einer seite ist