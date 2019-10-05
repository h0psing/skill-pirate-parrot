
// Response Types:
const InteractionTypes = ["Confirmation","Repeat"]
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
        "Direction":"north south east",
        "ResponseType":"Repeat"
      },
      {
        "turn": 2,
        "Captain":"Hoist the sails",
        "Direction":"south south",
        "ResponseType":"Repeat"
      },
      {
        "turn": 3,
        "Captain":"Sail away!",
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
    sounds:sounds
}