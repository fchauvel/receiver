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


var express = require("express");
var Credits = require("./cli").Credits;
var CLI = require("./cli").CLI;


class Receiver {

    constructor () {
	this.credits = new Credits();
	this.cli = new CLI(console, this.credits);
	this.app = express();

	this.app.post("/sensapp/:sensorId", function(request, response) {
	    var knownSensors = ["my-sensor"]
	    var sensorId = request.params.sensorId
	    
	    if (knownSensors.indexOf(sensorId) > -1) {
		response.send("That's all folks");
		
	    } else {
		response.statusCode = 400;
		response.send("Unknown sensor!");
	    }
	    
	});

	this.app.get("/sensapp/about", function(request, response) {
	    var text = credits.applicationName() + " -- " + credits.version() + "\r\n" 
		+ "Copyright (C) " + credits.copyrightOwner() + ", " + credits.copyrightYear();
	    
	    response.send(text);
	});
    }

    listen () {
	var options = this.cli.parse(process.argv);
	
	this.cli.showOpening();
	this.cli.showCopyright();
	this.cli.showHorizontalLine();
	
	this.app.listen(options.port);

	this.cli.showEndpoint("localhost", options.port);
    }

};


module.exports = Receiver;
