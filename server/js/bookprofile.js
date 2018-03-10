Meteor.methods({  
  'followBook': function(bookid) {
    Bookfollow.insert({
      followername: Meteor.user().username,
      userid: Meteor.userId(),    
      following: bookid,
      sawnewChapter: true,
      bookmark:1,
    });

  },
  'unfollowBook': function(bookid){
      Bookfollow.remove({_id:bookid});
      
  },
  'markasNotified': function(bookid){
      Bookfollow.update({
         followername: Meteor.user().username,
         following: bookid,
         sawnewChapter: false},
                        {$set: {sawnewChapter:true}})
  },
  'incViewNumber': function(bookid){
      Booklist.update({_id: bookid},{$inc: {viewercount:1}})
  },
  'removeChapter': function(chapterid){
      var chapter= Tweets.findOne({_id:chapterid,user: Meteor.user().username});
      if(chapter){
        var delchapternumber= chapter.chapternumber;
        Tweets.update({bookid:chapter.bookid,user:Meteor.user().username,chapternumber:{$gt:delchapternumber}},{$inc: {chapternumber: -1}},{multi:true});
          
          Booklist.update({_id:chapter.bookid},{$inc: {chaptercount: -1}});
          
          Tweets.remove({_id:chapterid});
          
          
      }
      
  },
  'deleteBook': function(bookid){
      if(Booklist.find({_id:bookid,user:Meteor.user().username}).count()>0){
      Bookfollow.remove({following:bookid},{multi:true});
      Tweets.remove({bookid:bookid},{multi:true});
      Booklist.remove({_id:bookid});
          
      }
      
  },
  'rateBook': function(bookid,rating){
      if(Ratings.find({bookid:bookid,user:Meteor.user().username}).count()==0){
      Ratings.insert({bookid: bookid,user: Meteor.user().username,rating: rating});
      var ratings= Ratings.find({bookid:bookid});
      var count= ratings.count();
      var sum =0;
        _.forEach(ratings.fetch(),function(item){
         console.log(item.rating);
         sum+=parseFloat(item.rating);
        }) ;
          
      var avgrating= sum/count;
          console.log("--------");
          console.log("sum: "+sum);
          console.log("count: "+count);
          console.log(avgrating);
          
      var avground=Math.round(avgrating*2)/2;        
      Booklist.update({_id:bookid},{$set: {rating:avground}});
      
          
      }
      
  },
  'updateBookTitle': function(bookid,title){
      Booklist.update({_id:bookid,user:Meteor.user().username},{$set:{booktitle:title}});
      
  },
  'updateBookSummary': function(bookid,summary){
      Booklist.update({_id:bookid,user:Meteor.user().username},{$set:{summary:summary}});
      
  }
});