Template.followUsers.events({  
  'submit form': function(event) {
    var searchUser = event.target.searchUser.value;
    
    var foundUser = Meteor.call('findUsers', searchUser, function(err, res) {
      if (res) {
          Session.set('foundUsers', res);
           $('#searchresults').css('display','block');
         
      }
        
         
          
        
    });
      
      var cou= Meteor.call('findUsercount',searchUser,function(err, res) {
      if (res) {
             Session.set('userCount',res);
         }
    } );
      
      
    return false;
  },
  'input #searchUser': function(){
     var searchUser = $('#searchUser').val();
    
    var foundUser = Meteor.call('findUsers', searchUser, function(err, res) {
      if (res) {
          Session.set('foundUsers', res);
           $('#searchresults').css('display','block');
         
      }
        
         
          
        
    });
      
      var cou= Meteor.call('findUsercount',searchUser,function(err, res) {
      if (res) {
             Session.set('userCount',res);
         }
    } );
      
      
    return false; 
      
  }
});

Template.followUsers.helpers({  
  'foundUser': function() {
    return Session.get('foundUser');
  },
  'foundUsercount': function(){
    return Session.get("userCount"); 
  }
});

Template.followUsers.events({  
  'click #follow': function() {
    Meteor.call('followUser', Session.get('foundUsers').username);
  }
});

Template.followUsers.helpers({  
  'recommendedUsers': function() {
    if (Meteor.user()) {
      var currentFollowings = UserUtils.findFollowings(Meteor.user().username);

      var recUsers = Meteor.users.find({
        username: {
          $nin: currentFollowings
        }
      }, {
        fields: { 'username': 1 },
        limit: 5
      }).fetch();

      return recUsers;
    }
  },
    
  'foundUsers': function(){
      return Session.get("foundUsers");
      
  }
});

Template.followUsers.events({  
  'click #followRec': function(event) {
    Meteor.call('followUser', this.username);
  }
});

Template.followUsers.onCreated(function() {  
  if (Meteor.user()) {
    this.subscribe('users', Meteor.user().username)
    this.subscribe('followings', Meteor.user().username);
  }
});

Template.followUsers.onRendered(function () {  
  Meteor.call('recommendUsers', function(err, res) {
    Session.set('recommendedUsers', res);
  });
});