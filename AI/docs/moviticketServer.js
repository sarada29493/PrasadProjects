
var builder=require('botbuilder');
var restify=require('restify');
const processIntents=require('./BOT/luisApiBot');

var server=restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
    console.log('%s listeining to %s',server.name, server.url);
});

var connecter=new builder.ChatConnector(
    // {
    // appId: '28a1b6a8-595e-496b-9633-6ea1aa97811f',
    // appPassword: 'zqoTSOTA63$$$ctadJO483@',
    // }
);
server.post('/api/messages',connecter.listen());
server.get('/', function(req, res){
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
   '<p>Server Working</p>' 
);
});
var inMemoryStorage = new builder.MemoryBotStorage();
var bot=new builder.UniversalBot(connecter).set('storage', inMemoryStorage);
processIntents.processinput(bot);
