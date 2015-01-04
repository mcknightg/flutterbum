Template.chats.helpers({
  'editing_project':function(){
    return Session.get('editing_project');
  },
  chats:function(){
    var flitList = Chats.find({},{sort:{date:-1},limit:20}).fetch();
    var flitArray = [];
    for(var i = 0;i < flitList.length;i++){
      if(flitList[i].owner){
        var user = Meteor.users.findOne({_id:flitList[i].owner}, {});

        flitList[i].ownerName = user.username;
      }
      flitArray.push(flitList[i]);
    }
    return flitList.reverse();
  }
});

Template.chats.rendered = function(){
  scrollToBottom();
};
Template.chats.events({
  'keyup .flitEdit':function(evt,tmpl){
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      var ele =  tmpl.find('.flitEdit');
      if(ele.value !== ''){
        Meteor.call('addChat',{date:new Date,owner:Meteor.userId(),note:ele.value});
        ele.value = '';
        ele.focus();
        scrollToBottom();
      }

    }
  },
  'click .clearChat':function(){
    return Meteor.call('removeChats');

  }
});
function scrollToBottom(){
  $('.notes').scrollTop($('.notes')[0].scrollHeight);
}
