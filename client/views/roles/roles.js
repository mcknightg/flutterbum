Template.roles.helpers({
  userList:function(){
    return Meteor.users.find();
  }
})
