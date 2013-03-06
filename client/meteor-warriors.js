if (Meteor.isClient) {
  Template.game.message = function () {
    return "Welcome to meteor-warriors.";
  };
}
