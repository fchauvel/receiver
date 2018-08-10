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


function CLI(output, credits) {

    this.OPENING = "\`${name} v${version}\`"
    this.COPYRIGHT = "\`Copyright (C) ${owner} -- ${year}\`";
    this.ENDPOINT = "\`Listening on ${host}:${port} ...\`";

    this.showCopyright = function() {
	var data = { owner: credits.copyrightOwner(),
		     year: credits.copyrightYear() };
	var text = format(this.COPYRIGHT, data);

	output.log(text);
    };

    this.showEndpoint = function(host, port) {
	output.log(format(this.ENDPOINT,
			  {host: host, port: port }));
    };

    this.showOpening = function() {
	output.log(format(this.OPENING,
			  { name: credits.applicationName(),
			    version: credits.version() }));
    };

    this.showHorizontalLine = function () {
	output.log("------");
    };
    
};


function Credits() {

    var data = require("../package.json");

    this.version = function () {
	return data.version;
    };

    this.copyrightYear = function () {
	return "2018";
    };

    this.copyrightOwner = function () {
	return "SINTEF";
    };

    this.applicationName = function() {
	return data.name;
    }
    
};



module.exports = {
    CLI: CLI,
    Credits: Credits
}
