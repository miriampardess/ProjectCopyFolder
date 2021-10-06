const express = require("express");
const { request, response } = require('express');
const server = express();

const logger = require('./logger');
const app = express();
const port = 3000;
const host = "localhost";
var fs = require('fs');
const copyFile = require("./copy-file");
const path = require('path');

var flag = false;
require('dotenv').config();

//The resource was found.
server.get("/projectcopyfolder.html", (request, response) => {

    // Checking a source folder
    if (fs.existsSync(process.env.SOURCE) && fs.readdir(process.env.SOURCE, (err, files) => {
        if (files.length) {

            //Check and create a target folder
            try {
                if (!fs.existsSync(process.env.TARGRT)) {
                    fs.mkdirSync(process.env.TARGRT);
                }
            }
            catch (err) {
                logger.error(`${err.status || 500} - ${request.statusMessage} - ${err.message} - ${request.originalUrl} - ${request.method} - ${request.ip}`);

            }

            //Synchronous copying        
            try {
                copyFile.copyFolderRecursiveSync(process.env.SOURCE, process.env.TARGRT);
                const page = "<h1>The program is activated</h1>";
                response.status(200).send(page);
                logger.error(`200 Connection Established|| ${request.originalUrl} - ${request.method} - ${request.ip}`);
            }
            catch (err) {
                logger.error(`${err.status || 500} - ${request.statusMessage} - ${err.message} - ${request.originalUrl} - ${request.method} - ${request.ip}`);
            }
        }
    }));

    else {
        logger.error(`no such file or folder or it is empty ${request.originalUrl} - ${request.method} - ${request.ip}`);
    }
}
);

//Tell the client that the resource wasn't found.
server.get("*", (request, response) => {

    const page = "<h1>The program is not activated</h1>";

    response.status(404).send(page);

    logger.error(`404 Resource not found|| ${request.originalUrl} - ${request.method} - ${request.ip}`);

});

// Run the server
server.listen(port, () => {
    console.log("Server started...");
    logger.info(`Server started and running on http://${host}:${port}`)
})

