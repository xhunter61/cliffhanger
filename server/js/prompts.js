Meteor.methods({
  insertPrompt: function(summary,genres) {
    if (Meteor.user()) {
        Prompts.insert({
            summary: summary,
            genre: genres,
            timestamp: new Date(),
            user: Meteor.user().username  
        });
        
    }
  }
    
});