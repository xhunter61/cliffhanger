globalDep = new Tracker.Dependency();
import Quill from 'quill';
var chapterquill;
Template.bookprofilenew.helpers({
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
        console.log(true);
        Session.set('showButterBox',true);
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
     Session.set('chapterchanged',true);
     
     
    if(ismybook>0){
        EditMode=false;
        return true;   
    }else{
        EditMode=false;
        return false;   
    }
     
  },
    'isfollowing': function () {
        var isfollowingbook = Bookfollow.find({
            followername: Meteor.user().username,
            following: Router.current().params._id
        }, {
            sort: {
                timestamp: -1
            },
            limit: 50
        }).count();
        if (isfollowingbook == 1) {
            return 'btn btn-info';
        } else {
            return 'btn btn-default';
        }
    },
  'followIcon': function(){
    var isfollowingbook= Bookfollow.find({followername:Meteor.user().username, following: Router.current().params._id}, { sort: {timestamp: -1}, limit: 50 }).count();
    if(isfollowingbook==1){
        return '<i class="fa fa-check-circle fa-2x" aria-hidden="false" title="following"></i>';
    }else{
        return '<i class="fa fa-bookmark fa-2x" aria-hidden="true" title="follow"></i>';
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
   },
    'bookChapters': function () {
        return Tweets.find({
            bookid: Router.current().params._id
        }, {
            sort: {
                timestamp: 1
            },
            limit: 2500
        });
    }
    
});

Template.bookprofilenew.onCreated(function() {
  if (Meteor.user()) {
    this.subscribe('tweets', Meteor.user().username);
    this.subscribe('ownTweets', Meteor.user().username);
    this.subscribe('bookChapters', Router.current().params._id);
    this.subscribe('ownBooks', Meteor.user().username);
    this.subscribe('bookfollow', Meteor.user().username);
    this.subscribe('followingBooks', Meteor.user().username);
    this.subscribe('Comments', Meteor.user().username);
      this.subscribe('Ratings', Meteor.user().username);
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

Template.bookprofilenew.onRendered(function() {
     
    this.autorun(function(){
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "#2E425D";
        
        $(".promptshadow").parent().find(".chapteractive").removeClass("chapteractive");
        
        $("#"+Router.current().params.chapterid).addClass("chapteractive");
        
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
        
        if(Session.get("chapterchanged")==true){
                        var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{
                    'header': 1
                }, {
                    'header': 2
                }], // custom button values
  [{
                    'list': 'ordered'
                }, {
                    'list': 'bullet'
                }],
  [{
                    'script': 'sub'
                }, {
                    'script': 'super'
                }], // superscript/subscript
  [{
                    'indent': '-1'
                }, {
                    'indent': '+1'
                }], // outdent/indent
  [{
                    'direction': 'rtl'
                }], // text direction

  [{
                    'size': ['small', false, 'large', 'huge']
                }], // custom dropdown
  [{
                    'header': [1, 2, 3, 4, 5, 6, false]
                }],

  [{
                    'color': []
                }, {
                    'background': []
                }], // dropdown with defaults from theme
  [{
                    'font': []
                }],
  [{
                    'align': []
                }],

  ['clean'] // remove formatting button
];
            chapterquill = new Quill('#chapterquill', {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'bubble'
            });
            console.log("chapterchanged");
            chapterquill.enable(false);
            var message=Tweets.findOne({_id:Router.current().params.chapterid}, {});
            if(message){
                var delta= message.message;
                chapterquill.setContents(delta);
                console.log(delta);
            }
        }
        Session.set("chapterchanged",false);
        
        $(document).ready(function () {
            
            $('[data-toggle="tooltip"]').tooltip();


        });
        
        
    });
    

});


Template.bookprofilenew.events({

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
            console.log("editmode disabled");
            $('#editbook').addClass('btn-default');
            $('#editbook').removeClass('btn-danger');
            localStorage.setItem('EditMode','0');
            Session.setPersistent('EditMode',0);
            var newtitle= $('#titleedit').val();
            var newmessage=chapterquill.getContents();
            var visibility = $('#visibilityedit').text();
            console.log(newtitle+ "  "+newmessage);
            chapterquill.enable(false);
            Meteor.call('EditChapterTitle',Router.current().params.chapterid,newtitle);
            Meteor.call('EditChapterMessage',Router.current().params.chapterid,newmessage);
          Meteor.call('EditChapterVisibility',Router.current().params.chapterid,visibility);  
        }else{
            console.log("editmode enabled");
            $('#editbook').addClass('btn-danger');
            $('#editbook').removeClass('btn-default');
            $('[data-toggle="tooltip"]').tooltip();
            chapterquill.enable(true);
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