
// Response Types:
const InteractionTypes = ["Confirmation","Repeat"]
const challenge = {
    "SKULL_ISLAND":"1",
    "VIRGIN_ISLAND":"2"
  }

const levels = {
    "count":2,
    "1":[
      {
        "turn": 1,
        "Captain":
                    "<voice name='Russell'><lang xml:lang='en-AU'> "
                    + "OK sailor.  Here's your first task.  tell the crew, to Raise the anchor.  As you're a newbie, repeat after me, crew raise the anchor"
                    + "</lang></voice> ",
        "Answer":['racing:raise:rise:ray:raising','anchor:ankle:enter:car:yanker:inca'],
        "CorrectResponse":
                    "<voice name='Russell'><lang xml:lang='en-AU'> "
                    +"Great, you've gotten the crew to raise the anchor"+"</lang></voice> ",
        "IncorrectResponse":
                    "<voice name='Russell'><lang xml:lang='en-AU'> "
                    +"That's not quite right!  Tell the crew to raise the anchor"
                    +"</lang></voice> ",
        "ResponseType":"Repeat",
        "STATE":"TUTORIAL",
        "Index":1
      },
      {
        "turn": 2,
        "Captain":
                    "<voice name='Russell'><lang xml:lang='en-AU'> "
                    +"OK sailor.  Here's your second task.  tell the crew to Hoist the sails.  repeat after me, crew Hoist the sails"
                    + "</lang></voice> ",
        "Answer":['hoist:horse:horses:voice:voices:what','say:sale:sales:sails:sell:seal:seals'],
        "CorrectResponse":
                    "<voice name='Russell'><lang xml:lang='en-AU'> "+
                    "Aye - well done, the sails have been hoisted!"+
                    "</lang></voice> ",
        "IncorrectResponse":
                    "<voice name='Russell'><lang xml:lang='en-AU'> "+
                    "How are we going to get going with the sails down!  Tell the crew to hoist the sails"+
                    "</lang></voice> ",
        "ResponseType":"Repeat",
        "STATE":"TUTORIAL",
        "Index":2
      },
      {
        "turn": 3,
        "Captain":
                    "<voice name='Russell'><lang xml:lang='en-AU'> "
                    +"Here's your third task.  tell the crew to set sail.  Repeat after me, crew set sail"
                    + "</lang></voice> ",
        "Answer":['set:sit','sail:sale:snail:says:say'],
        "CorrectResponse":
                    "<voice name='Russell'><lang xml:lang='en-AU'> "+
                    "OK - we're sailing away!"+
                    "</lang></voice> ",
        "IncorrectResponse":
                    "<voice name='Russell'><lang xml:lang='en-AU'> "+
                    "Come on man, tell the crew to set sail!"+
                    "</lang></voice> ",
        "ResponseType":"Repeat",
        "STATE":"TUTORIAL",
        "Index":0
      }
    ],
    "2":[
      {
        "turn": 1,
        "Captain":"<voice name='Russell'><lang xml:lang='en-AU'> "
        + "<s>The crew think I know the way...</s> "
        + "<s>If <emphasis level='strong'>they</emphasis>know I have the map, "
        + "they’ll <emphasis level='moderate'>kill</emphasis> us!</s><break strength='strong'/> "
        + "<s>We’ll practice now up here, "
        + "<prosody volume='x-soft'>but when the time comes,</prosody> "
        + "I’ll look at the map below, shout directions up to you.</s> "
        + "<break time='3s'/> "
        + "<s>Right....</s> "
        + "<s>Repeat after me LOUDLY!</s> "
        + "<prosody volume='x-loud'> "
        + "<s>NORTH!</s> "
        + "<prosody pitch='x-high'> EAST! </prosody> </lang></voice>"
        + "<prosody pitch='x-high'> WEST! </prosody> </lang></voice>""
        + "<s>EAST!</s> "
        + "<s>EAST!</s></prosody> "
        + "<prosody pitch='x-high'> SOUTH! </prosody> </lang></voice>"
        + "</lang></voice> ",
        "Answer":"north east east",
        "CorrectResponse":"<voice name='Russell'><lang xml:lang='en-AU'> "+"OK - the plan will work!"+"</lang></voice> ",
        "IncorrectResponse":"<voice name='Russell'><lang xml:lang='en-AU'> "+"We’re doomed! Repeat what I said and we’ll get there in one piece!"+"</lang></voice> ",
        "ResponseType":"Repeat",
        "STATE":"COORDINATES",
        "Index":1
      },
      {
        "turn": 2,
        "Captain":
                    "<voice name='Russell'><lang xml:lang='en-AU'> "+
                    "We're still not out of the woods. Repeat to the crew, west west south south"
                    + "</lang></voice> ",
        "Answer":"west west south south",
        "CorrectResponse":
                    "<voice name='Russell'><lang xml:lang='en-AU'> "+
                    "Again - the plan will work!"+
                    "</lang></voice> ",
        "IncorrectResponse":"<voice name='Russell'><lang xml:lang='en-AU'> "+
                    "Again, we’re doomed! Repeat what I said and we’ll get there in one piece!"+
                    "</lang></voice>",
        "ResponseType":"Repeat",
        "STATE":"COORDINATES",
        "Index":2
      },
      {
        "turn": 3,
        "Captain":"<audio src='soundbank://soundlibrary/boats_ships/wood_boat/wood_boat_01'/> "
                +"<voice name='Russell'><lang xml:lang='en-AU'> "+"land ahoy. you've made it to skull island"
                +"</lang></voice> ",
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
