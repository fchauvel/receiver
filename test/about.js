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

const About = require("../app/about");



describe("Creating an About object", () => {

    describe("from 'package.json'", () => {
	const about = About.fromPackageJson();
	const info = require("../package.json");

	it ("should have the correct program name", () => {
	    expect(about.programName).to.equal(info.name);
	});

	it ("should have the correct version number", () => {
	    expect(about.version).to.equal(info.version);
	});

	it ("should have the correct copyright statement", () => {
	    expect(about.copyright).to.have.string("SINTEF");
	    expect(about.copyright).to.have.string("2018");
	});

	it ("should have the correct license", () => {
	    expect(about.license).to.equal(info.license);
	});
	
    });


});
