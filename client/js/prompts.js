Template.prompts.onRendered(function() {
    Session.set('genres', []);
});

Template.prompts.helpers({
  'getPrompts': function() {
    return Prompts.find({}, { sort: {timestamp: -1}, limit: 1000 });
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
 }
});

Template.prompts.events({
    'change [name="genreselect"]': function(){
        console.log("changing");
             var selected = $('[name="filtergenre"]').find("option:selected");
     var genres = [];
     selected.each(function(){
       genres.push($(this).val());
     });
     Session.set("genres",genres);
    },
    "click #submitprompt"(event) {
        var promptsummary = $('#promptsummary').val();
        $('#promptsummary').val("");
        var selected = $('[name="genreselect"]').find("option:selected");
        var genres = [];
        selected.each(function(){
            genres.push($(this).val());
        });
        console.log("clicked"+promptsummary+"  "+genres);
        Meteor.call('insertPrompt',promptsummary,genres);
        genres = [];
        $('[name="genreselect"]').multiselect('deselectAll', false);
        $('[name="genreselect"]').multiselect('updateButtonText');
    }
    
});

Template.prompts.onCreated(function() {
  if (Meteor.user()) {
    this.subscribe('tweets', Meteor.user().username);
    this.subscribe('ownTweets', Meteor.user().username);
    this.subscribe('ownBooks', Meteor.user().username);
    this.subscribe('bookfollow', Meteor.user().username);
      this.subscribe('Books');
      this.subscribe('Prompts');
      this.subscribe('bookChapters', Router.current().params._id);
      this.subscribe('followingBooks', Meteor.user().username);
  }
});