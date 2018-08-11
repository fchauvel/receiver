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
const CLI = require("../app/cli").CLI;
const Credits = require("../app/cli").Credits


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
	
	it("should parse the --port argument", () => {
	    var port = "8000"
	    var options = cli.parse(["node", "app/start", "--port", port]);
	    
	    expect(options.port).to.equal(parseInt(port));
	});

	it("should parse the -p argument", () => {
	    var port = "8000"
	    var options = cli.parse(["node", "app/start", "-p", port]);
	    
	    expect(options.port).to.equal(parseInt(port));
	});
	
	it("should have 3000 as default port value", () => {
	    options = cli.parse(["node", "app/start"]);
	    
	    expect(options.port).to.equal(3000);
	});

	it("should parse the --task-queue argument", () => {
	    var queue = "localhost:8989";
	    var options = cli.parse(["node", "app/start", "--task-queue", queue]);
	    
	    expect(options.taskQueue).to.equal(queue);
	});

	it("should parse the -q", () => {
	    var queue = "localhost:8989";
	    var options = cli.parse(["node", "app/start", "-q", queue]);
	    
	    expect(options.taskQueue).to.equal(queue);
	});

	it("should have 'amqp://queue:5672' as default queue server", () => {
	    var options = cli.parse(["node", "app/start"]);
	    
	    expect(options.taskQueue).to.equal("amqp://task-queue:5672");
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
