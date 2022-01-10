/* 
* Library for storing and editing data
*/

// Dependencies
var fs = require('fs');
var path = require('path');

//Container for the module (to be exported)
var lib = {};


//Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');



//Write data to a file

lib.create = function (dir, file, data, callback) {
  // Open the file for writing  
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function (err, fileDescriptor) {
      if(!err && fileDescriptor) {
           // Convert data to a stringify
            var stringData = JSON.stringify(data);

            //Write to a file and close it
            fs.writeFile(fileDescriptor, stringData)

      }
      else {
         callback('Could not create new file, it may alredy exist');
      }
  })
}

//Export the module
module.exports = lib;