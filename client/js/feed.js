Template.tweetFeed.helpers({
  'tweetMessage': function() {
    return Tweets.find({}, { sort: {timestamp: -1}, limit: 10 });
  },
 'bookEntity': function() {
     
    return Booklist.find({}, { sort: {timestamp: -1}, limit: 50 });
  },
 'createLink': function(){
    
 },
 'getFirstChapter': function(bookid){
     if(Bookfollow.findOne({following:bookid, followername: Meteor.user().username})){
         //console.log(bookid +"following");
        var chapterfollow=Bookfollow.findOne({following:bookid, followername: Meteor.user().username});
         //console.log(chapterfollow.bookmark);
        var bookmark= Tweets.findOne({bookid: bookid, chapternumber: chapterfollow.bookmark});
         
         //console.log(bookmark);
         if(bookmark){
         
         return bookmark._id;
         }else{
          return "";   
         }
         
         
     }else{
         
     
    var chapter=Tweets.findOne({bookid: bookid,chapternumber:1}, { sort: {timestamp: -1}, limit: 50 });
     if(chapter){
         
     return chapter._id;
     }else{
      return "";   
     }
         
     }
 },
});

Template.tweetFeed.onCreated(function() {
  if (Meteor.user()) {
    this.subscribe('tweets', Meteor.user().username);
    this.subscribe('ownTweets', Meteor.user().username);
    this.subscribe('ownBooks', Meteor.user().username);
    this.subscribe('bookfollow', Meteor.user().username);
      this.subscribe('Books');
      this.subscribe('bookChapters', Router.current().params._id);
      this.subscribe('followingBooks', Meteor.user().username);
  }
});