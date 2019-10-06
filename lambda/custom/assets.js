
// Response Types:
const InteractionTypes = ["Confirmation","Repeat"]
const challenge = {
    "SKULL_ISLAND":"1",
    "VIRGIN_ISLAND":"2"
  }

  const captainSays = (stuff)=>{
    return "<voice name='Amy'><lang xml:lang='en-AU'> " + stuff + "</lang></voice> ";
  };

  const captainSaysLoudly = (stuff)=>{
    return "<voice name='Russell'><lang xml:lang='en-AU'> <prosody volume='x-loud'>"  + stuff + "</prosody>" + "</lang></voice> ";
  };

  const parrotSays = (stuff)=>{
    return "<voice name='Raveena'><lang xml:lang='en-AU'> "+"<prosody pitch='x-high' rate = 'fast'>"+stuff+" </prosody>"+ "</lang></voice> ";
  };
const levels = {
    "count":2,
    "1":[
      {
        "turn": 1,
        "Captain":
            captainSays("OK sailor.  Here's your first task.  tell the crew, to Raise the anchor.  As you're a newbie, repeat after me, crew raise the anchor"),
        "Answer":['racing:raise:rise:ray:raising','anchor:ankle:enter:car:yanker:inca:Inca:Bianca:bianca'],
        "CorrectResponse":
                    captainSays("Great, you've gotten the crew to raise the anchor"),
        "IncorrectResponse":
                    captainSays("That's not quite right!  Tell the crew to raise the anchor"),
        "ResponseType":"Repeat",
        "STATE":"TUTORIAL",
        "Index":1
      },
      {
        "turn": 2,
        "Captain":
            captainSays("OK sailor.  Here's your second task.  tell the crew to Hoist the sails.  repeat after me, crew Hoist the sails"),
        "Answer":['hoist:horse:horses:voice:voices:what','say:sale:sales:sails:sell:seal:seals'],
        "CorrectResponse":
                    captainSays(
                    "Aye - well done, the sails have been hoisted!"
                    ),
        "IncorrectResponse":
                    captainSays(
                    "How are we going to get going with the sails down!  Tell the crew to hoist the sails"
                    ),
        "ResponseType":"Repeat",
        "STATE":"TUTORIAL",
        "Index":2
      },
      {
        "turn": 3,
        "Captain":
                    captainSays(
                    "Here's your third task.  tell the crew to set sail.  Repeat after me, crew set sail"
                    ),
        "Answer":['set:sit','sail:sale:snail:says:say'],
        "CorrectResponse":
                    captainSays(
                    "OK - we're sailing away!"
                    ),
        "IncorrectResponse":
                    captainSays(
                    "Come on land lover, tell the crew to set sail!"
                    ),
        "ResponseType":"Repeat",
        "STATE":"TUTORIAL",
        "Index":0
      }
    ],
    "2":[
      {
        "turn": 1,
        "Captain":captainSays(
            "<s>The crew think I know the way...</s>"
            +"<s>If <emphasis level='strong'>they</emphasis>know I have the map, "
            +"they’ll <emphasis level='moderate'>kill</emphasis> us!</s><break strength='strong'/> "
            +"<s>We’ll practice now up here, "
            +"<prosody volume='x-soft'>but when the time comes,</prosody> "
            +"I’ll look at the map below, shout directions up to you.</s> "
            +"<break time='3s'/> "
            +"<s>Right....</s> "
            +"<s>Repeat after me LOUDLY!</s> "
        )
        + captainSaysLoudly("EAST")
        + parrotSays("SOUTH WEST")
        + captainSaysLoudly("NORTH")
        + parrotSays("WEST!")
        + captainSaysLoudly("NORTH")
        + parrotSays("NORTH!"),
        "Answer":"east north north",
        "CorrectResponse":captainSays("OK - the plan will work!"),
        "IncorrectResponse":captainSays("We’re doomed! Repeat what I said and we’ll get there in one piece!"),
        "ResponseType":"Repeat",
        "STATE":"COORDINATES",
        "Index":1
      },
      {
        "turn": 2,
        "Captain":
                    captainSays("We're still not out of the woods. Repeat to the crew west")+
                    parrotSays("SOUTH!")+
                    captainSays("WEST ")+
                    captainSays("WEST ")+
                    parrotSays("North")+
                    captainSays("SOUTH SOUTH"),
        "Answer":"west west south south",
        "CorrectResponse":
                    captainSays(
                    "Again - the plan will work!"
                    ),
        "IncorrectResponse":captainSays(
                    "Again, we’re doomed! Repeat what I said and we’ll get there in one piece!"
        ),
        "ResponseType":"Repeat",
        "STATE":"COORDINATES",
        "Index":2
      },
      {
        "turn": 3,
        "Captain":"<audio src='soundbank://soundlibrary/boats_ships/wood_boat/wood_boat_01'/> "
                +captainSays("land ahoy. you've made it to skull island!"
                ),
        "Answer":"COMPLETE",
        "ResponseType":"Repeat",
        "STATE":"COORDINATES",
        "Index":0
      }
    ]
  };
const sounds = {
    waves : "",
    anchor : "",
    sails : "",
    woodCreekin : ""
}


module.exports = {
    InteractionTypes:InteractionTypes,
    levels:levels,
    challenge:challenge,
    sounds:sounds
}
