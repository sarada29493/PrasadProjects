var builder=require('botbuilder');

module.exports = {
    processinput:  function (bot) {
        var endpoint ="https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/";  
        var luisAppId = '56d1cfc2-3e15-4bcc-ba6c-8a4b1b2275e3';
        var endpointKey = '3e513d59b80a44b9b0d2654b53789f0b';
        
        // Create query string 
        var queryParams = {
        "verbose":  true,
        //"q": utterance,
        "subscription-key": endpointKey
        }
        var moviList=["Avengers","JurasicWorld", "Rampage"];
        // append query string to endpoint URL
        var luisRequest =endpoint + luisAppId +'?' +'subscription-key='+ endpointKey; 
          //querystring.stringify(queryParams);
        
        var recognizer= new builder.LuisRecognizer(luisRequest);
        var intents= new builder.IntentDialog({
            recognizers: [recognizer]
        
        });
        bot.dialog('/',intents);
        
        intents.matches("Greet",(session,args,next)=>{
            session.send("Hello, i am ROBO, The movie ticket BOT, How can i help today! ");
        });
        intents.matches("ShowNowPlaying",(session,args,next)=>{
            session.send("Sure, Here is the list of movies currently playing \n\n "+ moviList.join("\n\n"));
        });
        intents.matches("BookTicket",[(session,args,next)=>{
          console.log(JSON.stringify(args));
          var movieTicketEntity=args.entities.filter(x=>x.type=="Movies");
          var NoOfTicketEntity=args.entities.filter(x=>x.type=="builtin.number");
          if(movieTicketEntity.length>0)
          {
              session.userData.movie=movieTicketEntity[0].resolution.values[0];
          }
          else
          {
              delete session.userData.movie;
          }
          if(NoOfTicketEntity.length>0)
          {
              session.userData.NoOfTicketEntity=NoOfTicketEntity[0].resolution.value;
          }
          else
          {
              delete session.userData.NoOfTicketEntity;
          }
          if(!session.userData.movie)
          {
           session.beginDialog('askMovie');
          }
          else{
              next();
          }
          
        },(session,args,next)=>{
            if(!session.userData.NoOfTicketEntity)
          {
           session.beginDialog('askNoOfMovie');
          }
          else{
              next();
          }
        }, (session,args,next)=>{
            session.send("i have booked you "+session.userData.NoOfTicketEntity+" Tickets for " + session.userData.movie +" and enjoy." );
        }
        ]);
        
        bot.dialog('askMovie',[(session,args, next)=>{
            builder.Prompts.choice(session, 'What movie would you like to watch ?',moviList);
        },(session,results)=>{
            session.userData.movie=results.response.entity;
            session.endDialogWithResult(results);
        }
        ]);
        
        bot.dialog('askNoOfMovie',[(session,args, next)=>{
            builder.Prompts.number(session, 'Great! How many tickets would you like to book ?',moviList);
        },(session,results)=>{
            session.userData.NoOfTicketEntity=results.response;
            session.endDialogWithResult(results);
        }
        ]);
    
    }

}