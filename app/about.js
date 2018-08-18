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


class About {


    constructor (program, version, copyright, license) {
	this.programName = program;
	this.version = version;
	this.copyright = copyright;
	this.license = license;
    }

    
    static fromPackageJson() {
	var data = require("../package.json");
	return new About(data.name,
			 data.version,
			 "Copyright (C) SINTEF 2018",
			 data.license);
    }

}


module.exports = About
