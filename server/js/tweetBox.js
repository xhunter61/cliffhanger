Meteor.methods({
  insertTweet: function(tweet,title,chaptertitle,visibility) {
    if (Meteor.user()) {
        var book= Booklist.findOne({booktitle:title,user:Meteor.user().username});
        var bookid;
        if(book){
            bookid=book._id;
        }
      if(bookid){  
      Tweets.insert({
        chaptertitle: chaptertitle,
        message: tweet,
        bookid: bookid,
        chapternumber: book.chaptercount+1,  
        user: Meteor.user().username,
        timestamp: new Date(),
        visibility:visibility
      });
      Booklist.update({booktitle:title, user: Meteor.user().username},{$inc: {chaptercount: 1}});
      
      Bookfollow.update({following:bookid},{$set:{sawnewChapter:false}},{multi:true});        
      }
        
        
    }
  },
  
  insertBook: function(title,cover,tweet,chaptertitle, butter, booksummary,genres,prompt) {
    if (Meteor.user()) {
        console.log(title+ "  "+ booksummary);
        if(booksummary == ""){
         booksummary = "No summary for this book available";   
        }
      Booklist.insert({
        booktitle: title,
        cover: cover,
        chaptercount: 1,
        user: Meteor.user().username,
        viewercount:1,  
        timestamp: new Date(),
        butterfly:butter,
          summary: booksummary,
          genres: genres,
          prompt:prompt
      });
        
        var book= Booklist.findOne({booktitle:title,cover:cover,user:Meteor.user().username});
        var bookid;
        if(book){
            bookid=book._id;
        }
        var tweetid;
        if(bookid){
        tweetid=   Tweets.insert({
        chaptertitle: chaptertitle,
        message: tweet,
        bookid: bookid,
        chapternumber: 1,  
        user: Meteor.user().username,
        timestamp: new Date()
           }); 
        }
        
        if(butter){
           Butterfly.insert({
        chaptertitle: title,
        message: "",
        bookid: bookid,
        chapternumber: 0,  
        user: Meteor.user().username,
        timestamp: new Date(),
        parent: null
           });
            var bookbutter;
            if(bookid){
        bookbutter=Butterfly.findOne({bookid: bookid, chapternumber:0});
        }
        var butterid;
        if(bookbutter){
            butterid=bookbutter._id;
        }
            
            Butterfly.insert({
        chaptertitle: chaptertitle,
        message: tweet,
        bookid: bookid,
        tweetid: tweetid,
        chapternumber: 1,  
        user: Meteor.user().username,
        timestamp: new Date(),
        parent: butterid
           }); 
            
        }
    }
  },
  insertButterfly: function(tweet,chaptertitle,bookid,currentid) {
    if (Meteor.user()) {
        var book= Booklist.findOne({_id:bookid});
        var isbutter;
        if(book){
            isbutter=book.butterfly;
        }
        var currentchapter= Butterfly.findOne({tweetid:currentid});
      var tweetid;
      if(isbutter){  
      tweetid=Tweets.insert({
        chaptertitle: chaptertitle,
        message: tweet,
        bookid: bookid,
        chapternumber: currentchapter.chapternumber+1,  
        user: Meteor.user().username,
        timestamp: new Date()
      });
      Booklist.update({_id:bookid, butterfly:true},{$inc: {chaptercount: 1}});
      
      Bookfollow.update({following:bookid},{$set:{sawnewChapter:false}},{multi:true});        
      
        Butterfly.insert({
        chaptertitle: chaptertitle,
        message: tweet,
        bookid: bookid,
        tweetid: tweetid,
        chapternumber: currentchapter.chapternumber+1,  
        user: Meteor.user().username,
        timestamp: new Date(),
        parent: currentchapter._id
           }); 
      
      }
        
        
    }
  }
    
});