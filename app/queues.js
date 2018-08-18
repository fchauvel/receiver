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
	// this.queueURL = "amqp://" + queueHost + ":" + queuePort.toString();
	this.queueURL = "amqp://localhost"
	this.queueName = queueName;
    }

    publish (data) {
	var self = this;
	amqp.connect(this.queueURL, function (err, connection) {
	    connection.createChannel(function(err, channel) {
		console.log(err);
		console.log(data);
		console.log("queue name: ", self.queueName);
		channel.assertQueue(self.queueName, {durable: true});
		channel.sendToQueue(self.queueName, Buffer.from(data), {persistent: true});
	    });
	    console.log(" [x] Sent '%s'", data);
	});
    }
	
}

module.exports = RabbitMQ
