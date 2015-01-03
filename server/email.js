Meteor.startup(function() {

  Meteor.Mailgun.config({
    username: 'postmaster@domain.com',
    password: 'password-goes-here'
  });
  if(Customers.find().count() < 1){
    return Customers.insert({name:'House Account'});
  }
  Meteor.methods({
    'sendContactEmail': function(name, email, message) {
      this.unblock();

      Meteor.Mailgun.send({
        to: 'recipient@example.com',
        from: name + ' <' + email + '>',
        subject: 'New Contact Form Message',
        text: message,
        html: Handlebars.templates['contactEmail']({siteURL: Meteor.absoluteUrl(), fromName: name, fromEmail: email, message: message})
      });
    },
    'saveProject':function(project){
      check(project.name,String);
      project.userId = Meteor.userId();
      project.dateentered = new Date();
      project.lastupdate = new Date();
      if(!project.datedue){
        project.datedue = new Date();
      }
      if(!project.customer){
        project.customer = Customers.findOne({})._id;
      }
      project.invited = [];
      return Projects.insert(project);
    },
    'removeProject':function(id){
      return Projects.remove({_id:id});
    },
    'addCalEvent': function (calevent) {
      if (!calevent.type) {
        calevent.type = 'milestone';
      }
      return Calevents.insert(calevent);
    },
    'updateCalEvent':function(calevent){
      return Calevents.update({_id:calevent._id},{
        $set:{
          title:calevent.title,
          project:calevent.project,
          type:calevent.type
        }
      })
    },
    'updateEventTimes':function(calEvent){
      return Calevents.update({_id:calEvent._id},{
        $set:{
          title:calEvent.title,
          start:calEvent.start,
          end:calEvent.end
        }
      })
    },
    'removeCalEvent':function(id){
      return Calevents.remove({_id:id});
    },
    'addConversation':function(conversation){
      return Conversations.insert(conversation);
    },
    'archiveConversation':function(id,archived){
      Conversations.update({_id:id},{$set:{archived:archived}});
    },
    'archiveTodo':function(id,archived){
      Todos.update({_id:id},{$set:{archived:archived}});
    },
    'completeTodo':function(id,complete){
      Todos.update({_id:id},{$set:{completed:complete}});
    },
    'addTodo':function(todo){
      todo.userId = Meteor.userId();
      todo.dateadded = new Date();
      todo.archived = false;
      todo.completed = false;
      return Todos.insert(todo);
    },
    'inviteUser':function(projectid,userId){
      var project = Projects.findOne({_id:projectid});
      if(!project || project.userId !== this.userId){
        throw new Meteor.Error(404,"No Such Project !");
      }
      if(userId !== project.userId && !_.contains(project.invited,userId)){
        Projects.update(projectid,{$addToSet:{invited:userId}});
      }
    },
    'removeInvite':function(projectid,userId){
      var project = Projects.findOne({_id:projectid});
      if(!project || project.userId !== this.userId){
        throw new Meteor.Error(404,"No Such Project !");
      }
      Projects.update(projectid,{$pull:{invited:userId}});
    }
  });
});
