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

const Settings = require("../app/settings");




describe("Building the settings", () => {

    describe("from the command line", () => {

	it("should accepts the '-q' [QUEUE_HOST] option", () => {
	    const QUEUE_HOST = "my-little-queue";
	    var settings = Settings.fromCommandLine(["node", "app/start", "-q", QUEUE_HOST]);

	    expect(settings.queueHost).to.equal(QUEUE_HOST);
	});

	
	it("should accepts the '--queue-host' [HOST] option", () => {
	    const QUEUE_HOST = "my-little-queue";
	    var settings = Settings.fromCommandLine(["node", "app/start", "--queue-host", QUEUE_HOST]);

	    expect(settings.queueHost).to.equal(QUEUE_HOST);
	});

	
	it("should have 'task-queue' as default queue host", () => {
	    var settings = Settings.fromCommandLine(["node", "app/start"]);

	    expect(settings.queueHost).to.equal("task-queue");
	});


	it("should accepts the '-p [PORT]' options", () => {
	    const PORT = 4567;
	    var settings = Settings.fromCommandLine(["node", "app/start", "-p", PORT.toString()]);

	    expect(settings.queuePort).to.equal(PORT);
	});


	it("should accepts the '--queue-port [PORT]' option", () => {
	    const PORT = 4567;
	    var settings = Settings.fromCommandLine(["node", "app/start", "-p", PORT.toString()]);

	    expect(settings.queuePort).to.equal(PORT);
	});


	it ("should have '5672' as default queue port", () => {
	    var settings = Settings.fromCommandLine(["node", "app/start"]);

	    expect(settings.queuePort).to.equal(5672);
	});
	

	it ("should accepts the '-n [QUEUE_NAME]' option", () => {
	    const QUEUE_NAME = "my-queue";
	    var settings = Settings.fromCommandLine(["node", "app/start", "-n", QUEUE_NAME]);

	    expect(settings.queueName).to.equal(QUEUE_NAME);
	});


	it ("should accepts the '--queue-name [QUEUE_NAME]' option", () => {
	    const QUEUE_NAME = "my-queue";
	    var settings = Settings.fromCommandLine(["node", "app/start", "--queue-name", QUEUE_NAME]);
	    expect(settings.queueName).to.equal(QUEUE_NAME);
	});


	it ("should have 'SENSAPP_QUEUE' as default queue port", () => {
	    var settings = Settings.fromCommandLine(["node", "app/start"]);

	    expect(settings.queueName).to.equal('SENSAPP_QUEUE');
	});
	
	
    });

});
