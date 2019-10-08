var builder = require("botbuilder");
var restify = require("restify");

const processIntents = require("./luisApiBot");

var server = restify.createServer();
server.listen(process.env.PORT || process.env.port || 3978, function() {
  console.log("%s listening to %s", server.name, server.url);
});

var connecter = new builder.ChatConnector();

server.post("/api/messages", connecter.listen());

server.get("/", function(req, res) {
  res.writeHead(200, { "content-type": "text/html" });
  res.end("<p>Server Working!!</p>");
});

var inMemoryStorage = new builder.MemoryBotStorage();
var bot = new builder.UniversalBot(connecter).set("storage", inMemoryStorage);
processIntents.processinput(bot);
