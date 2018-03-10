globalDep = new Tracker.Dependency();

Template.chapter.helpers({
  'tweetMessage': function() {
    return Tweets.find({}, { sort: {timestamp: -1}, limit: 10 });
  },
 'chapterEntity': function() {
    return Tweets.find({_id:Router.current().params.chapterid}, { sort: {timestamp: -1}, limit: 50 });
  },
  'bookEntity': function() {
    return Booklist.find({_id:Router.current().params._id}, { sort: {timestamp: -1}, limit: 2500 });
  },
  'chapterIDbefore': function() {
    var afterchapter;
    var bookchaptercount;
    var book= Booklist.findOne({_id:Router.current().params._id}, { sort: {timestamp: -1}, limit: 1 });
      if(book){
        bookchaptercount= book.chaptercount;   
      }
    var chapter= Tweets.findOne({_id:Router.current().params.chapterid}, { sort: {timestamp: -1}, limit: 1 });
    if(chapter){
     var chapternumber = chapter.chapternumber;
     if(chapternumber==1){
         return ""; 
     }else{
        afterchapter=chapternumber-1;
         chafter= Tweets.findOne({bookid:Router.current().params._id,chapternumber: afterchapter}, { sort: {timestamp: -1}, limit: 1 });
         return chafter._id;
     
     }
    
    }else{
      
    return "";
    }
  },
  'chapterIDafter': function() {
    var afterchapter;
    var bookchaptercount;
    var book= Booklist.findOne({_id:Router.current().params._id}, { sort: {timestamp: -1}, limit: 1 });
      if(book){
        bookchaptercount= book.chaptercount;   
      }
    var chapter= Tweets.findOne({_id:Router.current().params.chapterid}, { sort: {timestamp: -1}, limit: 1 });
    if(chapter){
     var chapternumber = chapter.chapternumber;
     if(chapternumber==bookchaptercount){
         return ""; 
     }else{
        afterchapter=chapternumber+1;
         chafter= Tweets.findOne({bookid:Router.current().params._id,chapternumber: afterchapter}, { sort: {timestamp: -1}, limit: 1 });
         return chafter._id;
     
     }
    
    }else{
      
    return "";
    }
  },
  'hasPreviousChapter': function() {
    var chapter= Tweets.findOne({_id:Router.current().params.chapterid}, { sort: {timestamp: -1}, limit: 1 });
    if(chapter){
     var chapternumber = chapter.chapternumber;
     if(chapternumber==1){
         return "none"; 
     }else{
        return "inline";
     
     }
    
    }else{
     return"";   
    }
  },
  'hasNextChapter': function() {
     var afterchapter;
    var bookchaptercount;
    var book= Booklist.findOne({_id:Router.current().params._id}, { sort: {timestamp: -1}, limit: 1 });
      if(book){
        bookchaptercount= book.chaptercount;   
      }
    var chapter= Tweets.findOne({_id:Router.current().params.chapterid}, { sort: {timestamp: -1}, limit: 1 });
    if(chapter){
     var chapternumber = chapter.chapternumber;
     if(chapternumber==bookchaptercount){
         return "none"; 
     }else{
        return "inline";
     
     }
    
    }else{
        return"";
    }   
    
  },
 'getComments': function() {
    return Comments.find({chapterid:Router.current().params.chapterid}, { sort: {time: -1}, limit: 2500 });
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
 'hasRating': function() {
    if( Ratings.find({bookid:Router.current().params._id,user:Meteor.user().username}).count()==1){
     return true;
    }else{
     return false;   
    }
  },
 'getCommentCount': function() {
    return Comments.find({chapterid:Router.current().params.chapterid}, { sort: {time: -1}, limit: 2500 }).count();
  },
  'IsEditable': function() {
      var ismybook= Booklist.find({_id:Router.current().params._id,user:Meteor.user().username}, { sort: {timestamp: -1}, limit: 50 }).count();
      var isButterandmy= Butterfly.find({tweetid:Router.current().params.chapterid,user:Meteor.user().username}).count();
    if(ismybook>0 || isButterandmy>0){
        Session.set("divloaded",true);
        //console.log("Div loaded");
        return 'editable';   
    }else{
        EditMode=false;
        return '';   
    }
  },
   'isButterfly': function() {
    if(Butterfly.find({tweetid: Router.current().params.chapterid}, { sort: {timestamp: -1}, limit: 10 }).count()==1){
        return true;        
    }else{      
        return false;
    }
  },
    showButterBox(){
        console.log(Session.get('showButterBox'));
        if(Session.get('showButterBox')==true){
            return 'inline';
            
        }else{
            return 'none';
            
        }

         
    },  charCount: function(){
      
      return 25000 - Session.get('numChars');
  },
    
  charClass: function(){
      
      if(Session.get('numChars')>25000){
          return 'errCharCount';
      }else{
          return 'charCount';
      }
  },
     
    
  disableButton: function(){
      
      if((Session.get('numChars')<=0|| Session.get('numChars')>25000 || !Meteor.user()) && Session.get('showTweetBox')==true)        
      {
          return 'disabled'
      }
  },
 'userName': function() {
    var chapter= Butterfly.findOne({tweetid:Router.current().params.chapterid}, { sort: {timestamp: -1}, limit: 50 });
     
     if(chapter){
      return chapter.user;   
     }else{
      return "";   
     }
  },
 'isMyBook': function() {
var ismybook= Booklist.find({_id:Router.current().params._id,user:Meteor.user().username}, { sort: {timestamp: -1}, limit: 50 }).count();
     localStorage.setItem('EditMode','0');
     Session.setPersistent('EditMode',0);
    if(ismybook>0){
        EditMode=false;
        return true;   
    }else{
        EditMode=false;
        return false;   
    }
     
  },
  'followIcon': function(){
    var isfollowingbook= Bookfollow.find({followername:Meteor.user().username, following: Router.current().params._id}, { sort: {timestamp: -1}, limit: 50 }).count();
    if(isfollowingbook==1){
        return '<i class="fa fa-check-circle" aria-hidden="false"></i>';
    }else{
        return '<i class="fa fa-bookmark" aria-hidden="true"></i>';
    }
  },
  'isfollowingText': function(){
    var isfollowingbook= Bookfollow.find({followername:Meteor.user().username, following: Router.current().params._id}, { sort: {timestamp: -1}, limit: 50 }).count();
    if(isfollowingbook==1){
        return 'Following';
    }else{
        return 'Follow';
    }
  },
  'buttontext': function(){
    var isfollowingbook= Bookfollow.find({followername:Meteor.user().username, following: Router.current().params._id}, { sort: {timestamp: -1}, limit: 50 }).count();
    if(Session.get('EditMode')==1){
        return 'Save Changes';
    }else{
        return 'Edit chapter';
    }
  },
   'isEditMode': function(){
    if(Session.get('EditMode')==1){
        return true;
    }else{
        return false;   
    }
   }
    
});

Template.chapter.onCreated(function() {
  if (Meteor.user()) {
    this.subscribe('tweets', Meteor.user().username);
    this.subscribe('ownTweets', Meteor.user().username);
    this.subscribe('bookChapters', Router.current().params._id);
    this.subscribe('ownBooks', Meteor.user().username);
    this.subscribe('bookfollow', Meteor.user().username);
    this.subscribe('followingBooks', Meteor.user().username);
    this.subscribe('Comments', Meteor.user().username);
      this.subscribe('Books');
    Meteor.call('updateBookmark',Router.current().params.chapterid);
    this.autorun(function(){
       // console.log("Chapter "+Router.current().params.chapterid+" created")
        
        if(Session.get("divloaded")==true){
            console.log($('#chaptertitle.editable'));
            $('#chaptertitle.editable').editable({
       mode: 'popup',
        inputclass: 'h1 h1-big',
        success: function(response, newValue){
            console.log("Setting new chaptertitle "+newValue);
            
        }
        
    });
            
        }
        
     $(document).ready(function(){    

     });
        
        
    });
       
  }
});

Template.chapter.onRendered(function() {
     
    this.autorun(function(){
       // console.log("Chapter "+Router.current().params.chapterid+" created")
        
        Meteor.call('updateBookmark',Router.current().params.chapterid);
        if(Session.get("divloaded")==true){
            console.log($('#chaptertitle.editable'));
            $('#chaptertitle.editable').editable({
       mode: 'popup',
        inputclass: 'h1 h1-big',
        unsavedclass:'null',
        success: function(response, newValue){
            console.log("Setting new chaptertitle "+newValue);
            Meteor.call('EditChapterTitle',Router.current().params.chapterid,newValue);
            
        }
        
    });
            Session.set("divloaded",false);
            
            
        $(function(){
        $('#chaptermess').editable({
	    inputclass: 'panel panel-default h3 h3-big ',
       mode: 'inline',
	   rows: 20,
       unsavedclass:'null',
       success: function(response, newValue){
           console.log("setting new chaptermessage:" + newValue);
           Meteor.call('EditChapterMessage',Router.current().params.chapterid,newValue);
       }
            });
        });    
            
        
            
        }
        
        $(document).ready(function(){

        });
        
        
    });
    

});


Template.chapter.events({

  'click #commentbtn': function(){
      var cmnt= $('#comment').val();
      $('#comment').val('');
      Meteor.call('addComment',Router.current().params.chapterid,cmnt);
      
 },
    "click .rating"(event) {
        const rating = $(event.target).val();
        Meteor.call('rateBook',Router.current().params._id,rating);
    },
    "click #butterbutton"(event) {
        if(Session.get('showButterBox') == false || Session.get('showButterBox')==null){
        Session.set('showButterBox',true)
        
        }else{
            var tweet = $('#tweetText-butter').val();
            $('#tweetText-butter').val("");
            $('#tweetbox-butter').css('display','none');
            var chaptertitle= $('#chaptertitle-butter').val();
            $('#chaptertitle-butter').val("");
            Session.set('numChars',0);
                Meteor.call('insertButterfly',tweet,chaptertitle,Router.current().params._id,Router.current().params.chapterid);
            
            Session.set('showButterBox',false)
            
        }
    },
  'input #tweetText-mobile': function(){
   Session.set('numChars', $('#tweetText-butter').val().length);
      
  },  
  'click #follow': function(event) {
    var book= Booklist.find({_id:Router.current().params._id}, { sort: {timestamp: -1}, limit: 50 });
    var isfollowingbook= Bookfollow.findOne({followername:Meteor.user().username, following: Router.current().params._id}, { sort: {timestamp: -1}, limit: 50 });
    if(isfollowingbook){
        console.log("following");
        console.log(isfollowingbook._id);
        if(book){
            Meteor.call('unfollowBook', isfollowingbook._id);
            $('#follow').removeClass('btn-default');    
            $('#follow').addClass('btn-info');
        }
    }else{
        console.log("not following");
       Meteor.call('followBook', Router.current().params._id);
       $('#follow').addClass('btn-default');    
       $('#follow').removeClass('btn-info');    
    }
        
    },
    'click #editbook': function(event){
        if(Session.get('EditMode')==1){
            $('#editbook').addClass('btn-default');
            $('#editbook').removeClass('btn-danger');
            localStorage.setItem('EditMode','0');
            Session.setPersistent('EditMode',0);
            var newtitle= $('#titleedit').val();
            var newmessage=$('#messageedit').val();
            var visibility = $('#visibilityedit').text();
            console.log(newtitle+ "  "+newmessage);
            Meteor.call('EditChapterTitle',Router.current().params.chapterid,newtitle);
            Meteor.call('EditChapterMessage',Router.current().params.chapterid,newmessage);
          Meteor.call('EditChapterVisibility',Router.current().params.chapterid,visibility);  
        }else{
            $('#editbook').addClass('btn-danger');
            $('#editbook').removeClass('btn-default');
            $('[data-toggle="tooltip"]').tooltip();
            localStorage.setItem('EditMode','1');
            Session.setPersistent('EditMode',1);
        }
       
        
    },
    'click .btn': function(event){
        if(event.currentTarget.id!='editbook' && event.currentTarget.id!='follow' && event.currentTarget.id!='delbook'&& event.currentTarget.id!='edittitlebtn' && event.currentTarget.id!='commentbtn' && event.currentTarget.id!='visibilityedit'){
            alert("You are about to delete Chapter "+event.currentTarget.id);
            Meteor.call('removeChapter',event.currentTarget.id);
            localStorage.setItem('EditMode','1');
            Session.setPersistent('EditMode',1);
            
        }else{
            //alert("Edit Button clicked");
        }
       
        
    },
    'click #onlymelistingedit': function(event){
        console.log("test");
        $('#visibilityedit').html("Unlisted");
    },
    'click #followerlistingedit': function(event){
        console.log("test");
        $('#visibilityedit').html("Follower only");
    },
    'click #publiclistingedit': function(event){
        console.log("test");
        $('#visibilityedit').html("Public");
    }
    
    
});