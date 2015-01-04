Template.archives.helpers({
  conversations: function () {
    return Conversations.find({},{sort: {dateadded:1},limit:20});
  },
  todos:function(){
    return Todos.find({},{sort: {dateadded:1},limit:20});
  },
  projects:function(){
    return Projects.find({},{sort: {dateadded:1},limit:20});
  }
});
Template.archives.events({
  'click .unarchiveProject':function(evt,tmpl){
    console.log(this.archived);
    Meteor.call('archiveProject',this._id,!this.archived);
  },
  'click .unarchiveConversation':function(evt,tmpl){
    Meteor.call('archiveConversation',this._id,!this.archived);
  },
  'click .unarchiveTodo':function(evt,tmpl){
    console.log(this.archived);
    Meteor.call('archiveTodo',this._id,!this.archived);
  }
});
Template.archives.rendered= function(){

};
