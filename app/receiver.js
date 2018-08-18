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



class Receiver {

    constructor (settings, ui, messageQueue) {
	this.settings = settings;
	this.ui = ui;
	this.messageQueue = messageQueue;
	this.app = express();
	
	this.app.post("/sensapp/:sensorId", (request, response) => {
	    var sensorId = request.params.sensorId

	    this.messageQueue.publish(request.body);

	    response.set("Content-Type", "application/json");
	    response.send(JSON.stringify(
		{"comment": "Data will be soon available ",
		 "url": `/sensapp/#{sensorId}`} ));
	});

	this.app.get("/sensapp/about", (request, response) => {
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
