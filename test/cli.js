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

var expect  = require("chai").expect;    
var CLI = require("../app/cli").CLI;
var Credits = require("../app/cli").Credits

const VERSION = require("../package.json").version


var FakeConsole = function() {

    this.buffer = "";

    this.log = function(message) {
	this.buffer += message;
    };
    
}


describe("The CLI", function(){

    var credits = new Credits();
    var output = new FakeConsole();
    var cli = new CLI(output, credits);

    describe("When parsing arguments", () => {
	
	it("should parse the --port argument", function () {
	    options = cli.parse(["node", "app/start", "--port", "8000"]);
	    
	    expect(options.port).to.equal(8000);
	});

	it("should parse the -p argument", function () {
	    options = cli.parse(["node", "app/start", "-p", "8000"]);
	    
	    expect(options.port).to.equal(8000);
	});
	
	it("should have 3000 as default port value", function () {
	    options = cli.parse(["node", "app/start"]);
	    
	    expect(options.port).to.equal(3000);
	});

    });


    it("should display the name and version number as welcoming opening", function(){
	cli.showOpening();

	expect(output.buffer).to.have.string(credits.applicationName());
	expect(output.buffer).to.have.string(credits.version());
    });


    it("should display the copyright's owner and year", function() {
	cli.showCopyright();
	
	expect(output.buffer).to.have.string(credits.copyrightOwner());
	expect(output.buffer).to.have.string(credits.copyrightYear());
    });

    it("should display the port and hostname", function() {
	var port = 666,
	    host = "somewhere";

	cli.showEndpoint(host, port);
	
	expect(output.buffer).to.have.string(port);
	expect(output.buffer).to.have.string(host);	
    });
    
});
