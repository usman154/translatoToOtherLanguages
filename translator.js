/*
A very basic example to copy files from one location to an other location
*/
var translate = require('google-translate-api');
const path = require('path');
var fs = require('fs');
var copyFiles = function(src , dest , language){
fs.mkdir(dest, function(){
  fs.readdir(src, function(error, file){
    if(error)
    throw error;
    for(var i = 0; i < file.length; i++){

      console.log();
      var th = fs.lstatSync(path.join(src,file[i]));
      if(th.isDirectory()){
        copyFiles(path.join(src, file[i]), path.join(dest, file[i]));
      }
      else{

        var data = fs.readFileSync(path.join(src, file[i]) , 'utf8');

          trans(data, path.join(dest,path.basename(file[i], path.extname(file[i]))+'_'+language+path.extname(file[i])), language);
      }
    }
  })
});
}
var trans = function(data, path,language){
  translate(data, {to: language.toString()}).then(res => {

    fs.writeFile(path, res.text, (err) => {
    if (err) throw err;

    console.log("The file was succesfully saved!");
});
  }).catch(err => {
      console.error(err);
  });
}
module.exports.copyFiles = copyFiles;
