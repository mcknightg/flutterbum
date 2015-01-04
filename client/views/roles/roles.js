Template.roles.helpers({
  userList:function(){
    return Meteor.users.find();
  }
});
Template.roles.events({

});

function addUserToRole(user,role){

}
function removeUserFromRole(user,role){

}
