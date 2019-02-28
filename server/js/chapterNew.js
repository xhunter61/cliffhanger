Meteor.methods({  
  'updateBookmarkNew': function(chapterid) {
      var chapternumber;
      var book;
      var chapter= Tweets.findOne({_id:chapterid});
      //console.log("Bookmark function called");
      if(chapter && Meteor.user.username!=null){
          //console.log(chapter.chapternumber);
          chapternumber=chapter.chapternumber;
          book=chapter.bookid;
          var userfollow= Bookfollow.findOne({following:book,followername:Meteor.user().username});
          if(userfollow){
          var bookmarknumber= userfollow.bookmark
          if(chapternumber>bookmarknumber){
           Bookfollow.update({following:book,followername:Meteor.user().username},{$set:{bookmark: chapternumber}}); 
              
              
          }
          }
      }

  },
    'addCommentNew': function(chapterid, comment){
        Comments.insert({
        chapterid: chapterid,
        user: Meteor.user().username,
        comment: comment,
        time: new Date()
        });
        
        Tweets.update({
        _id:chapterid},{$inc: {newcomments: 1}}  
        );
        
    },
    'EditChapterTitleNew': function(chapterid, newtitle){
        console.log("changing title");
        Tweets.update({
        _id: chapterid,
        user: Meteor.user().username
        },{$set:{chaptertitle: newtitle}});   
        
    },
    'EditChapterMessageNew': function(chapterid, newmessage){
        Tweets.update({
        _id: chapterid,
        user: Meteor.user().username
        },{$set:{message: newmessage}});   
        
    },
    'EditChapterVisibilityNew': function(chapterid, visibility){
        Tweets.update({
        _id: chapterid,
        user: Meteor.user().username
        },{$set:{visibility: visibility}});   
        
    }
});