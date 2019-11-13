// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const Buses = require('bus-schedule');


const GetBusScheduleIntent = {
    
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetBusScheduleIntent';
    },
    
    handle(handlerInput) {
        
        let speakOutput = ' The bus schedules are: ';
        
        let quesada_to_upala = ' Ciudad Quesada to Upala is at: ';
        let fortuna_to_quesadabychachagua = ' Fortuna to Ciudad Quesada by Chachagua is at: ';
        let quesada_to_fortunabychachagua = ' Ciudad Quesada to Fortuna by Chachagua is at: ';
        let quesada_to_venado = ' Ciudad Quesada to Venado is at: ';
        let quesada_to_latigrabybajorodriguez = ' Ciudad Quesada to La Tigra by Bajo Rodriguez is at: ';
        let quesada_to_fortunabyeltanque = ' Ciudad Quesada to Fortuna by El Tanque is at: ';
        
        let array = Buses.getSantaClaraBusesSchedule();
        
        array.forEach(function(element) {
            
    
            if(element.Departure === 'Cuidad Quesada' && element.Arrival ===  'Upala'){
                quesada_to_upala += element.DepartureTime + ', ';
            }
            
            if(element.Departure === 'Fortuna' && element.Arrival ===  'Ciudad Quesada by Chahagua'){
                fortuna_to_quesadabychachagua += element.DepartureTime + ', ';
            }
            
            if(element.Departure === 'Ciudad Quesada' && element.Arrival ===  'Fortuna by Chahagua'){
                fortuna_to_quesadabychachagua += element.DepartureTime + ', ';
            }
            
            if(element.Departure === 'Ciudad Quesada' && element.Arrival ===  'Venado'){
                quesada_to_venado += element.DepartureTime + ', ';
            }
            
            if(element.Departure === 'Ciudad Quesada' && element.Arrival ===   'Fortuna by EL Tanque'){
                quesada_to_fortunabyeltanque += element.DepartureTime + ', ';
            }
            
        });
        
        speakOutput += quesada_to_upala + 
                       fortuna_to_quesadabychachagua + 
                       quesada_to_fortunabychachagua +
                       quesada_to_venado +
                       quesada_to_fortunabyeltanque;

        return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('')
                .getResponse();
    }
}

function time24_to_12(ts){
    
      var H = +ts.substr(0, 2);
      var h = (H % 12) || 12;
      h = (h < 10)?('0'+h):h;  // leading 0 at the left for 1 digit hours
      var ampm = H < 12 ? ' am' : ' pm';
      ts = h + ts.substr(2, 3) + ampm;
      return ts;
}

function difference(t1, t2){
    
    
    let timeStart = new Date("01-01-2010 " + t1);
    let timeEnd   = new Date("01-01-2010 " + t2);

    let difference = timeEnd - timeStart;
    let diff_result = new Date(difference);
    
    let res  = diff_result.toString().substr(15,16);
    let time = res.substr(0,6);

    if(time.substr(0,3) === ' 00'){
        return  time.substr(4,6) + ' minutes';
    }else{
        return  time.substr(0,3) + ' h' + ' with ' +time.substr(4,6) + ' minutes';
    }
}

const GetListNextBuses = {
    
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetListNextBuses';
    },
    async handle(handlerInput) {
        
        let speakOutput = ' The next bus is in ';
        
        let endpoint = '/api/timezone/America/Costa_Rica';
        let url      = 'worldtimeapi.org';
    
        const response = await Buses.httpGet(url, endpoint);
        
        let time = time24_to_12(response.datetime.substr(11, 5));

        // function get the format pm/am
        let format = time.substr(6,7);
        
        let array = Buses.getSantaClaraBusesSchedule();
        let count = 0;
        
        array.forEach(function(element) {
        
            let string1 = '';
            let string2 = '';
            let aux = '';
            
            if(count < 4){
    
                if(element.DepartureTime.substr(6,7) === 'md'){
                    
                    if(time.substr(0,2) === '12' && format === 'pm'){
    
                        aux = element.DepartureTime.replace(format, '');
                        
                        string1 = '00' + time.substr(2,4);
                        string2 = '00' + aux.substr(2,4);
                        
                        if(string1 <= string2){
                            speakOutput += element.Departure + ' to '+ element.Arrival + 'at: '+  element.DepartureTime + ', ';
                            count +=1;
                        }
                        
                        
                    }else{
                        
                        
                        string1 = time.replace(format, '');
                        string2 = element.DepartureTime.replace(format, '');
                    
                        if(string1 <= string2){
                            speakOutput += element.Departure + ' to '+ element.Arrival + ' at: '+  element.DepartureTime + ', ';
                            count +=1;
                        }
                    }
                    
                }
    
                if(element.DepartureTime.includes(format) === true){
                
                    
                    if(time.substr(0,2) === '12' && format === 'pm'){
                        
                        string1 = '00' + time.substr(2,4);
                        string2 = element.DepartureTime.replace(format, '');
                        
                        if(string1 <= string2){
                            speakOutput += element.Departure + ' to '+ element.Arrival + ' at: '+  element.DepartureTime + ', ';
                            count +=1;
                        }
                        
                        
                    }else{
                        
                        string1 = time.replace(format, '');
                        string2 = element.DepartureTime.replace(format, '');
                    
                        if(string1 <= string2){
                            speakOutput += element.Departure + ' to '+ element.Arrival + ' at: '+  element.DepartureTime + ', ';
                            count +=1;
                        }
                    }
                    
                }
            }
            
        });
        
        if(count <= 0){speakOutput = ' Oops, there are no buses at this time.';}
        

        return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('')
                .getResponse();
    }
}
    

const GetNextBusIntent = {
    
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetNextBusIntent';
    },
    async handle(handlerInput) {
        
        let speakOutput = ' The next bus is in ';
        
        let endpoint = '/api/timezone/America/Costa_Rica';
        let url      = 'worldtimeapi.org';
    
        const response = await Buses.httpGet(url, endpoint);
        
        let time = time24_to_12(response.datetime.substr(11, 5));

        // function get the format pm/am
        let format = time.substr(6,7);
        
        let array = Buses.getSantaClaraBusesSchedule();
        let count = 0;
        
        array.forEach(function(element) {
        
            let string1 = '';
            let string2 = '';
            let aux = '';
            
            if(count < 1){
    
                if(element.DepartureTime.substr(6,7) === 'md'){
                    
                    if(time.substr(0,2) === '12' && format === 'pm'){
    
                        aux = element.DepartureTime.replace(format, '');
                        
                        string1 = '00' + time.substr(2,4);
                        string2 = '00' + aux.substr(2,4);
                        
                        if(string1 <= string2){
                            speakOutput += difference(string1, string2) +' from  '+ element.Departure + ' to '+ element.Arrival;
                            count +=1;
                        }
                        
                        
                    }else{
                        
                        
                        string1 = time.replace(format, '');
                        string2 = element.DepartureTime.replace(format, '');
                    
                        if(string1 <= string2){
                            speakOutput += difference(string1, string2) +' from  '+ element.Departure + ' to '+ element.Arrival;
                            count +=1;
                        }
                    }
                    
                }
    
                if(element.DepartureTime.includes(format) === true){
                
                    
                    if(time.substr(0,2) === '12' && format === 'pm'){
                        
                        string1 = '00' + time.substr(2,4);
                        string2 = element.DepartureTime.replace(format, '');
                        
                        if(string1 <= string2){
                            speakOutput += difference(string1, string2) +' from  '+ element.Departure + ' to '+ element.Arrival;
                            count +=1;
                        }
                        
                        
                    }else{
                        
                        string1 = time.replace(format, '');
                        string2 = element.DepartureTime.replace(format, '');
                    
                        if(string1 <= string2){
                            speakOutput += difference(string1, string2) +' from  '+ element.Departure + ' to '+ element.Arrival;
                            count +=1;
                        }
                    }
                    
                }
            }
            
        });
        
        if(count <= 0){speakOutput = ' Oops, there are no buses at this time.';}
        

        return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('')
                .getResponse();
    }
    
};




const LaunchRequestHandler = {
    
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        
        let skil = 'what is the schedule, '+
                   'what are the routes that cross the TEC San Carlos, '+ 
                   'how much time is left for the next bus, '+
                   'what are the next bus in Santa Clara; ';
                
        let speakOutput = 'Hello' + ' and welcome to ' + 'Santa Clara Bus Schedule' +  ' ! You can try things like this: '+ skil + ' or say help to hear some options'
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Try again!')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        GetBusScheduleIntent,
        GetNextBusIntent,
        GetListNextBuses,
        LaunchRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
