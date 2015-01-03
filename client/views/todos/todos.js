
Template.todos.helpers({
  todos: function(){
     return Todos.find({project:Session.get('active_project'),archived:{$ne:true}});
  }
});

Template.todos.events({
  "click .archive": function(event, template){
    return Meteor.call('archiveTodo',this._id,!this.archived);
  },
  'click .todochecked':function(evt,tmpl){
    return Meteor.call('completeTodo',this._id,!this.completed);
  },
  'click .addtodo':function(evt,tmpl){
    Session.set('adding_todo',true);
  }
});
Template.todoDlg.events({
  'click .saveTodo':function(evt,tmpl){
    var todo = {};
    todo.note = tmpl.find('.todoitem').value;
    todo.project = Session.get('active_project');
    Meteor.call('addTodo',todo);
    Session.set('adding_todo',false);
  },
  'click .closeTodo':function(evt,tmpl){
    Session.set('adding_todo',false);
  }
})
