Template.promptprofile.helpers({
 'bookEntity': function() {
    return Booklist.find({prompt:Router.current().params._id}, { sort: {timestamp: -1}, limit: 500 });
  },
 'getPrompt': function() {
    return Prompts.find({_id:Router.current().params._id}, { sort: {timestamp: -1}, limit: 1 });
  },
 'getTime': function(oldtime){
   
  var seconds = Math.floor((new Date() - oldtime) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
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
 }
});

Template.promptprofile.events({
    'click #submitbook': function(){
        //implement book submission for prompt id
        var prompt=Prompts.findOne({_id:Router.current().params._id}, { sort: {timestamp: -1}, limit: 1 });
        if(prompt){
         var booktitle=$('#booktitleprompt').val();   
         $('#booktitleprompt').val("");
         var coverlink=$('#bookcover').val();   
         $('#bookcover').val(""); 
         var chaptertitle=$('#chaptertitleprompt').val();   
         $('#chaptertitleprompt').val(""); 
         var chapter=$('#chapter').val();   
         $('#chapter').val("");
         if(coverlink==""){
            coverlink="/defaultcover.png";   
         }                  Meteor.call('insertBook',booktitle,coverlink,chapter,chaptertitle,false,prompt.summary,prompt.genre,Router.current().params._id);    
            
        }
      
 }

  
});

Template.bookprofile.onCreated(function() {
  if (Meteor.user()) {
    this.subscribe('tweets', Meteor.user().username);
    this.subscribe('ownTweets', Meteor.user().username);
    this.subscribe('bookChapters', Router.current().params._id);
    this.subscribe('bookfollow', Meteor.user().username);
    this.subscribe('followingBooks', Meteor.user().username);
    this.subscribe('bookChaptersAll');
    this.subscribe('Ratings');
      this.subscribe('Butterfly');
      
  }
});




//fix das nicht löschen von notificationen wenn der user auf einer seite ist