/* Library for storing and editing data*/
// Dependencies
var fs = require('fs');
//const { json } = require('node:stream/consumers');
var path = require('path');
//Container for the module (to be exported)
var lib = {};
//Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../data/');
//Write data to a file
lib.create = function (dir, file, data, callback) {
  // Open the file for writing  
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function (err, fileDescriptor) {
      if(!err && fileDescriptor) {
          // Convert data to a stringify
          var stringData = JSON.stringify(data);
          //Write to a file and close it
            fs.writeFile(fileDescriptor, stringData, function(err,fileDescriptor) {
          if(!err){fs.close(fileDescriptor, function(err){
              if(!err){callback(false)}else{callback('Error closing new file')}

          })} else{callback('error writing a new code')}})
      }
      else {callback('Could not create new file, it may alredy exist')}
  })
}
// Read data from a file
lib.read = function(dir, file, callback) {
  fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf-8', function(err, data){callback(err, data)})
}
//Update data inside a file
lib.update = function(dir, file, data, callback) {
  //Open the file for reading
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function(err, fileDescriptor){if(!err && fileDescriptor){
    //Convert data to string
    var stringData = JSON.stringify(data);

    //Truncate the file
    fs.truncate(fileDescriptor, function(err){if(!err){
      //write to the file and close it may
      fs.writeFile(fileDescriptor, stringData, function(err){
        if(!err){fs.close(fileDescriptor, function(err){
          if(!err){callback(false)}else{callback('Error closing the file')}
        })}
      else{callback('Error writing the existing file')}} )
    }else{callback('Error truncating file')}})
  }else{callback('could not open the file for updating, it may not exist yet')}} )
}
// Deleting a file
lib.delete = function(dir, file, callback){
  //Unlink the file
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', function(err){if(!err){callback(false)}else{callback('Error deleting')}})
}
//Export the module
module.exports = lib;