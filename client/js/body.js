Template.body.helpers({
    showTweetBox(){
        console.log(Session.get('showTweetBox'));
        console.log($('#togglebutton-mobile').prop('checked',false));
        return Session.get('showTweetBox');   
         
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
  'getBestBookChapter': function(){
    var book= Booklist.findOne({}, { sort: {rating: -1}, limit: 1 });
    if(book!=null){
     return  Tweets.find({bookid: book._id},{ sort: {chapternumber: 1}, limit: 1 }); 
  
        
    }else{
     return "";   
    }
  },    
  'bookEntity': function() {
      if(Meteor.user()!=null){
    if(Meteor.user().username!=null){  
    return Booklist.find({user: Meteor.user().username}, { sort: {timestamp: -1}, limit: 25 });
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

Template.body.onCreated( function() {  

    this.subscribe('Tweets');

    this.subscribe('Books');  

  
});


Template.body.events({
    "click #toggleBoxMobile"(event) {
        if(Session.get('showTweetBox') == false || Session.get('showTweetBox')==null){
        Session.set('showTweetBox',true)
        
        }else{
            if($('#tweetText-mobile').val()!=''){
            var tweet = $('#tweetText-mobile').val();
            $('#tweetText-mobile').val("");
            $('#tweetbox-mobile').css('display','none');
            if($('#newbookcheck-mobile').is(':checked')){
                var booktitle= $('#booktitle-mobile').val();
                $('#booktitle-mobile').val("");
                var coverlink= $('#coverlink-mobile').val();
                if(coverlink==""){
                    coverlink="/defaultcover.png";   
                }
                $('#coverlink-mobile').val("");
                var chaptertitle= $('#chaptertitle-mobile').val();
                $('#chaptertitle-mobile').val("");
                var selected = $('[name="myMultiselect"]').find("option:selected");
     var genres = [];
     selected.each(function(){
       genres.push($(this).val());
     });
        console.log(genres);
      var butterfly =$('#togglebutton-mobile').is(':checked');
      var booksummary = $('#summaryBook-mobile').val();
                Meteor.call('insertBook',booktitle,coverlink,tweet,chaptertitle,butterfly,booksummary,genres,"");
        genres = [];
                Session.set('numChars',0);
            }else{
                var title= $('#sel1-mobile').val();
                var chaptertitle= $('#chaptertitle-mobile').val();
                $('#chaptertitle-mobile').val("");
                Session.set('numChars',0);
                Meteor.call('insertTweet',tweet,title,chaptertitle);
            }
            Session.set('showTweetBox',false)
            }else{
             alert("Chapter is empty");   
            }
            
        }
    },
  'input #tweetText-mobile': function(){
   Session.set('numChars', $('#tweetText-mobile').val().length);
      
  },
    'click #closebutton-mobile'(event){
        Session.set('showTweetBox',false)
     $('#tweetbox-mobile').css('display','none');   
        
    }
});