Template.dashboard.rendered = function() {

};
Template.dashboard.events({
  'keyup input[type=text]':function(event,tmpl){
    if(event.which === 27 || event.which === 13){
      event.preventDefault();
      var project = {};
      project.name = tmpl.find('#projectNameEnter').value;
      Meteor.call('saveProject',project);
    }
  },
  'click .deleteConfirmation':function(evt,tmpl){
    evt.preventDefault();
    evt.stopPropagation();
    Session.set('projectToDelete',this._id);
  },
  'click .cancelDelete':function(){
    return Session.set('projectToDelete',null);
  }
});
Template.dashboard.helpers({
  projectToDelete:function(){
    return Session.get('projectToDelete');
  }
})
Template.project.helpers({
  customer: function (customer) {
    var cust = Customers.findOne({_id: this.customer});
    return cust;
  }
})
Template.delconfirm.events({
  'click .deleteConfirmed':function(evt,tmpl){
    Meteor.call('removeProject',Session.get('projectToDelete'));
    Session.set('projectToDelete',null);
  }
})
Template.projectView.helpers({
  editing_calevent:function(){
    return Session.get('editing_calevent');
  },
  adding_conversation:function(){
    return Session.get('adding_conversation');
  },
  adding_todo:function(){
    return Session.get('adding_todo');
  }
})
