Template.customers.helpers({
  customers: function () {
    return Customers.find();
  }
});


Template.customers.events({
  'keyup .customername': function(event,tmpl) {
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
      Meteor.call('addCustomer',tmpl.find('.customername').value);
      var ele =  tmpl.find('.customername');
      ele.value = '';
      ele.focus();
    }
  },
  'click .editCustomerName':function(evt,tmpl){
    Session.set('editing_customername',this._id);
    Meteor.setTimeout(function(){
      $('.form-control.name').focus().select();
    },250);

  },
  'click .editCustomerPhone':function(evt,tmpl){
    Session.set('editing_customerphone',this._id);
    Meteor.setTimeout(function(){
      $('.form-control.phone').focus().select();
    },250);

  },
  'click .editCustomerContact':function(evt,tmpl){
    Session.set('editing_customercontact',this._id);
    Meteor.setTimeout(function(){
      $('.form-control.contact').focus().select();
    },250);

  }
});
Template.customer.helpers({
  editingCustomername:function(){
    return Session.equals('editing_customername',this._id);
  },
  editingCustomerphone:function(){
    return Session.equals('editing_customerphone',this._id);
  },
  editingCustomercontact:function(){
    return Session.equals('editing_customercontact',this._id);
  }
})
Template.customer.events({
  'click .delcustomer': function () {
    Meteor.call('removeCustomer', this._id);
  },
  'blur .name': function(event,tmpl) {
    Session.set('editing_customername',null);
  },
  'blur .phone': function(event,tmpl) {

    Session.set('editing_customerphone',null);
  },
  'blur .contact': function(event,tmpl) {
    Session.set('editing_customercontact',null);
  },
  'keyup .name': function(event,tmpl) {
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      var ele =  tmpl.find('.name');
      Meteor.call('updateCustomerName',this._id,ele.value);
      Session.set('editing_customername',null);
    }
  },
  'keyup .phone':function(event,tmpl){
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      var ele =  tmpl.find('.phone');
      Meteor.call('updateCustomerPhone',this._id,ele.value.replace('(','').replace(')',''));
      Session.set('editing_customerphone',null);
    }
  },
  'keyup .contact':function(event,tmpl){
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      var ele =  tmpl.find('.contact');
      Meteor.call('updateCustomerContact',this._id,ele.value);
      Session.set('editing_customercontact',null);
    }
  }
});
