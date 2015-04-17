Template.calendar.rendered = function(){
  $calendar = $('#projectCalendar');
  var calendar = $calendar.fullCalendar({

    dayClick:function(date,allDay,jsEvent,view){
      var ce = {};
      ce.start = new Date(date);
      ce.end = ce.start;
      ce.color = 'red';
      ce.className = 'todo';
      ce.project = Session.get('active_project');
      ce.title = 'New Milestone';
      ce.owner = Meteor.userId;
      Meteor.call('addCalEvent',ce);
    },
    eventClick:function(calEvent,jsEvent,view){
      Meteor.setTimeout(function(){
        if(calEvent.type === 'milestone'){
          Session.set('eventttype', 'milestone');
        }else{
          Session.set('eventttype', 'hoursworked');
        }
        $('.taskTitle').val(calEvent.type);
        $('.name').val(calEvent.title);
      },750);
      Session.set('editing_calevent',calEvent._id);
    },
    eventDrop:function(reqEvent){
      Meteor.call('updateEventTimes',reqEvent);
    },
    events:function(start,end,callback){
      var calEvents = Calevents.find({project:Session.get('active_project')},{reactive:false}).fetch();
      console.log(calEvents);
      callback(calEvents);
    },
    eventRender:function(evt,ele){
      var bkgrd = 'teal';
      var icon = 'fa-users';
      var addtltext = '';
      if(evt.type === 'hoursworked'){
        bkgrd = 'darkblue';
        icon = 'fa-cog';
        addtltext = ' Hours Worked';
      }
      var html = '<div style="background-color:' + bkgrd;
      html +=';color:white"><i class="fa ' + icon + '"></i>';
      html += evt.title + addtltext + '</div>';
      ele.html(html);
    },
    header:{
      left:'title',
      center:'today',
      right:'prev,next'
    },
    contentHeight:200,
    theme:false,
    defaultView:'basicWeek',
    selectable:true,
    selectHelper:true,
    editable:true,
    weekMode:'liquid'
  }).data().fullCalendar;
  Deps.autorun(function(){
    Calevents.find({}).fetch();
    if(calendar){
      calendar.refetchEvents();
    }
  })
}
Template.caltask.events({
  'click .closeTask':function(evt,tmpl){
    Session.set('editing_calevent',null);
  },
  'click .deleteCalTask':function(evt,tmpl){
    Meteor.call('removeCalEvent',Session.get('editing_calevent'));
    Session.set('editing_calevent',null);
  },
  'click .saveCalTask':function(evt,tmpl){
    var type = tmpl.find('.taskTitle').value;
    if(tmpl.find('.name')){
      var name = tmpl.find('.name').value;
      var calevent = {};
      calevent._id = Session.get('editing_calevent');
      calevent.title = name;
      calevent.type = type;
      calevent.project = Session.get('active_project');
      Meteor.call('updateCalEvent',calevent);
    }
    Session.set('editing_calevent',null);
  },
  'change .taskTitle':function(evt,tmpl){
    var typeselected = evt.target.value;
    Session.set('eventttype', typeselected);
  }
})
Template.caltask.helpers({
  editing_calevent: function () {
    return Session.get('editing_calevent');
  },
  evttype_milestone: function () {
    console.log('evttypemilestone',Session.equals('eventttype', 'milestone'));
    return Session.equals('eventttype', 'milestone');
  },
  evttype_hoursworked: function () {
    console.log('evttypehoursworked',Session.equals('eventttype', 'hoursworked'));
    return Session.equals('eventttype', 'hoursworked');
  }
});
