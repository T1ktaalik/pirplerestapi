/* 
*Request handlers
*
*/

var _data = require('./data')

//Define the handlers 
var handlers = {};
var helpers = require('./helpers')
//users
handlers.users = function(data, callback){
    var acceptableMethods = ['post', 'get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1){handlers._users[data.method](data, callback);}else{callback(405)}
};

//Container for the users submethods
handlers._users = {};

//Users - post
//Required data: firsrtName, lastname, phone, password, tos Agreement
//Optional data: None
handlers._users.post = function(data, callback){

//Check that all required fields are filled out
var firstName =  typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
var lastName =  typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
var phone =  typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
var password =  typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
var tosAgreement =  typeof(data.payload.tosAgreemente) == 'boolean' && data.payload.tosAgreement == true ? true : false;

if(firstName && lastName && phone && password && tosAgreement) {
//Make shure that the user doesn't already exist
_data.read('user', phone, function(err, data){
if(err){
   // Hash the password
   var hashpassword = helpers.hash(password);

    // Create the user object
    if(hashedPassword) {
        var userObject = {
        'firstName' : firstName,
        'lastName' : lastName,
        'phone' : phone,
        'hashedPassword' : hashpassword,
        'tosAgreement': true,
    }

    // Store the user
    _data.create('users', phone, userObject, function(err){
        if(!err){callback(200);}else{console.log(err);
        callback(500, {'Error':'Could not create the new user'})
    }
    });
} 
else {
callback(500, {'Error':'Could not hash the user'})
}
}
else{
    // User already exists
    callback(400, {'error':'a user with that phone number already exists'})
}


});
}else{callback(400, {'Error': 'Missing required fields'})};
}
//Users - get
handlers._users.get = function(data, callback){

};

//Users - put
handlers._users.put = function(data, callback){

};

//Users - delete
handlers._users.delete = function(data, callback){

};






//Ping handler
handlers.ping = function(data, callback) {
    callback(200);
}
/* Erase it because of service 1 /ping
//Sample handler 
handlers.sample = function(data, callback) {
//Callbac http status code and a payload object
callback(406, {'name': 'sample handler'})
};
*/

//Not found handler
handlers.notFound = function(data, callback) {
callback(404);
};

//Export the module
module.exports = handlers;