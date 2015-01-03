Conversations = new Meteor.Collection("conversations");
Conversations.allow({ 
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
