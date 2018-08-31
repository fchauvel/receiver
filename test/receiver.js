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


const chai  = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

var UI = require("../app/ui")
var Settings = require("../app/settings")
var Receiver = require("../app/receiver")


class FakeMessageQueue {

    publish(data) {}

}


describe("Receiver", function() {

    var receiver = new Receiver(
	Settings.defaults(),
	new UI(console),
	new FakeMessageQueue());
    

    it("should accept sensor data on POST /sensors/my-sensor/data", (done) => {
	chai.request(receiver.app)
	    .post('/sensors/my-sensor/data')
	    .send([{
		"sensor": "my-sensor", 
		"data": "my-json-data"
	    }])
	    .end( (error, response) => {
		should.not.exist(error);
		response.should.have.status(200);
		response.type.should.equal('application/json');
		response.body.should.be.a('object');
		response.body.should.have.property('comment');
		response.body.should.have.property('url');
		done();
	    });
    });

    
    it("should return infos on GET /receiver/about", (done) => {
	chai.request(receiver.app)
	    .get('/receiver/about')
	    .end( (error, response) => {
		should.not.exist(error);
		response.should.have.status(200);
		response.type.should.equal('application/json');
		response.body.should.be.a('object');
		response.body.should.have.property('version');
		response.body.should.have.property('license');
		response.body.should.have.property('programName');
		response.body.should.have.property('copyright');
		done();
	    });	
    });


});
