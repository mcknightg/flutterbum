Meteor.publishComposite("items", function() {
  return {
    find: function() {
      return Items.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});
Meteor.publish('projects',function(userId){
      return Projects.find({$or:[{invited:this.userId},{userId:this.userId}]});
});
Meteor.publish('customers',function(){
    return Customers.find();
});
Meteor.publish('calevents',function(project){
  return Calevents.find({project:project});
});
Meteor.publish('conversations',function(project){
  return Conversations.find({project:project});
});
Meteor.publish('todos',function(project){
  return Todos.find({project:project});
});
Meteor.publish('uploads',function(project){
  return Uploads.find({project:project});
});
Meteor.publish('directory',function(){
  return Meteor.users.find({},{});
});
Meteor.publish('chats',function(){
  return Chats.find({},{});
});
Meteor.publish(null,function(){
  return Meteor.roles.find({});
})
Meteor.publish('archives', function(project){
  return [
  Conversations.find({project:project,archived:true}),
  Todos.find({project:project,archived:true}),
  Projects.find({project:project,archived:true})
  ];
});
