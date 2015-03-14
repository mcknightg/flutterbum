Meteor.startup(function() {

  AccountsEntry.config({
    signupCode: null
  });
  Accounts.onCreateUser( function (options, user) {
        if (options.profile) user.profile = options.profile;
        user.username = options.email;
        return user;
    });
});
