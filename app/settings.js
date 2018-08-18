/*
 * SensApp::Receiver
 *
 * Copyright (C) 2017 SINTEF Digital
 * All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */


function myParseInt(string, defaultValue) {
  var int = parseInt(string, 10);

  if (typeof int == 'number') {
    return int;
  } else {
    return defaultValue;
  }
}


var DEFAULTS = {
    "queueName": "SENSAPP_QUEUE",
    "queuePort": 5672,
    "queueHost": "task-queue"
};



class Settings {

    
    constructor(options) {	
	for (var [key, defaultValue] of Object.entries(DEFAULTS)) {
	    if (key in options) {
		this[key] = options[key];
	    } else {
		this[key] = defaultValue
	    }
	}
    }


    static defaults() {
	return new Settings(DEFAULTS);
    }

    
    static fromCommandLine(args) {
	var program = require("commander");
	program
	    .version("0.0.0")
	    .description("REST end-point where sensors can push data")
	    .option("-p, --queue-port [INTEGER]", "set the port on which the task queue listens", myParseInt, 5672)
	    .option("-q, --queue-host [URL]", "set the host name of the task queue", "task-queue")
	    .option("-n, --queue-name [NAME]", "set the name of the queue", "SENSAPP_QUEUE")
	    .parse(args);
	return new Settings(program);
    }

    
}


module.exports = Settings
