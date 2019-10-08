var builder = require("botbuilder");
var restify = require("restify");

var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function() {
  console.log("%s listening to %s", server.name, server.url);
});

var connector = new builder.ChatConnector();

server.post("/api/messages", connector.listen());

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
      "Your booking is done.Plz find the details \n Name:" + session.userData.name +'\t'+session.userData.age
    );
  }
]);
