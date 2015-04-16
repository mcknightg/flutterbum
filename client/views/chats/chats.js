Template.chats.helpers({
  'editing_project':function(){
    return Session.get('editing_project');
  },
  chats:function(){
    var flitList = Chats.find({},{sort:{date:-1},limit:20}).fetch();
    var flitArray = [];
    for(var i = 0;i < flitList.length;i++){

      flitArray.push(flitList[i]);
    }
    return flitList.reverse();
  }

});
Template.chat.helpers({
  ownerName:function(){

    var owner = Meteor.users.findOne({_id:this.owner});
    if(owner && owner.profile){
      return owner.profile.firstName + " " + owner.profile.lastName;
    } else{
      return 'unknown';
    }

  }
});
Template.chats.rendered = function(){
  scrollToBottom();
};
Template.chats.events({
  'keyup .flitEdit':function(evt,tmpl){
    if (event.which === 27 || event.which === 13) {
      sendChat(tmpl);
    }
  },
  'click .clearChat':function(){
    return Meteor.call('removeChats');
  },
  'click .saveChat':function(evt,tmpl){
    sendChat(tmpl);
  }
});
function sendChat(tmpl){
  var ele =  tmpl.find('.flitEdit');
  if(ele.value !== ''){
    Meteor.call('addChat',{date:new Date,owner:Meteor.userId(),note:ele.value});
    ele.value = '';
    ele.focus();
    scrollToBottom();
  }
}
function scrollToBottom(){
  $('.notes').scrollTop($('.notes')[0].scrollHeight);
}
