Meteor.startup(function() {

  AccountsEntry.config({
    signupCode: null
  });
  Accounts.onCreateUser( function (options, user) {
        if (options.profile) user.profile = options.profile;
        user.name = options.email;
        return user;
    });
});
