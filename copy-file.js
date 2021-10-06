var fs = require('fs');
const path = require('path');
require('dotenv').config();

//Copy file lll
const copyFileSync = (source, target) => {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {

            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));

}

//Copy folder
const copyFolderRecursiveSync = (source, target) => {

    var targetFolder = path.join(target, path.basename(source));

    if (source == process.env.SOURCE) {
        targetFolder = target;
    }
    else {
        var files = [];

        //Check if folder needs to be created or integrated
       var targetFolder = path.join(target, path.basename(source));
        if (!fs.existsSync(targetFolder)) {//&& //!(fs.existsSync(path.basename(target)))) {
            fs.mkdirSync(targetFolder);
        }
    }

// Copy
    if (fs.lstatSync(source).isDirectory()) {

        files = fs.readdirSync(source);
        files.forEach(function (file) {

            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {

                copyFolderRecursiveSync(curSource, targetFolder);
            } else {

                copyFileSync(curSource, targetFolder);
            }
        });
    }
}

//Exposure
module.exports = {
    copyFolderRecursiveSync
};


g