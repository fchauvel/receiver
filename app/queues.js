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

const amqp = require('amqplib/callback_api');



class RabbitMQ {

    constructor (queueHost, queuePort, queueName) {
	this.queueURL = "amqp://" + queueHost + ":" + queuePort.toString();
	this.queueName = queueName;
    }

    
    publish (data) {
	console.log("Connecting to " + this.queueURL);
	var self = this;
	amqp.connect(this.queueURL, function (error, connection) {
	    console.log(error);
	    connection.createChannel(function(error, channel) {
		console.log(error);
		console.log(data);
		console.log("queue name: ", self.queueName);
		channel.assertQueue(self.queueName, {durable: true});
		channel.sendToQueue(self.queueName,
				    Buffer.from(JSON.stringify(data)),
				    {persistent: true});
	    });
	    console.log(" [x] Sent '%s'", data);
	});
    }
	
}

module.exports = RabbitMQ
