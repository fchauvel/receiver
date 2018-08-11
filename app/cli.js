/*
 * SensApp::Receiver
 *
 * Copyright (C) 2017 SINTEF Digital
 * All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

format = function (template, context) {
    with (context) {
	return eval(template);
    };
};


function myParseInt(string, defaultValue) {
  var int = parseInt(string, 10);

  if (typeof int == 'number') {
    return int;
  } else {
    return defaultValue;
  }
}

const OPENING = "\`${name} v${version}\`";
const COPYRIGHT = "\`Copyright (C) ${owner} -- ${year}\`";
const ENDPOINT = "\`Listening on ${host}:${port} ...\`";


class  CLI {
    
    constructor(output, credits) {
	this.program = require("commander");
	this.output = output;
	this.credits = credits;
    }


    parse (commandLine) {
	this.program
	    .version(this.credits.version())
	    .description("REST end-point where sensors can push data")
	    .option("-p, --port [int]", "Set the port on which Receiver listens", myParseInt, 3000)
	    .parse(commandLine);
	return this.program;
    }

    showCopyright() {
	var data = { owner: this.credits.copyrightOwner(),
		     year: this.credits.copyrightYear() };
	var text = format(COPYRIGHT, data);

	this.output.log(text);
    }

    showEndpoint(host, port) {
	this.output.log(format(ENDPOINT,
			       {host: host, port: port }));
    }

    showOpening () {
	this.output.log(format(OPENING,
			       { name: this.credits.applicationName(),
				 version: this.credits.version() }));
    }

    showHorizontalLine () {
	this.output.log("------");
    }
    
}


class Credits {

    constructor() {
	this._data = require("../package.json");
    }

    version() {
	return this._data.version;
    }

    copyrightYear () {
	return "2018";
    }

    copyrightOwner () {
	return "SINTEF";
    }

    applicationName () {
	return this._data.name;
    }
    
}



module.exports = {
    CLI: CLI,
    Credits: Credits
}
