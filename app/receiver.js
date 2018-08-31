/*
 * SensApp::Receiver
 *
 * Copyright (C) 2017 SINTEF Digital
 * All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *
 */


const express = require("express");
const bodyParser = require("body-parser");


class Receiver {

    constructor (settings, ui, messageQueue) {
	this.settings = settings;
	this.ui = ui;
	this.messageQueue = messageQueue;

	this.app = express();

	this.app.use(bodyParser.urlencoded({ extended: false }));
	this.app.use(bodyParser.json());
	
	this.app.post("/sensors/:sensorId/data", (request, response) => {
	    var sensorId = request.params.sensorId

	    console.log("Received: ", request.body);
	    this.messageQueue.publish(request.body);

	    response.set("Content-Type", "application/json");
	    response.send(JSON.stringify(
		{"comment": "Data will be soon available ",
		 "url": `/sensors/#{sensorId}/data`} ));
	});

	this.app.get("/receiver/about", (request, response) => {
	    const About = require("./about");
	    const infos = About.fromPackageJson();

	    response.set("Content-Type", "application/json");
	    response.send(JSON.stringify(infos));
	});
    }
    

    listen () {
	this.ui.showOpening();
	this.ui.showCopyright();
	
	this.app.listen(3000);
    }

};


module.exports = Receiver;
