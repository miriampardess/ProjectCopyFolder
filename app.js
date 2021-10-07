const express = require("express");
const logger = require('./logger');
var fs = require('fs');
const copyFile = require("./copy-file");
const path = require('path');
require('dotenv').config();

try {

    copyFile.copyFolderRecursiveSync(process.env.SOURCE, process.env.TARGRT);

}

catch (err) {

    logger.error(`${err.status || 500} - ${err.message}`);

}