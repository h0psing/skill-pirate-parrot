
// Response Types:
const InteractionTypes = ["Confirmation","Repeat"]
const challenge = {
    "SKULL_ISLAND":"1",
    "VIRGIN_ISLAND":"2"
  }
const levels = {
    "0":[
      {
        "turn": 1,
        "Captain":"Raise the anchor",
        "ResponseType":"Repeat"
      },
      {
        "turn": 2,
       "Captain":"Hoist the sails",
        "ResponseType":"Repeat"
      },
      {
        "turn": 3,
        "Captain":"Sail away!",
        "ResponseType":"Repeat"
      },
      {
        "turn": 4,
        "Captain": "Get supplies",
        "ResponseType":"Repeat"
      }
    ],
    "1":[
      {
        "turn": 1,
        "Captain":"The crew think I know the way. If they know I have the map they’ll kill me. " 
        + "We’ll practice now from above deck, but when the time comes, I’ll tell you the directions from under the deck."
        + "Shout to the imaginary crew North North North!",
        "Direction":"north north north",
        "CorrectResponse":"OK - the plan will work!",
        "IncorrectResponse":"We’re doomed! Repeat what I said and we’ll get there in one piece!",
        "ResponseType":"Repeat"
      },
      {
        "turn": 2,
        "Captain":"We're still not out of the woods. Repeat to the crew, south west south west",
        "Direction":"south west south west",
        "CorrectResponse":"Again - the plan will work!",
        "IncorrectResponse":"Again, we’re doomed! Repeat what I said and we’ll get there in one piece!",
        "ResponseType":"Repeat"
      },
      {
        "turn": 3,
        //"Captain":"<speak><audio src='soundbank://soundlibrary/boats_ships/wood_boat/wood_boat_01'/> land ahoy captain. you've made it to skull island</speak>",
        "Captain":" land ahoy captain. you've made it to skull island",
        "Direction":"west west east",
        "ResponseType":"Repeat"
      }
    ]
  };
const sounds = {
    "waves":"",
    "anchor":"",
    "sails":"",
    "woodCreeking":""
}


module.exports = {
    InteractionTypes:InteractionTypes,
    levels:levels,
    challenge:challenge,
    sounds:sounds
}