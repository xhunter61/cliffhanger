Meteor.methods({
    'setUserRole': function(userid) {
        Roles.addUsersToRoles(userid, ['user','can-write']);
      //  Roles.addUsersToRoles("smZc7sNWEHdkPKE4w", ['admin','user','can-write']);
        console.log("Setting user role for "+userid);
    }


});