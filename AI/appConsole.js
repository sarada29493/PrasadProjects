var builder = require("botbuilder");

var connector = new builder.ConsoleConnector().listen();

var bot = new builder.UniversalBot(connector, function(session) {
  session.send("Helloooooo");
  session.beginDialog("Start ur booking");
});

bot.dialog("Start ur booking", [
  (session, args, next) => {
    builder.Prompts.text(session, "what's ur name?");
  },
  (session, result) => {
    session.userData.name = result.response;
    builder.Prompts.number(session, "What's ur age");
  },
  (session, result) => {
    session.userData.age = result.response;
    builder.Prompts.choice(session, "What's ur gender", ["Male", "Female"]);
  },
  (session, result) => {
    session.userData.gender = result.response.entity;
    session.send(
      "Your booking is done.Plz find the details" + session.userData.name
    );
  }
]);
