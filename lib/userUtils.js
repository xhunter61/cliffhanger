UserUtils = function() {};    //no var in front

UserUtils.findFollowings = function(username) {  
  var currentFollowings = Relationships.find({
    follower: username
  }).fetch().map(function(data) {
    return data.following;
  });
  currentFollowings.push(Meteor.user().username);

  return currentFollowings;
};