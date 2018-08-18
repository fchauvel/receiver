/*
 * SensApp::Receiver
 *
 * Copyright (C) 2018 SINTEF Digital
 * All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *
 */


const About = require("./about");


format = function (template, context) {
    with (context) {
	return eval(template);
    };
};


const OPENING = "\`${name} v${version} (${license})\`";


class  UI {
    
    constructor(output, about) {
	this.output = output;
	this.about = (about === 'undefined') ? About.fromPackageJson() : about;
    }


    showCopyright() {
	this.output.log(this.about.copyright);
    }

    
    showOpening () {
	this.output.log(format(OPENING,
			       { name: this.about.programName,
				 version: this.about.version,
				 license: this.about.license}));
    }

    showHorizontalLine () {
	this.output.log("------");
    }
    
}


module.exports = UI;
