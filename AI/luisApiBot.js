var builder = require("botbuilder");

module.exports = {
  processinput: function(bot) {
    var endpoint = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/";
    var luisAppId = "e964c1e8-82d0-41f5-a4cc-774f539fd8b6";
    var endpointKey = "df6ee56d7aee4fec8630118422dfc196";

    var queryParams = {
      verbose: true,
      "subscription-key": endpointKey
    };

    var movieList = ["Aladdin", "Pokemon", "Cindrella", "Kung Fu Panda"];

    var luisRequest =
      endpoint + luisAppId + "?" + "subscription-key=" + endpointKey;

    var recognizer = new builder.LuisRecognizer(luisRequest);
    var intents = new builder.IntentDialog({
      recognizers: [recognizer]
    });

    bot.dialog("/", intents);

    intents.matches("Greet", (session, args, next) => {
      session.send(
        "Hello, I am Chitti -The movie ticket booking Robo , How Can I help you today?"
      );
    });

    intents.matches("ShowLatestMovies", (session, args, next) => {
      session.send("Sure, Here is the list of movies currently playing \n\n"+ movieList);;
    });

    intents.matches("ReviewofMovies", (session, args, next) => {
      session.send("Please find the review/rating for the movie");
    });

    intents.matches("BookTicket", (session, args, next) => {
      session.send("How many tickets should I book for the movie?");
    });
    //End of code
  }
};
