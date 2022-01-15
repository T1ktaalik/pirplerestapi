/* 
*Helpers for various task
*/

// Container for all the helpers
var helpers = {};
var config = require('./config');
// Dependencies
var crypto = require('crypto');

//Create a SHA256 hash
helpers.hash = function(str){
    if(typeof(str) == 'string' && str.length > 0){
       var hash =  crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
       return hash;
    }
    else{return faulse}
}

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str){
try{
var obj = JSON.parse(str);
return obj;
}catch(err){
return{};
}
};




// Export the module 
module.exports = helpers;