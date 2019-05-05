Template.tree.helpers({
    'sub_chapter': function(){
        console.log(Butterfly.find({parent:this.butterid}).count() + ' '+ this.butterid);
        return Butterfly.find({parent:this.butterid});
    },
 'bookEntity': function() {
     //console.log(this.butterid);
    return Booklist.find({_id:Router.current().params._id}, { sort: {timestamp: -1}, limit: 50 });
  },
  'chapterID': function(){
      
   var chapter= Butterfly.findOne({_id: this.butterid});
   if(chapter){
       //console.log(chapter._id);
       return chapter._id;
   }else{
    return "";   
   }
  },
  'chapterTitle': function(){
      
   var chapter= Butterfly.findOne({_id: this.butterid});
   if(chapter){
       return chapter.chaptertitle;
   }else{
    return "";   
   }
  },
  'chapterID2': function(){
      
   var chapter= Butterfly.findOne({_id: this.butterid});
   if(chapter){
       //console.log(chapter._id);
       return chapter.tweetid;
   }else{
    return "";   
   }
  },
  'parent': function(){
      
   var chapter= Butterfly.findOne({parent: this.butterid});
   if(chapter){
       //console.log(chapter._id);
       return chapter.parent;
   }else{
    return "";   
   }
  },
  'MarginGetter': function(){
        //console.log(this.margin);
        var margintext =this.margin+3+" px";
        console.log(this.margin);
        console.log(this.butterid);
        console.log(margintext);
        return margintext;
    },
  'MarginforNext': function(){
        //console.log(this.margin+3);
        
        return this.margin+3;
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
  'chapterNumber': function(){
      
   var chapter= Butterfly.findOne({_id: this.butterid});
   if(chapter){
       return chapter.chapternumber;
   }else{
    return "";   
   }
  },
  'bookID': function(){
    return Router.current().params._id;
  },
 'isRoot': function() {
     //console.log(this.butterid);
    var chapternumber= Butterfly.findOne({_id:this.butterid}, { sort: {timestamp: -1}, limit: 50 });
     if(chapternumber){
         if(chapternumber.chapternumber==0){
             return true;
             console.log(true);
         }else{
          return false;   
         }
     }else{
      return false;   
     }
  },
  'chapterAuthor': function(){
      
   var chapter= Butterfly.findOne({_id: this.butterid});
   if(chapter){
       return chapter.user;
   }else{
    return "";   
   }
  },
  'chapterTime': function(){
      
   var chapter= Butterfly.findOne({_id: this.butterid});
   if(chapter){
       return chapter.timestamp;
   }else{
    return "";   
   }
  }   

});


Template.tree.onCreated(function () {
    if (Meteor.user()) {
        this.subscribe('tweets', Meteor.user().username);
        this.subscribe('ownTweets', Meteor.user().username);
        this.subscribe('bookChapters', Router.current().params._id);
        this.subscribe('bookfollow', Meteor.user().username);
        this.subscribe('followingBooks', Meteor.user().username);
        this.subscribe('bookChaptersAll');
        this.subscribe('hiddenTweets', Meteor.user().username);
        this.subscribe('Books');
        this.subscribe('Ratings');
        this.subscribe('Butterfly');
        Meteor.call('markasNotified', Router.current().params._id);
        Meteor.call('incViewNumber', Router.current().params._id);
        this.autorun(function () {
            var rootChapter = Butterfly.findOne({
                bookid: Router.current().params._id,
                chapternumber: 0
            });
            if (rootChapter) {
                Session.set("bookRoot", rootChapter._id);
                //console.log(Session.get("bookRoot"));
            }
        });


    }
});

Template.tree.onRendered(function () {

    this.autorun(function () {
        var rootChapter = Butterfly.findOne({
            bookid: Router.current().params._id,
            chapternumber: 0
        });
        if (rootChapter) {
            Session.set("bookRoot", rootChapter._id);
            //console.log(Session.get("bookRoot"),);
        }


    });
});