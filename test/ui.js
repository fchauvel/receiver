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


const expect  = require("chai").expect;    

const UI = require("../app/ui");
const About = require("../app/about");



class FakeConsole {

    constructor () {
	this.buffer = "";
    }


    log (message) {
	this.buffer += message;
    }
    
}


describe("The UI", () => {

    var about = About.fromPackageJson();
    var output = new FakeConsole();
    var ui = new UI(output, about);

    
    it("should display the name and version number as welcoming opening", () => {
	ui.showOpening();

	expect(output.buffer).to.have.string(about.programName);
	expect(output.buffer).to.have.string(about.version);
    });


    it("should display the copyright statement", () => {
	ui.showCopyright();
	
	expect(output.buffer).to.have.string(about.copyright);
    });

        
});
