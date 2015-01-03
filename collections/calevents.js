Calevents = new Meteor.Collection("calevents");
Calevents.allow({ 
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
