Template.conversationDlg.events({
  "click .saveconversation": function(event, template){
    var text = template.find('#conversationtext').value;
    var conversation = {};
    conversation.username = Meteor.user().username;
    conversation.note = text;
    conversation.dateadded = new Date();
    conversation.project = Session.get('active_project');
    conversation.owner = Meteor.userId();
    Meteor.call('addConversation',conversation);
    Session.set('adding_conversation',false);

  },
  'click .closeconversation':function(evt,tmpl){
    Session.set('adding_conversation',false);
  }
});
