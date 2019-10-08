
var builder=require('botbuilder');
var restify=require('restify');

var server=restify.createServer();

var connecter=new builder.ConsoleConnector().listen();
var bot=new builder.UniversalBot(connecter,function(session){
    session.send("Hello there! How can i help u today!");
    session.beginDialog('setAppointment');
});
bot.dialog("setAppointment",[(session,args,next)=>{
    builder.Prompts.text(session,"Whats your Name?");
},(session,result)=>{
    session.userData.name=result.response;
    builder.Prompts.number(session,"Great! Whats your Age?");
}, (session,result)=>{
    session.userData.age=result.response;
    builder.Prompts.choice(session,"ok! Whats your Gender?",["Male","Female"]);
},(session,result)=>{
    session.userData.sex=result.response.entity;
    builder.Prompts.time(session,"ok! Appint ment time");
},
(session,result)=>{
    session.userData.dateTime=builder.EntityRecognizer.resolveTime([result.response]);;
    session.send("Ya!,  We have booked your appointment at "+  session.userData.dateTime);
    session.send("Thanks for your Time." + session.userData.name);
}
])