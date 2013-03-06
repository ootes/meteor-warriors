if (Meteor.isClient) {
  Template.game.greeting = function () {
    return "Welcome to meteor-warriors.";
  };
}
