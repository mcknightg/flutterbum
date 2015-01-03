Template.conversations.helpers({
  conversations:function(){
    return Conversations.find(
    {archived:{$ne:true}},
    {sort:{dateadded:-1}, limit:Session.get('convLimit') || 3}
    )
  }
})
Template.conversations.events({
  'click .addConversation':function(evt,tmpl){
    Session.set('adding_conversation',true);
  }
})
Template.conversation.events({
  'click .archiveConversation':function(evt,tmpl){
    Meteor.call('archiveConversation',this._id,true);
  }
})
