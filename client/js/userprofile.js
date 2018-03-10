
Template.userprofile.helpers({  
  'chapters': function() {
    if (Meteor.user()) {
      return Tweets.find({ user: Meteor.user().username }).count();
    }
  },

  'following': function() {
    if (Meteor.user()) {
      return Relationships.find({ follower: Meteor.user().username }).count();
    }
  },

  'followers': function() {
    if (Meteor.user()) {
      return Relationships.find({ following: Meteor.user().username }).count();
    }
  },
   'booklist': function() {
    if (Meteor.user()) {
      return Booklist.find({ user: Router.current().params.username });
    }
  },
   'userdata': function() {
       if(Meteor.user()){
      if(Router.current().params.username==Meteor.user().username){
          return Meteor.users.find({ _id:Meteor.userId()});
      }else{
          
      return Meteor.users.find({ _id:{$ne: Meteor.userId()}});}
       }
  },
   'getBookCover': function(bookid){
    var book=Booklist.findOne({_id: bookid}, { sort: {timestamp: -1}, limit: 50 });
     return book.cover;
 },
   'username': function() {
    
      return Router.current().params.username;
    
  },
   'booklistcount': function() {
    if (Meteor.user()) {
      return Booklist.find({ user: Router.current().params.username }).count();
    }
  },
    'chaptercount': function() {
    if (Meteor.user()) {
      return Tweets.find({ user: Router.current().params.username }).count();
    }
  },
 'getFirstChapter': function(bookid){
    var chapter=Tweets.findOne({bookid: bookid,chapternumber:1}, { sort: {timestamp: -1}, limit: 50 });
     if(chapter){
         
     return chapter._id;
     }else{
      return "";   
     }
 }
});

Template.userprofile.onCreated( function() {  
  if (Meteor.user()) {
    this.subscribe('followings', Meteor.user().username);
    this.subscribe('followers', Meteor.user().username);
    this.subscribe('tweets', Meteor.user().username);
    this.subscribe('ownTweets', Meteor.user().username);
    this.subscribe('ownBooks', Meteor.user().username);
    this.subscribe('bookfollow', Meteor.user().username);
    this.subscribe('Books');  
    this.subscribe('bookChaptersAll');
    this.subscribe('users',Router.current().params.username);
  }
});
