Template.activity.helpers({
  calevents:function(){
    return Calevents.find({project:Session.get('active_project')},
  {reactive:true,sort:{start:'ascending'}})
  }
})
