/*
 * Copyright 2018-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

//
// Alexa Fact Skill - Sample for Beginners
//

// sets up dependencies

const Queue = require('./Queue.js');
const Alexa = require('ask-sdk-core');
const Assets = require('./assets.js');
const i18n = require('i18next');

const HELP_MESSAGE = "In this game, you’re helping the captain and his crew navigate through perilous waters. Listen closely and memorise the directions required to navigate the waters and repeat them back. Beware though, the Pirate’s Parrot is cheeky, and will try to confuse you by offering wrong directions. Listen hard, remember the correct instructions, and ignore the cheeky parrot!"

// core functionality for fact skill
const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    // checks request type
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  async handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    // gets a random fact by assigning an array to the variable
    // the random item from the array will be selected by the i18next library
    // the i18next library is set up in the Request Interceptor
    //const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    //const persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();

    let speakOutput;

    var timesAccessed = 1;
    sessionAttributes.errorCount = 0;

    if (timesAccessed != 0) {
      speakOutput = '<audio src="soundbank://soundlibrary/water/splash_water/splash_water_01"/>' +
                    captainSays("Arhh land lover, welcome to the seven seas.  Let's get to skull island! And don't let my pesky parrot confuse you!") +
                    parrotSays(" I'll try though! ")+
                    captainSays("Are you ready to begin?");
    } else {
      speakOutput = "Welcome to Pirate's Parrot. In this game, you’re helping the captain and his crew navigate through perilous waters. "
      + "Listen closely and memorise the directions required to navigate the waters and repeat them back. "
      + "Beware though, the Pirate’s Parrot is cheeky, and will try to confuse you by offering wrong directions. "
      + "Listen hard, remember the correct instructions, and ignore the cheeky parrot!"
    }

    console.log("log: SKILL LAUNCH");
    console.log("log: sessionAttributes: ", sessionAttributes);
    setSessionState(sessionAttributes);
    console.log("log: sessionAttributes: ", sessionAttributes);

    var turn = sessionAttributes.turn;
    turn = 1;

    console.log("log: Assets.levels", Assets.levels);
    console.log("log: Assets.levels['1']", Assets.levels["1"]);

    /*
    // REHYDRATE SESSION ATTRIBUTES AFTER RETURNING FROM THE CONNECTIONS DIRECTIVE.
	  if (persistentAttributes !== undefined) {
      console.log("[Debug: LaunchRequestHandler] Rehydrating session attributes")

      if (persistentAttributes.level !== undefined) {
        sessionAttributes.timesAccessed = persistentAttributes.timesAccessed;
        console.log("[debug: persistentAttributes.timesAccessed]" + sessionAttributes.timesAccessed);
      } else {
        sessionAttributes.timesAccessed = 0;
      }
    }
    */

	  //SAVE ATTRIBUTES
    //handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    //UPDATE PERSISTENT ATTRIBUTES
    //handlerInput.attributesManager.setPersistentAttributes(sessionAttributes);

    //Modify this to work with the database attributes


    timesAccessed++;



    reprompt = "please asay again";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      // Uncomment the next line if you want to keep the session open so you can
      // ask for another fact without first re-opening the skill
      // .reprompt(requestAttributes.t('HELP_REPROMPT'))
      .withSimpleCard(requestAttributes.t('SKILL_NAME'), "Sail the seven seas towards the treasure!")
      .reprompt(reprompt)
      .getResponse();
  },
};

function setSessionState(sessionAttributes) {
  sessionAttributes.playerName = "John";
  sessionAttributes.level = 1;
  sessionAttributes.state = "COORDINATES";
  sessionAttributes.turn = 1;
}

const DirectionHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'DirectionIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    var state = sessionAttributes.state;
    var turn = sessionAttributes.turn;
    var level = sessionAttributes.level;
    var errorCount = sessionAttributes.errorCount;
    //level = 2;
    //turn = 1;

    var levelString = level.toString();
    console.log("log: levelString: ", levelString);
    console.log("log: turn: ", turn);


    console.log("log: handler DirectionHandler");
    let directionSlot = handlerInput.requestEnvelope.request.intent.slots.direction;
    console.log("log: directionSlot", directionSlot);
    console.log("log: directionSlot", directionSlot['value']);
    var playerAnswer = directionSlot['value'];
    var levelTurns = Assets.levels[levelString][turn-1];
    console.log("log: levelTurns", levelTurns);
    var correctAnswer = levelTurns.Answer;
    var correctResponse = levelTurns.CorrectResponse;
    var incorrectResponse = levelTurns.IncorrectResponse;
    sessionAttributes.state = levelTurns.STATE;
    console.log("log: playerAnswer", playerAnswer);
    console.log("log: correctAnswer", correctAnswer);

    let speakOutput;

    var correct = false;
    if (sessionAttributes.state === "COORDINATES") {
      if(playerAnswer === correctAnswer) {
        console.log("log: correct direction");
        console.log("log: turn: ", turn);
        console.log("log: levelTurns: ", levelTurns);
        if (turn === levelTurns.length) {
          console.log("log: challengeComplete");
          turn = 0;
          sessionAttributes.turn = 0;
          speakOutput = speakOutput + levelTurns.Captain;
        } else {
          console.log("log: challenge in progress");
          speakOutput = correctResponse;
          turn = turn + 1;
          sessionAttributes.turn = turn;
          console.log("log: turn: ", turn);
          speakOutput = speakOutput + Assets.levels[levelString][turn-1].Captain;
        }
      } else {
        console.log("log: incorrect direction");
        speakOutput = incorrectResponse;
        
        errorCount = errorCount + 1;
        sessionAttributes.errorCount = errorCount;

        if (errorCount >= 2) {
          speakOutput = captainSays("<audio src='soundbank://soundlibrary/human/amzn_sfx_crowd_boo_01'/> You'll walk the plank, ya scullywag! <audio src='soundbank://soundlibrary/water/bow_wash/bow_wash_02'/>");
          sessionAttributes.errorCount = 0;
        }
      }
    } else if (sessionAttributes.state === "TUTORIAL") {

    }

    reprompt = "Please shout out the direction";
    sessionAttributes.state = levelTurns.STATE;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withSimpleCard(requestAttributes.t('SKILL_NAME'), "Sail the seven seas towards the treasure!")
      .reprompt(reprompt)
      .getResponse();
  },
};


const RepeatCommandHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'RepeatCommandIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    console.log("log: handler RepeatCommandHandler");
    var turn = sessionAttributes.turn;
    var level = sessionAttributes.level;
    var levelString = level.toString();
    console.log("log: turn", turn);
    console.log("log: level", level);
    let playerAnswer = handlerInput.requestEnvelope.request.intent.slots.command.value;
    var speakOutput = "";
    var errorCount = sessionAttributes.errorCount;
    
    var levelTurns = Assets.levels[levelString][turn-1];
    var correctAnswerArray = levelTurns.Answer;
    sessionAttributes.state = levelTurns.STATE;
    console.log("log: correctAnswerArray: ", correctAnswerArray)
    console.log("log: playerAnswer: ", playerAnswer)
    var loop1 = false;
    var loop2 = false;
    for (i=0; i<correctAnswerArray.length; i++) {
      console.log("log: correctAnswerArray[i]: ", correctAnswerArray[i]);
      var correctAnswers = correctAnswerArray[i].split(':');
      console.log("log: correctAnswers: ", correctAnswers)
      for (j=0; j<correctAnswers.length; j++) {
        console.log("log: correctAnswers[j]: ", correctAnswers[j])
        if (playerAnswer.indexOf(correctAnswers[j]) > -1) {
          console.log("*** MATCH ***");
          if(i == 0) {
            loop1 = true;
            console.log("log: loop1");
          } else if(i == 1) {
            loop2 = true;
            console.log("log: loop2");
          }
        }
      }
    }

    var correct = false;
    if (loop1 && loop2) {
      correct = true;
    }
    console.log("log: loop1: ", loop1)
    console.log("log: loop2: ", loop2)
    console.log("log: correct: ", correct)
    let correctResponse;
    let incorrectResponse;

    if(correct) {
      correctResponse = levelTurns.CorrectResponse;
      speakOutput = speakOutput + correctResponse;

      if(levelTurns.Index == 0) {
        level = level + 1;
        turn = 1;
      } else {
        turn = turn + 1;
      }
      sessionAttributes.level = level;
      sessionAttributes.turn = turn;
      console.log("log: level: ", level);
      console.log("log: turn: ", turn);
      var levelString = level.toString();
      levelTurns = Assets.levels[levelString][turn-1];
      console.log("log: levelString: ", levelString);
      console.log("log: levelTurns: ", levelTurns);
      speakOutput = speakOutput + levelTurns.Captain;
    } else {
      incorrectResponse = levelTurns.IncorrectResponse;
      speakOutput = speakOutput + incorrectResponse;
      sessionAttributes.errorCount = sessionAttributes.errorCount + 1;
      if (errorCount > 2) {
        speakOutput = captainSays("You'll walk the plank, ya scullywag!");
        sessionAttributes.errorCount = 0;
      }
    }

    sessionAttributes.turn = turn;
    console.log("log: playerAnswer", playerAnswer);
    console.log("log: correctAnswerArray", correctAnswerArray);
    console.log("log: turn", turn);
    console.log("log: speakOutput", speakOutput);

    var reprompt = "please follow the captains instructions";
    sessionAttributes.state = levelTurns.STATE;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(reprompt)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    //const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    var speakOutput = "";
    var reprompt = "";
    if (sessionAttributes.state === "COORDINATES") {
      speakOutput = "Please repeat what the captain told you";
      reprompt = "Please repeat what the captain told you";
    } else if (sessionAttributes.state === "TUTORIAL") {
      speakOutput = "Please repeat what the captain told you";
      reprompt = "Please repeat what the captain told you";
    }

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(reprompt)
      .getResponse();
  },
};

const YesHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.YesIntent';
  },
  handle(handlerInput) {
    //const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    console.log("log: handler YesHandler");

    let speakOutput = "";
    var reprompt = "Please shout out the direction";

    var challenge = sessionAttributes.challenge;
    var state = sessionAttributes.state;
    var turn = sessionAttributes.turn;

    var level = sessionAttributes.level;
    var levelString = level.toString();
    var levelTurns = Assets.levels[levelString][turn-1];

    console.log("log: turn: ", turn);
    console.log("log: levelTurns: ", levelTurns);

    speakOutput = speakOutput + levelTurns.Captain;
    console.log("log: speakOutput: ", speakOutput);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
const captainSays = (stuff)=>{
  return "<voice name='Russell'><lang xml:lang='en-AU'> " + stuff + "</lang></voice> ";
};
const parrotSays = (stuff)=>{
  return "<voice name='Raveena'><lang xml:lang='en-AU'> "+"<prosody pitch='x-high'>"+stuff+" </prosody>"+ "</lang></voice> ";
};
const NoHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.NoIntent';
  },
  handle(handlerInput) {
    //const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    var speakOutput = "OK, plase say start to start a game or quit to exit";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const FallbackHandler = {
  // The FallbackIntent can only be sent in those locales which support it,
  // so this handler will always be skipped in locales where it is not supported.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {

    console.log("log: handler FallbackHandler");


    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    var speakOutput = "";
    var reprompt = "";

    var turn = sessionAttributes.turn;
    var level = sessionAttributes.level;
    var levelString = level.toString();
    var levelTurns = Assets.levels[levelString][turn-1];
    console.log("log: levelTurns: ", levelTurns);

    if (sessionAttributes.state === "COORDINATES") {
      speakOutput = captainSays("You need to listen, Scallywag!" 
      + levelTurns.Captain);
      reprompt = "Please repeat what the captain told you";
    } else if (sessionAttributes.state === "TUTORIAL") {
      speakOutput = captainSays("You need to listen, Scallywag!" 
      + levelTurns.Captain);   
      reprompt = "Please repeat what the captain told you";
    }

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('STOP_MESSAGE'))
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('ERROR_MESSAGE'))
      .reprompt(requestAttributes.t('ERROR_MESSAGE'))
      .getResponse();
  },
};

const LocalizationInterceptor = {
  process(handlerInput) {
    // Gets the locale from the request and initializes i18next.
    const localizationClient = i18n.init({
      lng: handlerInput.requestEnvelope.request.locale,
      resources: languageStrings,
      returnObjects: true
    });
    // Creates a localize function to support arguments.
    localizationClient.localize = function localize() {
      // gets arguments through and passes them to
      // i18next using sprintf to replace string placeholders
      // with arguments.
      const args = arguments;
      const value = i18n.t(...args);
      // If an array is used then a random value is selected
      if (Array.isArray(value)) {
        return value[Math.floor(Math.random() * value.length)];
      }
      return value;
    };
    // this gets the request attributes and save the localize function inside
    // it to be used in a handler by calling requestAttributes.t(STRING_ID, [args...])
    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function translate(...args) {
      return localizationClient.localize(...args);
    }
  }
};






const ResponsePersistenceInterceptor = {
  process(handlerInput, responseOutput) {

          //let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

          //sessionAttributes['lastUseTimestamp'] = new Date(handlerInput.requestEnvelope.request.timestamp).getTime();

          //handlerInput.attributesManager.setPersistentAttributes(sessionAttributes);

          return new Promise((resolve, reject) => {
              handlerInput.attributesManager.savePersistentAttributes()
                  .then(() => {
                      resolve();
                  })
                  .catch((err) => {
                      reject(err);
                  });
          });
  }
};

const RequestPersistenceInterceptor = {
  process(handlerInput) {
      if(handlerInput.requestEnvelope.session['new']) {

          return new Promise((resolve, reject) => {

              handlerInput.attributesManager.getPersistentAttributes()

                  .then((sessionAttributes) => {
                      sessionAttributes = sessionAttributes || {};

                      // console.log(JSON.stringify(sessionAttributes, null, 2));

                      // if(Object.keys(sessionAttributes).length === 0) {
                      //     console.log('--- First Ever Visit for userId ' + handlerInput.requestEnvelope.session.user.userId);

                      //     const initialAttributes = constants.getMemoryAttributes();
                      //     sessionAttributes = initialAttributes;

                      // }

                      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

                      handlerInput.attributesManager.savePersistentAttributes()
                          .then(() => {
                              resolve();
                          })
                          .catch((err) => {
                              reject(err);
                          });

                  });

          });

      } // end session['new']

  }
};



const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    YesHandler,
    NoHandler,
    RepeatCommandHandler,
    DirectionHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
  )
  //.addResponseInterceptors(ResponsePersistenceInterceptor)
  //.addRequestInterceptors(LocalizationInterceptor,RequestPersistenceInterceptor)
  .addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  //.withTableName("PersistPirateParrot")
  //.withAutoCreateTable(true)
  //.withCustomUserAgent('sample/basic-fact/v2')
  .lambda();






// TODO: Replace this data with your own.
// It is organized by language/locale.  You can safely ignore the locales you aren't using.
// Update the name and messages to align with the theme of your skill


const enData = {
  translation: {
    SKILL_NAME: 'Pirate Island',
    HELP_MESSAGE: 'You need to listen to the captains instructions or say quit to walk the plank',
    HELP_REPROMPT: 'Are you ready to quit and walk the plank?',
    FALLBACK_MESSAGE: 'You need to listen to the captains instructions or say quit to walk the plank',
    FALLBACK_REPROMPT: 'Are you ready to quit and walk the plank?',
    ERROR_MESSAGE: 'Sorry, an error occurred.',
    STOP_MESSAGE: '<speak><say-as interpret-as="interjection">ahoy matey</say-as></speak>',
  },
};

const enauData = {
  translation: {
    SKILL_NAME: 'Pirate Island',
  },
};

const encaData = {
  translation: {
    SKILL_NAME: 'Pirate Island',
  },
};

const engbData = {
  translation: {
    SKILL_NAME: 'Pirate Island',
  },
};

const eninData = {
  translation: {
    SKILL_NAME: 'Pirate Island',
  },
};

const enusData = {
  translation: {
    SKILL_NAME: 'Pirate Island',
  },
};



// constructs i18n and l10n data structure
const languageStrings = {
  'en': enData,
  'en-AU': enauData,
  'en-CA': encaData,
  'en-GB': engbData,
  'en-IN': eninData,
  'en-US': enusData,
};
