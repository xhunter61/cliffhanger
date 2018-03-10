Template.notification.helpers({
  'hasNotification': function() {
    if( Bookfollow.find({followername: Meteor.user().username,sawnewChapter:false}, { sort: {timestamp: -1}, limit: 10 }).count()>0){
        return '';
    }else{
        return 'You have no new Chapters to read!';
    }
  },
  'hasNotificationIcon': function() {
    if( Bookfollow.find({followername: Meteor.user().username,sawnewChapter:false}, { sort: {timestamp: -1}, limit: 10 }).count()>0){
        return '<i class="fa fa-exclamation fa-stack-1x" aria-hidden="true" style="color:#CC0000"></i>';
    }else{
        return '';
    }
  },  
    
 'getNewBookChapters': function() {
     return Bookfollow.find({followername: Meteor.user().username, sawnewChapter:false}, { sort: {timestamp: -1}, limit: 5000 });

  },
 'getBookEntity': function(bookid){
    var book=Booklist.findOne({_id: bookid}, { sort: {timestamp: -1}, limit: 50 });
     if(book){
     return book.booktitle;
     }else{
      return '';   
     }
 }
});

Template.notification.onCreated(function() {
  if (Meteor.user()) {
    //this.subscribe('tweets', Meteor.user().username);
    //this.subscribe('ownTweets', Meteor.user().username);
    //this.subscribe('ownBooks', Meteor.user().username);
    this.subscribe('bookfollow');
    this.subscribe('Books');
    this.subscribe('followingBooks', Meteor.user().username);
  }
});