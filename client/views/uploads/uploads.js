Template.uploads.events({
  'change .myFileInput':function(evt,tmpl){
    FS.Utility.eachFile(evt,function(file){
      var theFile = new FS.File(file);
      theFile.creatorId = Meteor.userId();
      theFile.project = Session.get('active_project');
      Uploads.insert(theFile,function(err,fileObj){
        if(!err){
          //do something if there is no error.
        }
      })
    })
  }
});
Template.uploads.helpers({
  uploads:function(){
    return Uploads.find({project:Session.get('active_project')});
  }
})
