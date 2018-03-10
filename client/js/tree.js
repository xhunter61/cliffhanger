Template.tree.helpers({
    'sub_chapter': function(){
        console.log(Butterfly.find({parent:this.butterid}).count());
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
  'MarginGetter': function(){
        //console.log(this.margin);
        var newmargin =(this.margin+3);
        return newmargin;
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