Session.setDefault('activitySort',1)
Template.activity.helpers({
  calevents:function(){
    var sortorder = Session.get('activitySort');
    return Calevents.find({project:Session.get('active_project')},
  {reactive:true,sort:{start:sortorder}})
},
activitySort:function(){
  var sortorder = Session.get('activitySort');
  if(sortorder === 1){
    return 'ASC';
  } else{
    return 'DESC';
  }
}
})
Template.activity.events({
  "click .activitySort": function(event, template){
     if(Session.get('activitySort') === 1){
       Session.set('activitySort',-1);
     } else{
       Session.set('activitySort',1);
     }
  }
});
