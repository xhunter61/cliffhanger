Template.followedBooks.helpers({
  'tweetMessage': function() {
    return Tweets.find({}, { sort: {timestamp: -1}, limit: 10 });
  },
 'followedBookEntity': function() {
     return Bookfollow.find({followername: Meteor.user().username}, { sort: {timestamp: -1}, limit: 50 });

  },
 'getBookEntity': function(bookid){
    var book=Booklist.findOne({_id: bookid}, { sort: {timestamp: -1}, limit: 50 });
     if(book){
         
     return book.booktitle;
     }else{
      return "";   
     }
 },
   'getBookCover': function(bookid){
    var book=Booklist.findOne({_id: bookid}, { sort: {timestamp: -1}, limit: 50 });
     if(book){
       return book.cover;
     }else{
         return "";
     }
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

Template.followedBooks.onCreated(function() {
  if (Meteor.user()) {
    //this.subscribe('tweets', Meteor.user().username);
    //this.subscribe('ownTweets', Meteor.user().username);
    //this.subscribe('ownBooks', Meteor.user().username);
    this.subscribe('bookfollow');
    this.subscribe('Books');
    this.subscribe('followingBooks', Meteor.user().username);
  }
});