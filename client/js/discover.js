Template.discover.onRendered(function() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  this.numChars=new ReactiveVar(0);
Session.set('genres', []);
});


Template.discover.helpers({
  'tweetMessage': function() {
    return Tweets.find({}, { sort: {timestamp: -1}, limit: 10 });
  },'getGenres': function() {
    return Session.get('genres');
  },
 'bookEntity': function(genres) {
     if(Session.get('genres').length>0){
             return Booklist.find({genres:{$all: Session.get('genres')}}, { sort: {timestamp: -1}, limit: 50 });
         
     }else{
                      return Booklist.find({}, { sort: {timestamp: -1}, limit: 50 });

         
     }
     //console.log(genre);

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
    myOptions() { 
    return [
      {_id: 'action', caption: 'Action'},
      {_id: 'adventure', caption: 'Adventure'},
      {_id: 'comedy', caption: 'Comedy'},
      {_id: 'drama', caption: 'Drama'},
      {_id: 'diary', caption: 'Diary'},
      {_id: 'fantasy', caption: 'Fantasy'},
      {_id: 'history', caption: 'History'},
      {_id: 'mystery', caption: 'Mystery'},
      {_id: 'romance', caption: 'Romance'},
      {_id: 'science fiction', caption: 'Science fiction'}  
    
    ]
  }, 
    selectedOptions() {
    return [ ]
  }
});

Template.discover.events({
    'change [name="filtergenre"]': function(){
        console.log("changing");
             var selected = $('[name="filtergenre"]').find("option:selected");
     var genres = [];
     selected.each(function(){
       genres.push($(this).val());
     });
     Session.set("genres",genres);
    }
    
});


Template.discover.onCreated(function() {
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