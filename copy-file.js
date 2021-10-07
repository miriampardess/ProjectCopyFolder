var fs = require('fs');
const path = require('path');
require('dotenv').config();
const logger = require('./logger');

//Copy file
const copyFileSync = (source, target) => {

    fs.writeFileSync(target, fs.readFileSync(source));
}

//Copy folder
const copyFolderRecursiveSync = (source, target) => {

    if (fs.existsSync(process.env.SOURCE)) {

        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        }

        if (fs.lstatSync(source).isDirectory()) {

            files = fs.readdirSync(source).forEach((file) => {

                var curSource = path.join(source, file);
                var curTarget = path.join(target, path.basename(curSource));

                if (fs.lstatSync(curSource).isDirectory()) {

                    copyFolderRecursiveSync(curSource, curTarget);

                } else {

                    copyFileSync(curSource, curTarget);
                }
            });
        }
        logger.info(`The process was successful!!`);
    }
    else {
        logger.error(`Source folder or its routing is problematic`);
    }
}

//Exposure
module.exports = {
    copyFolderRecursiveSync
};

