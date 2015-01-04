Template.projectPanelHeading.helpers({
  editing_projectname: function () {
    return Session.get('editing_projectname');
  },
  editing_projectcustomer: function () {
    return Session.get('editing_projectcustomer');
  },
  editing_datedue: function () {
    return Session.get('editing_datedue');
  },
  customer: function () {
    var cust = Customers.findOne({_id: this.customer});
    if (cust && cust.name) {
      return cust;
    }
    return '';
  },
  customers: function () {
    return Customers.find();
  },
  isSelected: function (parent) {
    return this._id === parent.customer;
  }
})
Template.projectPanelHeading.events({
  'click .projectNameEdit': function (evt, tmpl) {
    Session.set('editing_projectname', true);
    Meteor.setTimeout(function () {
      $('.form-control.projectName').focus().select();
    }, 250);
  },
  'click .projectCustomerEdit': function (evt, tmpl) {
    Session.set('editing_projectcustomer', true);
    Meteor.setTimeout(function () {
      $('.form-control.projectCustomer').focus().select();
    }, 250);
  },
  'click .projectDateDue': function (evt, tmpl) {
    Session.set('editing_datedue', true);
    Meteor.setTimeout(function () {
      $('.dateDue').datepicker({
        onSelect: function (dateText) {
          Meteor.call('updateProjectDate', Session.get('active_project'), dateText);
          Session.set('editing_datedue', false);
        }
      });
    }, 1000)
  },

  'blur .customer': function (evt, tmpl) {
    Session.set('editing_projectcustomer', false);
  },
  'blur .projectName': function (evt, tmpl) {
    Session.set('editing_projectname', false);
  },
  'change .customer': function (evt, tmpl) {
    if (evt.target.value !== this.customer) {
      Meteor.call('updateProjectCustomer', Session.get('active_project'), evt.target.value);
      Session.set('editing_projectcustomer', false);
    }
  },
  'keyup .projectName': function (event, tmpl) {
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      var ele = tmpl.find('.projectName');
      Meteor.call('updateProjectName', this._id, ele.value);
      Session.set('editing_projectname', false);
    }
  }
});
